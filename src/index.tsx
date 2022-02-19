import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WalletContextProvider } from "./contexts/WalletContext";
import { BlockContextProvider } from "./contexts/BlockContext";
import { PlatformDataContextProvider } from "./contexts/PlatformDataContext";

ReactDOM.render(
  <React.StrictMode>
    <BlockContextProvider>
      <WalletContextProvider>
        <PlatformDataContextProvider>
          <App />
        </PlatformDataContextProvider>
      </WalletContextProvider>
    </BlockContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
