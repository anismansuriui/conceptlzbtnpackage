module.exports = {
    injectThemes: function (addBase, themes) {
        let includedTheme = new Object();
        console.log(themes);
        Object.entries(themes).forEach(([theme, index]) => {
            includedTheme[theme] = themes[theme];
        });
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