const css_regex = "/\\.css$/";
const file_regex =
  "/.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(?.*)?$/";

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
          if (rule && rule.loader && rule.loader.match(/\Wcss-loader/g)) {
            return {
              ...rule,
              options: {
                ...rule.options,
                sourceMap: true,
                localsConvention: "camelCase",
                modules: {
                  localIdentName:
                    configType === "DEVELOPMENT"
                      ? "[name]__[local]"
                      : "[hash:base64]",
                },
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

    // svg inline imports
    // const fileLoaderRule = config.module.rules.find(
    //   (rule) => rule.test.toString() === file_regex
    // );
    // fileLoaderRule.exclude = /\.inline.svg$/;
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack", "url-loader"],
    // });

    return config;
  },
};
