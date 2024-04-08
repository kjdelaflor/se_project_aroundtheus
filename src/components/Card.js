export default class Card {
  constructor(
    { name, link},
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    removeLike,
    likeCard,
    isLiked,
    _id
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._removeLike = removeLike;
    this._isLiked = isLiked;
    this.id = _id;
    this._likeCard = likeCard;
  }

  getView() {
    this._cardEl = this._getTemplate();
    this._likeButton = this._cardEl.querySelector(".card__like-button");
    this._trashButton = this._cardEl.querySelector(".card__list-trash");

    this._cardTitleEl = this._cardEl.querySelector("#card-title");
    this._cardImageEl = this._cardEl.querySelector("#card-image");

    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    this._setEventListeners();
    return this._cardEl;
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
    this._likeButton.addEventListener("click", () => {
      if (this._isLiked) {
        this._removeLike(this);
      } else {
        this._likeCard(this);
      }
    });
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  deleteCard() {
    this._cardEl.remove();
    this._cardEl = null;
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this.renderLikes();
  }

  getId() {
    return this.id;
  }

  renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
}
