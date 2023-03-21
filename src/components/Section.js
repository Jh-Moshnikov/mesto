export default class Section {
    constructor({items, renderer}, selector) {
     this._initialElements = items;
     this._renderer = renderer;
     this._container = document.querySelector(selector);
    }
 //публичный метод, который отвечает за отрисовку всех элементов
    renderItems() {
     this._initialElements.forEach((item) => {
       this._renderer(item);
     });
    };
 
    addItem(renderElement) {
      this._container.prepend(renderElement);
    };
  };