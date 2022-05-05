import { useState } from "react";
import { useQuery } from "urql";
import { DocumentNode, parse, print } from "graphql";
import {
  PORTFOLIO,
  BLOG,
  PORTFOLIO_NUMBER,
  BLOG_NUMBER,
  ALL_NUMBER,
  PORTFOLIO_DEV,
  PORTFOLIO_DEV_NUMBER,
  BLOG_DEV,
  BLOG_DEV_NUMBER,
} from "../utils/constants";
import { getParams } from "../utils/getParams";
import { TransformerContextProvider } from "../context/context";
import { Detail } from "../components/Detail";
import { Flex, Spinner, Typography } from "ingred-ui";

const now = new Date();
const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 1}`;

const initialQuery = (domain: number, path: string) => `
{
  analytics_by_path_for_blog(domain: ${domain}, path: "${path}", start: "2021-08-27", end: "${today}") {
    count
    date_count {
      date 
      count
    }
  }
}
`;

export const DetailForm = () => {
  const domainString = getParams("domain");
  let domain;
  switch (domainString) {
    case PORTFOLIO:
      domain = PORTFOLIO_NUMBER;
      break;
    case BLOG:
      domain = BLOG_NUMBER;
      break;
    case PORTFOLIO_DEV:
      domain = PORTFOLIO_DEV_NUMBER;
      break;
    case BLOG_DEV:
      domain = BLOG_DEV_NUMBER;
      break;
    default:
      domain = ALL_NUMBER;
      break;
  }
  const path = getParams("path") ?? "";
  const [query, setQuery] = useState<string>(initialQuery(domain, path));
  const [ast, setAst] = useState<DocumentNode>(
    parse(initialQuery(domain, path))
  );

  const [result] = useQuery({
    query,
  });

  if (query === initialQuery(domain, path)) {
    return result.fetching ? (
      <Flex style={{ width: "fit-content", margin: "auto", padding: "40px" }}>
        <Spinner />
      </Flex>
    ) : (
      <TransformerContextProvider
        root={ast}
        onChangeNode={(ast) => {
          setAst(ast);
          setQuery(print(ast));
          console.log(print(ast));
        }}
      >
        <Detail
          ast={ast}
          result={result}
          domainString={domainString}
          path={path}
        />
      </TransformerContextProvider>
    );
  }

  return (
    <>
      <TransformerContextProvider
        root={ast}
        onChangeNode={(ast) => {
          setAst(ast);
          setQuery(print(ast));
          console.log(print(ast));
        }}
      >
        <Detail
          ast={ast}
          result={result}
          domainString={domainString}
          path={path}
        />
      </TransformerContextProvider>
    </>
  );
};
