import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import Chat from "./Chat";
import "./dispMessage.css";
//useEffect
import React from "react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <div className="chatbot">hello</div> */}
    <Chat className="chat-component" />
    <div className="init-display-message">
      <h1 className="initMessage">Press H to start</h1>
    </div>

    <App />
  </StrictMode>
);
