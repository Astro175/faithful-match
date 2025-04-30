"use client";

import { useData } from "@/context/data-context";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export default function ChatPage() {
  const { matchId } = useParams();
  const { state, dispatch } = useData();
  const [message, setMessage] = useState("");

  const chat = state.chats.find((c) => c.matchId === matchId);
  const match = state.matches.find((m) => m.id === matchId);

  const handleSend = () => {
    if (message.trim()) {
      dispatch({ type: "SEND_MESSAGE", chatId: matchId, message });
      setMessage("");
    }
  };

  if (!match) return <div>Match not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <img
          src={match.images[0]}
          className="w-16 h-16 rounded-full object-cover"
          alt={match.name}
        />
        <div>
          <h2 className="text-2xl font-bold">{match.name}</h2>
          <p className="text-gray-500">{match.distance}km away</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chat?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === "current-user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                msg.senderId === "current-user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <Button onClick={handleSend}>
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
