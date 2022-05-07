import { useCallback, useState } from "react";

export const useForm = (initialState: any) => {
  const [state, setState] = useState(initialState);

  console.log(state);
  const handleChange = useCallback((name: string, newValue: any) => {
    setState({ ...state, [name]: newValue });
  }, []);

  return {
    handleChange,
    state,
  };
};
