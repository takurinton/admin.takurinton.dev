import { ChangeEvent, useCallback, useState } from "react";

export const useForm = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }, []);

  return {
    handleChange,
    state,
    setState,
  };
};
