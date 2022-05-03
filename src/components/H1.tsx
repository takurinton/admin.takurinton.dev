import { Box } from "@chakra-ui/react";
import React from "react";

export const H1 = ({ text }: { text: React.ReactNode }) => (
  <Box textAlign={"center"} margin={"50px 0"}>
    <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>{text}</h1>
  </Box>
);
