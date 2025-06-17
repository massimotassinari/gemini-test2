
import React from 'react';

export const TRIP_PLANNER_SYSTEM_INSTRUCTION = `You are an expert travel planning assistant. Your goal is to help users meticulously plan their trips.
Be friendly, engaging, and proactive. Ask clarifying questions to understand their preferences, budget, travel dates, interests (e.g., adventure, relaxation, culture, food), and desired travel style.
Suggest destinations, activities, itineraries, accommodation options (ranging from budget to luxury), and transportation methods.
Provide practical advice on visas, packing, local customs, safety, and currency.
Break down complex plans into manageable steps.
Offer alternatives if initial suggestions are not suitable.
You can use markdown for formatting lists, bolding important information, etc. but keep it clean. For example, use '*' for bullet points.
Encourage users to ask more questions. Your responses should be helpful and comprehensive.
Do not make up flight or hotel availability or prices. Instead, suggest how the user can find this information (e.g., "You can check popular booking websites for current flight prices to [Destination].").
Focus on providing information and options, not making bookings.
Keep your responses concise and easy to read in a chat format.`;

export const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

export const AiIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
    <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.426 1.458 2.262 2.91a31.053 31.053 0 0 1-5.134 7.63 4.498 4.498 0 0 1-2.206 1.373.999.999 0 0 0-.411.235c-.461.385-.92.812-1.353 1.29C13.233 22.013 12.63 22.5 12 22.5s-1.233-.487-1.706-1.127c-.432-.479-.892-.905-1.353-1.29a.999.999 0 0 0-.41-.235 4.498 4.498 0 0 1-2.207-1.373A31.053 31.053 0 0 1 1.044 9.61c-.163-1.452.83-2.67 2.262-2.91.382-.064.766-.123 1.152-.177.465-.067.87-.327 1.11-.71l.822-1.317c.502-.805 1.365-1.338 2.332-1.39Zm3.019 13.826c.274-.265.592-.505.941-.712a.999.999 0 0 0 .54-.838V12.5a.75.75 0 0 0-1.5 0v1.776a.999.999 0 0 0 .403.805l-.02.017c-.19.165-.386.318-.586.458a2.502 2.502 0 0 0-2.186 0c-.201-.14-.397-.293-.587-.458l-.019-.017a.999.999 0 0 0 .402-.805V12.5a.75.75 0 0 0-1.5 0v1.776c0 .341.192.65.488.838.35.207.667.447.94.712a3.998 3.998 0 0 0 2.212 0Z" clipRule="evenodd" />
  </svg>
);
