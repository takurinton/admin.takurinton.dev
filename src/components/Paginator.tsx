import { Flex, Pager } from "ingred-ui";
import styled from "styled-components";
import { useTransformerContext } from "../context/context";

export const Paginator = ({ result }: { result: any }) => {
  const api = useTransformerContext();
  const analytics = result.data.analytics;

  const onClick = (page: number) => {
    api.updatePage(page);
    window.scroll(0, 0);
  };

  return (
    <PaginatorContainer>
      <Pager
        per={30}
        total={analytics.count}
        index={analytics.pages.current}
        onClick={(index) => {
          onClick(index);
        }}
      />
    </PaginatorContainer>
  );
};

const PaginatorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  width: fit-content;
  margin: auto;
`;
