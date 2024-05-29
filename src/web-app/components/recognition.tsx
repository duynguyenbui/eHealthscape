//@ts-nocheck
"use client";

import "regenerator-runtime/runtime";
import { FC, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "./ui/button";

interface TextProps {}

const RecordSpeech: FC<TextProps> = ({}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <h1 className="lg:text-5xl font-bold underline decoration-wavy text-2xl">
        Speech 2 text
      </h1>
      <p className=" mt-6 pb-32 mb-4 rounded-md bg-base-100 lg:w-96 lg:h-48 w-64 h-64">
        <span className="ml-2 font-bold text-xl bg-base-100">
          Generated Text:
        </span>
        <span className="text-muted-foreground">{transcript}</span>
      </p>
      <p className="mb-2 text-xl font-bold">
        Microphone: {listening ? "Listing to your voice.." : "off"}
      </p>
      <div className="flex gap-3">
        <Button
          variant="premium"
          className="btn btn-primary btn-sm"
          onClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
              language: "Vietnamese",
            })
          }
        >
          Start
        </Button>
        <Button
          variant="destructive"
          className="btn btn-secondary btn-sm"
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </Button>
        <Button
          variant="secondary"
          className="btn btn-accent btn-sm"
          onClick={resetTranscript}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default RecordSpeech;
