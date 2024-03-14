import Form from "./pages/Form";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import InputsContextProvider from "./contexts/InputsContext";

function App() {
  return (
    <>
      <InputsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </InputsContextProvider>
    </>
  );
}

export default App;
