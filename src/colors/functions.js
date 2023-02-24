const Color = require("color")
const colorNames = require("./colorNames")
module.exports = {
  generateForegroundColorFrom: function (input, percentage = 0.8) {
    if (Color(input).isDark()) {
      let arr = Color(input).mix(Color("white"), percentage).saturate(10).hsl().array()
      return arr[0].toPrecision(5).replace(/\.?0+$/, "") + " " + arr[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + arr[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
    } else {
      let arr = Color(input).mix(Color("black"), percentage).saturate(10).hsl().array()
      return arr[0].toPrecision(5).replace(/\.?0+$/, "") + " " + arr[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + arr[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
    }
  },
  convertToHsl: function (input) {
    let resultObj = {}
    if (typeof input === "object" && input !== null) {
      Object.entries(input).forEach(([rule, value]) => {
       
        if (colorNames.hasOwnProperty(rule)) {
          const hslArray = Color(value).hsl().array()
          resultObj[colorNames[rule]] = hslArray[0].toPrecision(5).replace(/\.?0+$/, "") + " " + hslArray[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + hslArray[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
        } else {
          resultObj[rule] = value
        }
          
        // auto generate focus colors
        if (!input.hasOwnProperty("primary-focus")) {
          const darkerHslArray = Color(input["primary"]).darken(0.2).hsl().array()
          resultObj["--pf"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, "") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
        }

        if (!input.hasOwnProperty("secondary-focus")) {
          const darkerHslArray = Color(input["secondary"]).darken(0.2).hsl().array()
          resultObj["--sf"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, "") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
        }
      

        // auto generate base colors
        if (!input.hasOwnProperty("base-100")) {
          resultObj["--b1"] = 0 + " " + 0 + "%" + " " + 100 + "%"
        }

        if (!input.hasOwnProperty("base-200")) {
          const darkerHslArray = Color(input["base-100"]).darken(0.1).hsl().array()
          resultObj["--b2"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, "") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
        }

        if (!input.hasOwnProperty("base-300")) {
          if (input.hasOwnProperty("base-200")) {
            const darkerHslArray = Color(input["base-200"]).darken(0.1).hsl().array()
            resultObj["--b3"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, "") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
          } else {
            const darkerHslArray = Color(input["base-100"]).darken(0.1).darken(0.1).hsl().array()
            resultObj["--b3"] = darkerHslArray[0].toPrecision(5).replace(/\.?0+$/, "") + " " + darkerHslArray[1].toPrecision(5).replace(/\.?0+$/, "") + "%" + " " + darkerHslArray[2].toPrecision(5).replace(/\.?0+$/, "") + "%"
          }
        }


        // auto generate content colors
        if (!input.hasOwnProperty("base-content")) {
          resultObj["--bc"] = this.generateForegroundColorFrom(input["base-100"])
        }
        if (!input.hasOwnProperty("primary-content")) {
          resultObj["--pc"] = this.generateForegroundColorFrom(input["primary"])
        }

        if (!input.hasOwnProperty("secondary-content")) {
          resultObj["--sc"] = this.generateForegroundColorFrom(input["secondary"])
        }


      })
      return resultObj
    }
    return input
  },

  injectThemes: function (addBase, themes) {
    let includedTheme = new Object();
    Object.entries(themes).forEach(([theme, index]) => {
      includedTheme[theme] = this.convertToHsl(themes[theme])
    })
    let themeOrder = ['light'];
    // inject themes in order
    themeOrder.forEach((themeName, index) => {
      addBase({
        [":root"]: includedTheme["[data-theme=" + themeName + "]"],
      })
    })
    return {
      includedTheme: includedTheme,
      themeOrder: themeOrder,
    };
  }
}