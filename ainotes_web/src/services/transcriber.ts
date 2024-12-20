"use client";
import { createClient, ListenLiveClient } from "@deepgram/sdk";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const DEEPGRAM_MODEL_CONFIG = {
  model: "nova-2-general",
  smart_format: true,
};

function useTranscriber(
  setTranscript: (updateMethod: string | ((oldvalue: string) => string)) => void
) {
  const [mic, setMic] = useState<MediaRecorder>();
  const [socket, setSocket] = useState<ListenLiveClient>();

  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connected" | "transmitting" | "noResponse"
  >("disconnected");
  const [recording, setRecording] = useState(false);

  const createSocket = (): Promise<ListenLiveClient> => {
    return new Promise((resolve, reject) => {
      const deepgram = createClient(DEEPGRAM_API_KEY);
      let keepAlive;

      const newSocket = deepgram.listen.live(DEEPGRAM_MODEL_CONFIG);

      if (keepAlive) clearInterval(keepAlive);
      keepAlive = setInterval(() => {
        // console.log("KeepAlive sent.");
        newSocket.keepAlive();
      }, 5000);

      newSocket.on("open", async () => {
        console.log("client: connected to deepgram Socket");
        setConnectionStatus("connected");
        resolve(newSocket);
        newSocket.on("Results", (data) => {
          console.log(data);
          setConnectionStatus("transmitting");
          const transcript = data.channel.alternatives[0].transcript;
          if (transcript !== "")
            setTranscript((old) => old + " " + transcript);
        });
        newSocket.on("error", (e) => {
          console.error(e);
          setConnectionStatus("disconnected");
        });
        newSocket.on("warning", (e) => console.warn(e));
        newSocket.on("Metadata", (e) => console.log(e));
        newSocket.on("close", (e) => {
          setConnectionStatus("disconnected");
          setSocket(undefined);
          console.log(e);
        });
      });
    });
  };

  useEffect(() => {
    if (!socket) {
      createSocket().then((newSocket) => setSocket(newSocket));
    }
  }, [recording]);

  const toggleTranscription = async () => {
    try {
      if (!recording) {
        console.log("trying to start recording");
        let currentMic = mic;
        if (!currentMic) {
          currentMic = await getMic();
          setMic(currentMic);
        }
        if (currentMic) {
          let currentSocket = socket;
          if (!currentSocket?.isConnected()) {
            currentSocket = await createSocket();
            setSocket(currentSocket);
          }
          if (currentSocket) {
            startMic(currentMic, currentSocket);
            setRecording(true);
            setConnectionStatus("noResponse");
          } else {
            setConnectionStatus("disconnected");
          }
        } else {
          console.log("can't initialise mic");
        }
      } else {
        if (mic) {
          console.log("Stop Recording");
          setRecording(false);
          mic.stop();
        } else {
          console.error("Microphone not initialized");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { toggleTranscription, connectionStatus };
}

const getMic = async () => {
  const userMedia = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  console.log("mic created");
  return new MediaRecorder(userMedia);
};

const startMic = async (mic: MediaRecorder, newSocket: ListenLiveClient) => {
  mic.start(250);
  mic.onstart = () => {
    console.log("client: microphone opened");
  };

  mic.onstop = () => {
    console.log("client: microphone closed");
  };

  mic.ondataavailable = (e) => {
    const data = e.data;
    console.log("client: sent data to webSocket");
    newSocket.send(data);
  };
};

export default useTranscriber;
