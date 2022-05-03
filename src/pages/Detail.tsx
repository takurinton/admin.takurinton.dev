import { useState } from "react";
import { useQuery } from "urql";
import { DocumentNode, parse, print } from "graphql";
import { H1 } from "../components/H1";
import {
  PORTFOLIO,
  BLOG,
  PORTFOLIO_NUMBER,
  BLOG_NUMBER,
  ALL_NUMBER,
} from "../utils/constants";
import { getParams } from "../utils/getParams";
import { TransformerContextProvider } from "../context/context";
import { Detail } from "../components/Detail";

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
  const domain =
    domainString === PORTFOLIO
      ? PORTFOLIO_NUMBER
      : domainString === BLOG
      ? BLOG_NUMBER
      : ALL_NUMBER;
  const path = getParams("path") ?? "";
  const [query, setQuery] = useState<string>(initialQuery(domain, path));
  const [ast, setAst] = useState<DocumentNode>(
    parse(initialQuery(domain, path))
  );

  const [result] = useQuery({
    query: query,
  });

  if (query === initialQuery(domain, path)) {
    return result.fetching ? (
      <H1 text={"loading..."}></H1>
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
