import { cssClass, css } from "./utils.js";
class Block {
    constructor(value, options) {
        this.value = value;
        this.options = options;
    }
    toHTML() {
        throw new error("Metod toHTML must be realised");
    }
}
export class TextBlock extends Block {
    constructor(value, options) {
        super(value, options);
    }
    toHTML() {
        const { id = "", tag = "span", style = "", classes = "" } = this.options;
        const cssStyle = css(style);
        const classList = cssClass(classes);
        return `<${tag} style="${cssStyle}" , id="${id}" class="${classList}">${this.value}</${tag}>`;
    }
}
export class InputBlock extends Block {
    constructor(value, options) {
        super(value, options);
    }
    toHTML() {
        const { tag = "input", placeHolder = "" ,  id = "", type = "text", style = "", classes = "" } = this.options;
        const cssStyle = css(style);
        const classList = cssClass(classes);
        if (type === "checkbox") {
            return `<${tag} type="${type}" style="${cssStyle}" class="${classList}">`;
        } else {
            return `<${tag} type="${type}" style="${cssStyle}" id="${id}" class="${classList}" placeholder="${placeHolder}" value="${this.value}">`;
        }
    }
}