import { Button, Flex, Typography } from "ingred-ui";
import { useTransformerContext } from "../context/context";

export const Paginator = ({ result }: { result: any }) => {
  const api = useTransformerContext();
  const pages = result.data.analytics.pages;

  const onClick = (page: number) => {
    api.updatePage(page);
    window.scroll(0, 0);
  };

  return (
    <Flex>
      {pages.prev !== 0 ? (
        <Button onClick={() => onClick(pages.prev)}>preview</Button>
      ) : (
        <Flex></Flex>
      )}
      <Typography size="xl" weight="bold" align="center" lineHeight="50px">
        {pages.current}
      </Typography>
      {pages.current !== pages.page_count ? (
        <Button onClick={() => onClick(pages.next)}>next</Button>
      ) : (
        <></>
      )}
    </Flex>
  );
};
