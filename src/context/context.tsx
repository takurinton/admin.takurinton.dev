import { DocumentNode } from 'graphql';
import React, { useContext } from 'react';

type TransformerContextType = {
  updateNode(newNode: DocumentNode): void;
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
    updateNode(newNode) {
      onChangeNode(newNode);
    },
    getCurrentNode() {
      return root;
    }
  };
  return <RendererContext.Provider value={api}>{children}</RendererContext.Provider>;
}
