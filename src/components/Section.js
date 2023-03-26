export default class Section {
    constructor({renderer}, selector) {
     this._renderer = renderer;
     this._container = document.querySelector(selector);
    }
 //публичный метод, который отвечает за отрисовку всех элементов
    renderItems(items) {
     items.forEach(elem => {
       this._renderer(elem);
     });
    };

    addItem(item) {
      this._container.prepend(item);
    };
  };