/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const InputsContext = createContext();

function InputsContextProvider({ children }) {
  const [inputs, setInputs] = useState({
    category: "",
    descriptionInput: "",
    priority: false,
    date: "",
    time: "",
    // id: Date.now(), // We will now use the id created by mongo db so we don't need this id anymore
  });

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleChecked(e) {
    setInputs({ ...inputs, priority: e.target.checked });
  }

  return (
    <InputsContext.Provider value={{ inputs, setInputs, handleChange, handleChecked }}>
      {children}
    </InputsContext.Provider>
  );
}

export default InputsContextProvider;
