<script setup lang="ts">
import { useChat } from "ai/vue";
const { messages, input, handleSubmit } = useChat();
</script>

<template>
  <div class="h-screen bg-slate-900">
    <div class="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div
        v-for="m in messages"
        key="m.id"
        class="whitespace-pre-wrap text-gray-200"
      >
        {{ m.role === "user" ? "User: " : "AI: " }}
        {{ m.content }}
      </div>

      <form @submit="handleSubmit">
        <input
          class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          v-model="input"
          placeholder="Say something..."
        />
      </form>
    </div>
  </div>
</template>
