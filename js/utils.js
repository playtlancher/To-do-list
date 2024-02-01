import { InputBlock, TextBlock } from "./blocks.js";

export function createEl(tag) {
    return document.createElement(tag);
}
export function createHTML(value, options) {
    let block;
    if (options && options.tag === "input") {
        block = new InputBlock(value, options);
    } else {
        block = new TextBlock(value, options);
    }
    return block.toHTML();
}
export function css(styles = {}) {
    if (typeof styles === 'string') return styles
    const toString = key => `${key}: ${styles[key]}`
    return Object.keys(styles).map(toString).join(';')
}
export function cssClass(classes = "") {
    if (typeof classes === 'string') return classes;
    return classes.join(" ");
}
export function div(content , options){
    let {classes = "", style = ""} = options;
    const classList = cssClass(classes);
    const cssStyle = css(style);
    return `<div style = "${cssStyle}" class = "${classList}">${content}</div>`
}