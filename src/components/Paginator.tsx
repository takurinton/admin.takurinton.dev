import { Flex, Pager } from "ingred-ui";
import { useTransformerContext } from "../context/context";

export const Paginator = ({ result }: { result: any }) => {
  const api = useTransformerContext();
  const analytics = result.data.analytics;

  const onClick = (page: number) => {
    api.updatePage(page);
    window.scroll(0, 0);
  };

  return (
    <Flex>
      <Pager
        per={30}
        total={analytics.count}
        index={analytics.current}
        onClick={(index) => {
          onClick(index);
        }}
      />
    </Flex>
  );
};
