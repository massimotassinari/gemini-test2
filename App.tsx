
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage as ChatMessageType, Sender } from './types';
import { initializeChat, sendMessageToGeminiStream, getChatInstance } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { Chat } from '@google/genai'; // Named import
import { AiIcon } from './constants';


const App: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const initChatSession = useCallback(() => {
    try {
      const newChatInstance = initializeChat();
      setChatInstance(newChatInstance);
      setError(null);
       setChatMessages([
        {
          id: 'initial-greeting',
          text: "Hello! I'm your AI Trip Planner. How can I help you plan your next adventure today?",
          sender: Sender.AI,
          timestamp: new Date(),
        }
      ]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Failed to initialize chat:", err.message);
         setChatMessages([
          {
            id: 'init-error',
            text: `Error: Could not initialize AI chat. ${err.message}. Please ensure your API key is correctly configured.`,
            sender: Sender.AI,
            timestamp: new Date(),
          }
        ]);
      } else {
        setError("An unknown error occurred during chat initialization.");
        console.error("Failed to initialize chat: Unknown error");
      }
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    initChatSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initialize chat only once on mount


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = async (messageText: string) => {
    if (!chatInstance) {
      setError("Chat is not initialized. Please try again.");
      // Attempt to re-initialize, or guide user
      if (!process.env.API_KEY) {
         setError("API Key is missing. Cannot send message.");
         return;
      }
      try {
        const newChat = getChatInstance(); // This will try to initialize if null
        setChatInstance(newChat);
      } catch (e) {
         if (e instanceof Error) setError(`Re-initialization failed: ${e.message}`);
         else setError("Re-initialization failed due to an unknown error.");
         return;
      }
    }
    
    const newUserMessage: ChatMessageType = {
      id: Date.now().toString() + '-user',
      text: messageText,
      sender: Sender.USER,
      timestamp: new Date(),
    };
    setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    setError(null);

    const aiMessageId = Date.now().toString() + '-ai';
    // Add a placeholder for AI response
    setChatMessages(prevMessages => [
      ...prevMessages,
      { id: aiMessageId, text: '', sender: Sender.AI, timestamp: new Date() },
    ]);

    try {
      let fullAiResponse = '';
      // Ensure chatInstance is not null before using it
      const currentChat = chatInstance || getChatInstance(); // getChatInstance will initialize if needed
      if (!currentChat) {
          throw new Error("Chat instance could not be established.");
      }

      for await (const chunk of sendMessageToGeminiStream(currentChat, messageText)) {
        fullAiResponse += chunk;
        setChatMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: fullAiResponse } : msg
          )
        );
      }
      // If AI response is empty after stream (e.g. only error was yielded and handled by service)
      // or if stream completed but `fullAiResponse` is empty, ensure placeholder is updated or removed.
      if (fullAiResponse.trim() === '') {
         setChatMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: "No response from AI." } : msg
          )
        );
      }

    } catch (e) {
      console.error("Error streaming message:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
      setChatMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === aiMessageId ? { ...msg, text: `Error: ${errorMessage}` } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-100 to-sky-100">
      <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10 flex items-center space-x-3">
        <AiIcon /> 
        <h1 className="text-2xl font-semibold">AI Trip Planner</h1>
      </header>
      
      <main className="flex-grow overflow-y-auto p-6 space-y-6">
        {chatMessages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 border-t border-red-300 text-center">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading || !chatInstance} />
    </div>
  );
};

export default App;
