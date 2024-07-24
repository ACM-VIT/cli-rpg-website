import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        glass: {
          backdropFilter: "blur(10px)",
          borderRadius: "full",
          fontSize: "18px",
          color: "white",
        },
      },
    },
  },
});

export default theme;
