import React, { useState, useEffect } from "react";

function TextFileReader(props) {
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchTextFile() {

    let reader = new FileReader();
      reader.addEventListener("load", (event) => {
        setText(event.target.result);
        let {src} =  props;
        reader.readAsText(src[0]);

      });

    // let {src}  = props; 
    // reader.readAsText(src[0]);
         
    }
    fetchTextFile();
  }, []);

  return <div>{text}</div>;
}

export default TextFileReader;