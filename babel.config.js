const plugins = [
  [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "~src/theme",
    },
  ],
  [
    "import",
    {
      libraryName: "ant-design-vue",
      libraryDirectory: "es"
    }
  ]
];

if (process.env.NODE_ENV === "production") {
  plugins.push(["transform-remove-console", { exclude: ["error", "info"] }]);
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
