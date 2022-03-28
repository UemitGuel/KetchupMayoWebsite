import { extendTheme } from "@chakra-ui/react";
import { slate } from "@radix-ui/colors";

const transformRadixToChakraFormat = (scale) => {
  const output = Object.values(scale).reduce(
    (accumulator, currentValue, index) => {
      if (index === 0) {
        accumulator[`50`] = currentValue;
      } else {
        accumulator[`${index}00`] = currentValue;
      }
      return accumulator;
    },
    {}
  );
  return output;
}; 

const radixNeutral = transformRadixToChakraFormat(slate);

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: 'neutral.1100',
        color: 'white'
      },
    }),
  },
  colors: {    
    neutral: {
      ...radixNeutral,
    },
  },
});

export default theme;