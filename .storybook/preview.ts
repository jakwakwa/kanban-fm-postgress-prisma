import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    zeplinLink: "https://app.zeplin.io/project/6734067cb96fb005996c6dbc",
  },
};

export default preview;
