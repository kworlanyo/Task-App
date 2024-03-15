import Form from "./pages/Form";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import InputsContextProvider from "./contexts/InputsContext";
import DataContextProvider from "./contexts/DataContext";

function App() {
  return (
    <>
      <InputsContextProvider>
        <DataContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </DataContextProvider>
      </InputsContextProvider>
    </>
  );
}

export default App;
