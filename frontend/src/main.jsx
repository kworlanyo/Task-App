import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import InputsContextProvider from "./contexts/InputsContext.jsx";
import DataContextProvider from "./contexts/DataContext.jsx";
import "./index.css";

// The InputsContextProvider and the DataContextProvider will now be in the Main.jsx so that the App.jsx will have access to the two contexts.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InputsContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </InputsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
