const plugin = require("tailwindcss/plugin")
module.exports = {
  content: [{ raw: "" }],
  theme: {
    colors: require("../colors"),
  },
  corePlugins: ["animation", "backgroundColor", "backgroundImage", "backgroundOpacity", "backdropOpacity", "borderColor", "borderOpacity", "divideColor", "divideOpacity", "gradientColorStops", "opacity", "placeholderColor", "preflight", "ringColor", "ringOffsetColor", "ringOffsetWidth", "ringOpacity", "ringWidth", "textColor", "textOpacity", "transitionProperty"],
  plugins: [
    plugin(function ({ addBase, addUtilities, addComponents }) {
      addComponents(require("../../dist/styled"))
    }),
  ],
}
