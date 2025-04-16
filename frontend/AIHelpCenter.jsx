import React, { useState } from "react";
import { postRequest } from "service/axios";

export default function AIHelpCenter() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        const aiResponse = await getAIResponse(input);
        setMessages([...newMessages, { role: "ai", text: aiResponse }]);
    };

    const getAIResponse = async (question) => {
        const response = await postRequest('/api', {
            req_type: 'ai-help-center-ask',
            question
        });

        return response?.reply || "⚠️ No response from AI.";
    };


    const close_btn = () => {
        setOpen(false)
        setInput("")
        setMessages([])
    }

    return (
        <div className="fixed left-4 bottom-4 z-50">
            {!open && (
                <button
                    onClick={() => {
                        setOpen(true);
                        if (messages.length === 0) {
                            setMessages([
                                {
                                    role: "ai",
                                    text: "Hi, I am a bot trained by Inus Daimary. How can I help you?",
                                },
                            ]);
                        }
                    }}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                >
                    💬
                </button>
            )}




            {open && (
                <div className="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
                        <span>Bot Support Center</span>
                        <button onClick={close_btn}>✖️</button>
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-md ${msg.role === "user"
                                    ? "bg-blue-100 self-end text-right"
                                    : "bg-gray-100 self-start text-left"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="p-3 border-t flex gap-2">
                        <input
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
