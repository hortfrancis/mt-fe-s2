import React, { useState, useEffect } from 'react';
// import { useSpeechToText, useChatCompletionData, useGeneratedSpeech } from './hooks';
import { useSpeechToText } from './hooks';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        // Debugging
        console.log('VITE_BACKEND_SPEECH_TO_TEXT_WS_URL:', import.meta.env.VITE_BACKEND_SPEECH_TO_TEXT_WS_URL);
        console.log('VITE_BACKEND_CHAT_COMPLETION_DATA_WS_URL:', import.meta.env.VITE_BACKEND_CHAT_COMPLETION_DATA_WS_URL);

        // Generate a new session ID
        setSessionId(uuidv4());
    }, []);


    const sendSpeechToText = useSpeechToText(
        import.meta.env.VITE_BACKEND_SPEECH_TO_TEXT_WS_URL,
        sessionId,
        (reply) => {
            console.log("Speech-to-text reply:", reply);
        }
    );

    return (
        <div className="App">
            <h1>WebSocket Session</h1>
            {/* Further UI elements and logic to interact with your WebSockets */}
        </div>
    );
}

