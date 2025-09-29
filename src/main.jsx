import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import { LoadingProvider } from "./context/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>
);
