import { authExchange } from "@urql/exchange-auth";
import { Toast } from "ingred-ui";
import { ReactNode, useMemo } from "react";
import {
  cacheExchange,
  CombinedError,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  makeOperation,
  Operation,
  Provider,
} from "urql";

export const UrqlProvider = ({
  user,
  getAccessTokenSilently,
  children,
}: {
  user: any;
  getAccessTokenSilently: any;
  children: ReactNode;
}) => {
  const { addToast } = Toast.useToasts();
  const url = import.meta.env.PROD
    ? "https://api-takurinton-dev.onrender.com/graphql"
    : "http://localhost:3001/graphql";
  const client = useMemo(() => {
    return createClient({
      url,
      exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange({
          addAuthToOperation: ({
            authState,
            operation,
          }: {
            authState: any | null;
            operation: Operation;
          }) => {
            console.log("called addAuthToOperation");

            if (!authState) {
              return operation;
            }

            const fetchOptions =
              typeof operation.context.fetchOptions === "function"
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {};

            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${authState.token}`,
                },
              },
            });
          },
          getAuth: async ({ authState }: { authState: any | null }) => {
            console.log("called getAuth");

            if (!authState) {
              const token = await getAccessTokenSilently();
              // const refreshToken = "";
              if (token) {
                return { token, refreshToken: "" };
              }
              return null;
            }
            return null;
          },
          didAuthError: ({
            error,
            authState,
          }: {
            error: CombinedError;
            authState: any;
          }) => {
            console.log("called didAuthError");

            return false;
          },
          willAuthError: ({
            authState,
            operation,
          }: {
            authState: any;
            operation: Operation;
          }) => {
            console.log("called willAuthError");

            return false;
          },
        }),
        errorExchange({
          onError: async (error) => {
            if (error.response?.status === 401) {
              // noop
              // 下で拾ってくれる
            }
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              for (const graphQLError of error.graphQLErrors) {
                addToast(graphQLError.message, {
                  appearance: "error",
                  autoDismiss: true,
                });
              }
            } else {
              addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          },
        }),
        fetchExchange,
      ],
    });
  }, [user]);

  return <Provider value={client}>{children}</Provider>;
};
