
const buttonStyles  = require("../dist/components/styled/button")
const colors = require("./colors/index")
const themes = require("./colors/themes");
const colorFunctions = require("./colors/functions");
const myFun =({addBase, addComponents, addUtilities, config, postcss}) =>{
  addComponents(buttonStyles);
  
  const themeInjector = colorFunctions.injectThemes(addBase,themes)
  console.log(themeInjector);
  themeInjector;
};
module.exports = require("tailwindcss/plugin")(myFun, {
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
})