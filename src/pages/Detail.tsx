import { useState } from "react";
import { useQuery } from "urql";
import { Box } from "@chakra-ui/react";
import { ACenter } from '../components/text';
import { PORTFOLIO, BLOG, PORTFOLIO_NUMBER, BLOG_NUMBER, ALL_NUMBER } from '../utils/constants';

const getParam = (name: string) => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const res = regex.exec(url);
  if (!res) return null;
  if (!res[2]) return '';
  return decodeURIComponent(res[2].replace(/\+/g, " "));
}

const initialQuery = (domain: number, path: string) => `
{
  analytics(domain: ${domain}, path: "${path}") {
    count
    analytics {
      id 
      domain 
      path 
      created_at
    }
  }, 
  date_count {
    date 
    count
  }
}
`

export const Detail = () => {
  const domainString = getParam('domain');
  const domain = domainString === PORTFOLIO ?
  PORTFOLIO_NUMBER: domainString === BLOG ? 
  BLOG_NUMBER: ALL_NUMBER;
  const path = getParam('path') ?? '';
  const [query, setQuery] = useState<string>(initialQuery(domain, path))

  const [result] = useQuery({
    query: query,
  });

  return (
    <Box>
      <ACenter href={`https://${domainString}${path}`} text={`https://${domainString}${path}`}></ACenter>
    </Box>
  );
}