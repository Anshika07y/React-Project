import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error from Gemini:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I encountered an error.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">
        🤖 EduBot
      </h2>
      <div className="h-64 overflow-y-auto border p-3 mb-4 rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <strong>{msg.sender === "user" ? "You" : "EduBot"}:</strong>{" "}
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border px-3 py-2 rounded-l"
          type="text"
          placeholder="Ask your learning assistant..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
