module.exports = {
  stories: [
    "../../../**/*.stories.mdx",
    "../../../**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    const cssRule = config.module.rules.find(
      (rule) => rule.test.toString() === css_regex
    );
    config.module.rules = [
      ...config.module.rules.filter(
        (rule) => rule.test.toString() !== css_regex
      ),
      {
        ...cssRule,
        exclude: /\.module\.css$/,
      },
      {
        ...cssRule,
        test: /\.module\.css$/,
        use: cssRule.use.map((rule) => {
          if (rule && rule.loader && rule.loader.includes("css-loader")) {
            return {
              ...rule,
              options: {
                ...rule.options,
                modules: true,
              },
            };
          }
          return rule;
        }),
      },
    ];

    // Return the altered config
    return config;
  },
};
