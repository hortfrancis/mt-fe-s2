import { useEffect, useRef } from 'react';

export default function useSpeechToText(url, sessionId, onMessage) {
    const socketConnection = useRef(null);

    useEffect(() => {
        socketConnection.current = new WebSocket(url);

        socketConnection.current.onopen = () => {
            console.log("Audio socket connection opened.");
            socketConnection.current.send(JSON.stringify({
                message: {
                    type: 'system',
                    task: 'establish-session',
                    sessionId: sessionId
                }
            }));
        }

        socketConnection.current.onmessage = (event) => {

            if (JSON.parse(event.data).message.type === 'system') {
                console.log('System message received:', JSON.parse(event.data).message.content);
                if (JSON.parse(event.data).message.content === 'session-established') {
                    console.log('Session established');
                }
            }

            if (typeof onMessage !== 'function') {
                console.error("onMessage is not a function");
                return;
            }
            onMessage(event.data);
        }

        socketConnection.current.onerror = (error) => {
            console.error("Speech-to-text socket error:", error);
        }

        socketConnection.current.onclose = () => {
            console.log("Speech-to-text socket closed.");
        }

        return () => {
            if (socketConnection.current)
                socketConnection.current.close();
        }
    }, [url, onMessage]);

    function sendAudio(audioChunks) {
        if (socketConnection.current && socketConnection.current.readyState === WebSocket.OPEN) {
            audioChunks.forEach((chunk) => {
                socketConnection.current.send(chunk);
            });
        } else {
            console.error("Speech-to-text socket connection is not open.");
        }
    }

    return sendAudio;
}