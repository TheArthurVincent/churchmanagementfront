import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
interface TextsWithTranslateSlideLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function TextsWithTranslateSlideLessonModel({
  element,
}: TextsWithTranslateSlideLessonModelProps) {
  return (
    <ul
      style={{
        padding: "5px",
        margin: "10px 0",
        fontFamily: "Lato",
        fontSize: "3rem",
        display:"grid",
        gap:"1.5rem"
      }}
    >
      {element.audios &&
        element.audios.map((audio: any, index: number) => {
          return (
              <div key={index}>{audio.enusAudio}</div>
          );
        })}
    </ul>
  );
}
