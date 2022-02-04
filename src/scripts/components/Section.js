
class Section {
    constructor(containerSelector, items, renderer) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    };

    addItem(element) {
        this._container.prepend(element)
    };

    renderItems() {
        this._items.forEach(item => this._renderer(item))
    };
}

export { Section };
