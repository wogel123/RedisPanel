import MinecraftColorCodes from "../lib/MinecraftColorCodes.3.7"

const styleMap = {
    '§4': '#be0000',
    '§c': '#fe3f3f',
    '§6': '#d9a334',
    '§e': '#fefe3f',
    '§2': '#00be00',
    '§a': '#3ffe3f',
    '§b': '#3ffefe',
    '§3': '#00bebe',
    '§1': '#0000be',
    '§9': '#3f3ffe',
    '§d': '#fe3ffe',
    '§5': '#be00be',
    '§f': '#ffffff',
    '§7': '#bebebe',
    '§8': '#3f3f3f',
    '§0': '#000000'
};
const minecraft = {}

minecraft.translateColorCode = (value) => {
    return MinecraftColorCodes(value);
}

minecraft.getColorCode = (code) => {
    return styleMap[code];
}

export default minecraft;