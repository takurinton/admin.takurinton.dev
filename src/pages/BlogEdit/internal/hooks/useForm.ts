import { useCallback, useState } from "react";

export const useForm = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const handleChange = useCallback((name: string, newValue: any) => {
    console.log(name, ": ", newValue);
    setState({ ...state, [name]: newValue });
  }, []);

  return {
    handleChange,
    state,
  };
};
