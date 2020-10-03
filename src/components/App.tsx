import React from "react";
import {
  ThemeProvider,
  CSSReset,
  Heading,
  List,
  ListItem,
  Box,
  Text,
  Grid
} from "@chakra-ui/core";
import { format, startOfWeek } from "date-fns";

const DB = {
  menu: {
    M: "Margherita Monday",
    T: "Broccoli and Tofu w/ Miso Stir Fried Rice",
    W: "Girl Night / Nick Climbing",
    Th: "Shrimp, Zucchini, and Orzo",
    F: "Pizza",
    Sa: "Order In",
    Su: "Out on the town"
  }
} as const;

const DAYS: Array<keyof typeof DB["menu"]> = [
  "M",
  "T",
  "W",
  "Th",
  "F",
  "Sa",
  "Su"
];

const App: React.FC = () => {
  const currentWeek = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "MMM do"
  );
  return (
    <ThemeProvider>
      <CSSReset />
      <Box p="3" border="8px solid" borderColor="hotpink" height="100vh">
        <Heading mt="0" mb="4">
          Weekly Menu - {currentWeek}
        </Heading>
        <List spacing="4" px="0" overflow="scroll" height="100%">
          {DAYS.map(day => (
            <ListItem fontFamily="body" fontSize="2xl">
              <Grid templateColumns="3rem 1fr" gap="3">
                <Text as="span" fontWeight="bold">
                  {day}:
                </Text>
                {DB.menu[day]}
              </Grid>
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default App;
