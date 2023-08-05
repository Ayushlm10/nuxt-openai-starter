import { OpenAIStream } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { functions, runFunction } from "../utils/functions";

const config = new Configuration({
  apiKey: useRuntimeConfig().openaiApiKey,
});

const openai = new OpenAIApi(config);

export default defineEventHandler(async (event: any) => {
  const { messages } = await readBody(event);

  const initialResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages,
    functions,
    function_call: "auto",
  });
  const initialResponseJson = await initialResponse.json();
  const initialResponseMessage = initialResponseJson?.choices?.[0]?.message;

  let finalResponse;
  if (initialResponseMessage.function_call) {
    const { name, arguments: args } = initialResponseMessage.function_call;
    const functionResponse = await runFunction(name, JSON.parse(args));

    finalResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      stream: true,
      messages: [
        ...messages,
        initialResponseMessage,
        {
          role: "function",
          name: initialResponseMessage.function_call.name,
          content: JSON.stringify(functionResponse),
        },
      ],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(finalResponse);
    // Respond with the stream
    const reader = stream.getReader();

    return new Promise((resolve, reject) => {
      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            event.node.res.end();
            return;
          } else {
            event.node.res.write(value);
            read();
          }
        });
      }
      read();
    });
  } else {
    // if there's no function call, just return the initial response
    // but first, we gotta convert initialResponse into a stream with ReadableStream
    const chunks = initialResponseMessage.content.split(" ");
    const stream = new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          const bytes = new TextEncoder().encode(chunk + " ");
          controller.enqueue(bytes);
          await new Promise((r) =>
            setTimeout(
              r,
              // get a random number between 10ms and 30ms to simulate a random delay
              Math.floor(Math.random() * 20 + 10)
            )
          );
        }
        controller.close();
      },
    });
    const reader = stream.getReader();

    return new Promise((resolve, reject) => {
      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            event.node.res.end();
            return;
          } else {
            event.node.res.write(value);
            read();
          }
        });
      }
      read();
    });
  }
});
