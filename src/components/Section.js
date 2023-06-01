export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    rendererItems(items, user) {
        items.forEach(item => {
            return this._renderer(item, user);
        });
    }

    addItem = (element) => {
        this._container.append(element);
    };

    addItemPrepend = (element) => {
        this._container.prepend(element);
    };
}