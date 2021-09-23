import { Box } from "@chakra-ui/react";
import { ACenter, H1 } from './components';

const getParam = (name: string) => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const res = regex.exec(url);
  if (!res) return null;
  if (!res[2]) return '';
  return decodeURIComponent(res[2].replace(/\+/g, " "));
}

export const Detail = () => {
  const domain = getParam('domain');
  const path = getParam('path');
  return (
    <Box>
      <ACenter href={`https://${domain}${path}`} text={`https://${domain}${path}`}></ACenter>
    </Box>
  );
}