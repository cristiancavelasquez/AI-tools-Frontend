import { useState } from 'react';
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { orthographyUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}




export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])


  const handlePost = async( text: string ) => {

    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false }] );

    const { ok, errors, message, userScore } = await orthographyUseCase(text);
    if ( !ok ) {
      setMessages( (prev) => [...prev, { text: 'there was an error', isGpt: true }] );
    } else {
      setMessages( (prev) => [...prev, { 
        text: message, isGpt: true,  
        info: {errors,message,userScore}
      }]);
    }
  
    // Todo: Añadir el mensaje de isGPT en true
    
    
    setIsLoading(false);
  }



  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Hi, please write your text in english and I will review it for you" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptOrthographyMessage 
                    key={ index }  
                    { ...message.info! }
                  />
                )
                : (
                  <MyMessage key={ index } text={ message.text } />
                )
                
            ))
          }

          
          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }
          

        </div>
      </div>


      <TextMessageBox 
        onSendMessage={ handlePost }
        placeholder='Write here your text'
        disableCorrections
      />

    </div>
  );
};
