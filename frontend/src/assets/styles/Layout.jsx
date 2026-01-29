import { Box, Stack, Text } from "@mantine/core";

export default function Layout({ children }) {
  return (
    <Box component="main"
      bg="orange.1"
      w="100%"          // täysi leveys
      h="100%"          // täysi korkeus
      mih="100vh"       // vähintään koko ruudun korkeus
      p="xl"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
        <style>
          {`
            h1, h2, h3, h4, h5, h6 {
              font-family: Georgia, serif;
              font-weight: 900;
              color: #b35400; /* tumma oranssi */
              text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
            }
          `}
        </style>
      <Stack
        spacing="xl"
        align="center"
        style={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        {children}
      </Stack>

      <Box
        component="footer"
        mt="xl"
        pt="md"
        style={{
          textAlign: "center",
          borderTop: "1px solid #ccc",
        }}
      >
        <Text size="sm" c="dimmed">
          © {new Date().getFullYear()} Project AA — All rights reserved
        </Text>
      </Box>
    </Box>
  );
}