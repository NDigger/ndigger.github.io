export class Vector2 {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Size {
    width;
    height;

    constructor(width, height) {
        this.width = width,
        this.height = height;
    }
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