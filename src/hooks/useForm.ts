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

  const handleChange = (eve: React.ChangeEvent<HTMLSelectElement>) => {
    const _state = { ...state, [eve.target.name]: eve.target.value };
    if (_state.domain === "undefined") _state.domain = undefined;
    if (_state.path === "") _state.path = undefined;
    setState(_state);
    console.log(_state);
  };

  return {
    handleChange,
    state,
  };
};
