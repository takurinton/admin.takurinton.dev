import { DocumentNode, visit } from 'graphql';
import React, { useContext } from 'react';

type TransformerContextType = {
  updateNode(name: string, value: string): void;
  getCurrentNode(): DocumentNode;
};

const RendererContext = React.createContext<TransformerContextType>(null as any);

export const  useTransformerContext = () => {
  return useContext(RendererContext);
}

export const TransformerContextProvider = ({
  children,
  root,
  onChangeNode,
}: {
  children: React.ReactNode;
  root: DocumentNode;
  onChangeNode: (root: DocumentNode) => void;
}) => {
  const api: TransformerContextType = {
    updateNode(name, value) {
      const newNode = visit(root, {
        Argument: arg => {
          if (arg.name.value === name) {
            return {
              ...arg, 
              value: {
                ...arg.value, 
                value,
              }
            }
          } 
        }
      })
      onChangeNode(newNode);
    },
    getCurrentNode() {
      return root;
    }
  };
  return <RendererContext.Provider value={api}>{children}</RendererContext.Provider>;
}
