export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._cardEl = this._getTemplate();
    this._cardLikeButton = this._cardEl.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardEl.querySelector("card__list-trash");

    this._cardTitleEl = this._cardEl.querySelector("#card-title");
    this._cardImageEl = this._cardEl.querySelector("#card-image");

    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
  }

  _handleDeleteButton() {
    this._cardEl.remove();
    this._cardEl = null;
  }

  _handleLikeButton() {
    this._cardEl
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
}
