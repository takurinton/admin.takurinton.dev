import { Toast } from "ingred-ui";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { OperationContext, OperationResult } from "urql";

export const useForm = (initialState: any) => {
  const { addToast } = Toast.useToasts();
  const history = useHistory();
  const [state, setState] = useState(initialState);

  const handleChange = useCallback(
    (name: string, newValue: any) => {
      setState({ ...state, [name]: newValue });
    },
    [state]
  );

  const handleSubmit = useCallback(
    (
      updatePost: (
        variables?: object | undefined,
        context?: Partial<OperationContext> | undefined
      ) => Promise<OperationResult<any, object>>
    ) => {
      updatePost(state).then((result) => {
        // レスポンスを見て分岐
        if (result.error) {
          addToast("保存に失敗しました", {
            appearance: "error",
            autoDismiss: true,
          });
        } else {
          addToast("保存しました", {
            appearance: "success",
            autoDismiss: true,
          });

          setTimeout(() => {
            history.push("/blog");
          }, 3000);
        }
      });
    },
    [state]
  );

  return {
    handleSubmit,
    handleChange,
    state,
  };
};
