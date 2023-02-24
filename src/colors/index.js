function withOpacityValue(variable, fallbackColor) {
  return ({ opacityValue }) => {
    let fallbackColorValue = ""
    if (fallbackColor) {
      fallbackColorValue = `, var(${fallbackColor})`
    }
    if (opacityValue === undefined) {
      return `hsl(var(${variable}${fallbackColorValue}))`
    }
    return `hsl(var(${variable}${fallbackColorValue}) / ${opacityValue})`
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

    "base-100": withOpacityValue("--b1"),
    "base-200": withOpacityValue("--b2", "--b1"),
    "base-300": withOpacityValue("--b3", "--b2"),
    "base-content": withOpacityValue("--bc"),

  }
  
  module.exports = colorObject
  