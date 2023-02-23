function withOpacityValue(variable, fallbackColor) {
    return ({ opacityValue }) => {
      let fallbackColorValue = ""
      if (fallbackColor) {
        fallbackColorValue = `, var(${fallbackColor})`
      }
      if (opacityValue === undefined) {
        return `var(${variable})`
      }
      return `var(${variable})`
    }
  }
  
  let colorObject = {
    transparent: "transparent",
    current: "currentColor",
  
    primary: withOpacityValue("--p"),
    "primary-focus": withOpacityValue("--pf", "--p"),
    "primary-content": withOpacityValue("--pc"),
  
    secondary: withOpacityValue("--s"),
    "secondary-focus": withOpacityValue("--sf", "--s"),
    "secondary-content": withOpacityValue("--sc"),

  }
  
  module.exports = colorObject
  