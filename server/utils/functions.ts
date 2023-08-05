import { ChatCompletionFunctions } from "openai-edge";

async function get_current_weather(location: string) {
  return {
    location: location,
    temperature: 22,
    unit: "celsius",
    description: "Sunny",
  };
}

export async function runFunction(name: string, args: any) {
  switch (name) {
    case "get_current_weather":
      return await get_current_weather(args["location"]);
    default:
      return null;
  }
}

//functions
export const functions: ChatCompletionFunctions[] = [
  {
    name: "get_current_weather",
    description: "Get the current weather",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA",
        },
        format: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description:
            "The temperature unit to use. Infer this from the users location.",
        },
      },
      required: ["location", "format"],
    },
  },
];
