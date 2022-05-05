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

  const handleChange = (name: string, newValue: string | undefined) => {
    const _state = { ...state, [name]: newValue };
    setState(_state);
  };

  return {
    handleChange,
    state,
  };
};
