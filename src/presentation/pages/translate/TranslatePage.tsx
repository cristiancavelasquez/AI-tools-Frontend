import { useState } from "react";
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect } from '../../components';
import { translateTextUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "german", text: "German" },
  { id: "arabic", text: "Arabic" },
  { id: "bengali", text: "Bengali" },
  { id: "french", text: "French" },
  { id: "hindi", text: "Hindi" },
  { id: "spanish", text: "Spanish" },
  { id: "japanese", text: "Japanese" },
  { id: "mandarin", text: "Mandarin" },
  { id: "portuguese", text: "Portuguese" },
  { id: "russian", text: "Russian" },
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);

    const newMessage = `Translate: "${ text }" to ${ selectedOption }`
    setMessages((prev) => [...prev, { text: newMessage, isGpt: false }]);

    const { ok, message } = await translateTextUseCase( text, selectedOption )
    setIsLoading(false);
    if ( !ok ) {
      return alert(message);
    }

    setMessages((prev) => [...prev, { text: message, isGpt: true }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="What would you like to translate?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={ message.text } />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Write here in english"
        options={ languages }
      />
    </div>
  );
};
