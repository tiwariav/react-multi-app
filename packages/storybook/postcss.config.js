module.exports = {
  sourceMap: true,
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 1,
      features: {
        "custom-properties": false,
      },
    },
  },
};
