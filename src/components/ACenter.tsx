import { Flex, Typography } from "ingred-ui";
import React from "react";

export const ACenter = ({
  href,
  text,
}: {
  href: string;
  text: React.ReactNode;
}) => (
  <Flex>
    <Typography align="center">
      リンク:{" "}
      <a href={href} target={"_blank"}>
        {text}
      </a>
    </Typography>
  </Flex>
);
