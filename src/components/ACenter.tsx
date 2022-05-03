import { Box } from "@chakra-ui/react";
import React from "react";

export const ACenter = ({
  href,
  text,
}: {
  href: string;
  text: React.ReactNode;
}) => (
  <Box textAlign={"center"}>
    リンク:{" "}
    <a href={href} target={"_blank"}>
      {text}
    </a>
  </Box>
);
