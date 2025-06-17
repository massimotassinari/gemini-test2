
import { GoogleGenAI, Chat } from "@google/genai";
import { TRIP_PLANNER_SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;
let currentChatInstance: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!process.env.API_KEY) {
    // This error should ideally be handled more gracefully in a real app,
    // perhaps by showing a message to the user or disabling chat functionality.
    // For this exercise, we throw as per typical error handling.
    console.error("API_KEY environment variable not set.");
    throw new Error("API_KEY environment variable not set. Please ensure it is configured.");
  }
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  currentChatInstance = ai.chats.create({
    model: 'gemini-2.5-flash-preview-04-17',
    config: {
      systemInstruction: TRIP_PLANNER_SYSTEM_INSTRUCTION,
      // No thinkingConfig, default is enabled which is good for this type of task.
    },
  });
  return currentChatInstance;
};

export const getChatInstance = (): Chat => {
  if (!currentChatInstance) {
    return initializeChat();
  }
  return currentChatInstance;
};

export async function* sendMessageToGeminiStream(
  chatInstance: Chat,
  message: string
): AsyncGenerator<string, void, undefined> {
  try {
    const stream = await chatInstance.sendMessageStream({ message });
    for await (const chunk of stream) {
      // Ensure text exists and is not empty before yielding
      if (chunk.text && chunk.text.trim() !== "") {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    let errorMessage = "An unknown error occurred while communicating with the AI service.";
    if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
    }
    // Yield the error message to be displayed in the chat
    yield errorMessage; 
  }
}
