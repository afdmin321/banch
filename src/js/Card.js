export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = document.querySelector(cardSelector);
    this.title = data.title;
    this.img = data.img;
    this.size = data.size;
    this.aricleNumber = data.aricleNumber;
    this.price = data.price;
  }
  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".product")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(".product__title");
    this._img = this._element.querySelector(".product__img");
    this._size = this._element.querySelector(".product__size");
    this._articleNumber = this._element.querySelector(".product__article");
    this._price = this._element.querySelector(".product__price");

    this._title.textContent = this.title.toUpperCase();
    this._img.src = this.img;
    this._img.alt = this.title;
    this._size.textContent = "Габариты: " + this.size;
    this._articleNumber.textContent = "Артикул: " + this.aricleNumber;
    this._price.textContent =
      "Цена: " +
      (this.price ? Math.ceil(this.price * 1.115) + " \u20bd" : "по запросу");

    return this._element;
  }
}
