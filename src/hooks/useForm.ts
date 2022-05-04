import { OptionType } from "ingred-ui";
import { useState } from "react";

export const useForm = () => {
  const [state, setState] = useState<{
    domain: string | undefined;
    path: string | undefined;
    start: string;
    end: string;
  }>({
    domain: undefined,
    path: undefined,
    start: "",
    end: "",
  });

  const handleChange = (name: string, newValue: string) => {
    console.log(name, newValue);
    const _state = { ...state, [name]: newValue };
    if (_state.domain === "undefined") _state.domain = undefined;
    if (_state.path === "") _state.path = undefined;
    setState(_state);
  };

  return {
    handleChange,
    state,
  };
};
