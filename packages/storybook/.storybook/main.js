const css_regex = "/\\.css$/";

module.exports = {
  stories: [
    "../../../**/*.stories.mdx",
    "../../../**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-backgrounds",
    "@storybook/addon-events",
    "@storybook/addon-jest",
    "@storybook/addon-queryparams",
    "@storybook/addon-storysource",
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
  ],
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

    // sass support
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });

    // Return the altered config
    return config;
  },
};
