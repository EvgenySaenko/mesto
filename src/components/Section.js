export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    rendererItems(items) {
        items.forEach(item => {
            return this._renderer(item);
        });
    }

    setItem = (element) => {
        this._container.prepend(element);
    }
}