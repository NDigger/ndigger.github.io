class Struct {
    duplicate() {}
}

export class Vector2 extends Struct {
    x;
    y;

    constructor(x, y) {
        super()
        this.x = x;
        this.y = y;
    }

    duplicate = () => new Vector2(this.x, this.y);
}

export class Size extends Struct {
    width;
    height;

    constructor(width, height) {
        super()
        this.width = width,
        this.height = height;
    }

    duplicate = () => new Size(this.width, this.height)
}

export class Color extends Struct {
    r = 0;
    g = 0;
    b = 0;
    a = 1;

    constructor(r, g, b, a) {
        super()
        if (r !== undefined && g !== undefined && b !== undefined) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        if(a != undefined) this.a = a;
    }

    getRGBStyle = () => `rgb(${this.r}, ${this.g}, ${this.b})`;
    getRGBAStyle = () => `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;

    duplicate = () => new Color(this.r, this.g, this.b, this.a);
}

export const getDocumentSize = () =>  new Size(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
);

export const restartCssAnimation = (element, className) => {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
}

export const Anchor = Object.freeze({
    TOP_LEFT: 0,
    TOP: 1,
    TOP_RIGHT: 2,
    RIGHT: 3,
    BOTTOM_RIGHT: 4,
    BOTTOM: 5,
    BOTTOM_LEFT: 6,
    LEFT: 7,
});
