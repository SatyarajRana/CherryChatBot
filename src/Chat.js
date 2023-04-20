import React from "react";
import "./Chat.css";
import { useEffect, useState } from "react";
import askGPT from "./services/openai";

export default function Chat() {
  let counter = 0;
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "h" && counter === 0) {
        console.log("h pressed");
        // wait for 2 seconds here
        setTimeout(() => {
          console.log("2 seconds passed");
          document.querySelector(".chatbot").style.display = "block";
        }, 2000);

        document.querySelector(".init-display-message").style.display = "none";
      }
    });
  }, []);

  const [messages, setMessages] = useState([
    {
      text: "Hello, how can I help you today?",
      isOutgoing: false,
      time: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSendOnClick() {
    const event2 = new KeyboardEvent("keydown", { key: "Enter" });
    document.dispatchEvent(event2);
    if (inputValue.trim() !== "") {
      console.log("input value is " + inputValue.trim());

      sendToGPT(inputValue);
    }
  }

  function handleSend(event) {
    // console.log("Key pressed");

    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        console.log("input value is " + inputValue.trim());

        sendToGPT(inputValue);
      }
    }
  }

  function sendToGPT(inputValue) {
    askGPT(inputValue).then((response) => {
      console.log("here is the respone " + response);
      console.log(messages);
      setMessages([
        ...messages,
        {
          text: inputValue,
          isOutgoing: true,
          time: new Date(),
        },
        {
          text: response,
          isOutgoing: false,
          time: new Date(),
        },
      ]);
      console.log(messages);
      const speak = () => {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(response.slice(1));
          window.speechSynthesis.speak(utterance);
        } else {
          alert("Sorry, speech synthesis is not supported in your browser.");
        }
      };
      speak();
    });

    setInputValue("");
  }
  function handleFAQs() {
    // set display of faqButton to block
    document.querySelector(".button-container").style.display = "block";
  }

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  function handlefaq(num) {
    if (num === 1 && count1 === 0) {
      setCount1(1);

      setMessages([
        ...messages,
        {
          text: "Who are you?",
          isOutgoing: true,
          time: new Date(),
        },
        {
          text: "I am a chatbot",
          isOutgoing: false,
          time: new Date(),
        },
      ]);
      const speak = () => {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance("I am a chatbot");
          window.speechSynthesis.speak(utterance);
        } else {
          alert("Sorry, speech synthesis is not supported in your browser.");
        }
      };
      speak();
    } else if (num === 2 && count2 === 0) {
      setCount2(1);
      setMessages([
        ...messages,
        {
          text: "What can you do?",
          isOutgoing: true,
          time: new Date(),
        },
        {
          text: "I can help you with your queries as well as help you with search",
          isOutgoing: false,
          time: new Date(),
        },
      ]);
      const speak = () => {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(
            "I can help you with your queries as well as help you with search"
          );
          window.speechSynthesis.speak(utterance);
        } else {
          alert("Sorry, speech synthesis is not supported in your browser.");
        }
      };
      speak();
    } else if (num === 3 && count3 === 0) {
      setCount3(1);
      setMessages([
        ...messages,
        {
          text: "Who made you?",
          isOutgoing: true,
          time: new Date(),
        },
        {
          text: "I was made by Rana Satyaraj ",
          isOutgoing: false,
          time: new Date(),
        },
      ]);
      const speak = () => {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(
            "I was made by Rana Satyaraj"
          );
          window.speechSynthesis.speak(utterance);
        } else {
          alert("Sorry, speech synthesis is not supported in your browser.");
        }
      };
      speak();
    }
  }

  return (
    <div className="chatbot">
      <div className="messages">
        <button onClick={handleFAQs}>FAQs</button>
        <br />
        <custon className="button-container">
          <button
            className="faqButton"
            onClick={() => {
              handlefaq(1);
            }}
          >
            Who are you?
          </button>
          <button
            className="faqButton"
            onClick={() => {
              handlefaq(2);
            }}
          >
            What can you do?
          </button>
          <button
            className="faqButton"
            onClick={() => {
              handlefaq(3);
            }}
          >
            Who made you?
          </button>
        </custon>

        {messages.map((message, index) => (
          <div
            className={`message ${
              message.isOutgoing ? "message-outgoing" : ""
            }`}
            key={index}
          >
            <div
              className={`message-text ${
                message.isOutgoing ? "message-outgoing-text" : ""
              }`}
            >
              {message.text}
            </div>
            <div className="message-time">
              {message.time.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSend} // this is the important part
        />

        {/* click the following button on pressing enter */}

        <button onClick={handleSendOnClick}>Send</button>
      </div>
    </div>
  );
}
