import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const cardPreview = new PopupWithImage("#modal-image-preview");
cardPreview.setEventListeners();

const userInformation = new UserInfo({
  name: "#profile-title",
  description: "#profile-description",
});

const editFormValidator = new FormValidator(
  constants.validationSettings,
  constants.profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  constants.validationSettings,
  constants.addCardFormElement
);
addFormValidator.enableValidation();

/*card.js*/

function handleImageClick(name, link) {
  constants.modalImagePreviewLink.src = link;
  constants.modalImagePreviewLink.alt = name;
  constants.modalPreviewTitle.textContent = name;
  openModal(constants.modalPreviewImage);
}

function createCard(cardData) {
  const cardEl = new Card(cardData, constants.cardSelector, handleImageClick);
  return cardEl.getView();
}

function renderCard(cardData, wrapper) {
  const cardEl = createCard(cardData);
  wrapper.prepend(cardEl);
}

/*Functions */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOutside);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOutside);
}

function closeModalEsc(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function closeModalOutside(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

/*Event Handler*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  constants.profileTitle.textContent = constants.profileTitleInput.value;
  constants.profileDescription.textContent =
    constants.profileDescriptionInput.value;
  closeModal(constants.profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = constants.cardTitleInput.value;
  const link = constants.cardUrlInput.value;
  renderCard({ name, link }, constants.cardListEl);
  closeModal(constants.addCardModal);
  evt.target.reset();
  addFormValidator.disableButton();
}

/*Event Listeners */

constants.profileEditButton.addEventListener("click", () => {
  constants.profileTitleInput.value = constants.profileTitle.textContent;
  constants.profileDescriptionInput.value =
    constants.profileDescription.textContent;
  openModal(constants.profileEditModal);
});

constants.previewCloseButton.addEventListener("click", () =>
  closeModal(constants.modalPreviewImage)
);

constants.profileEditCloseButton.addEventListener("click", () =>
  closeModal(constants.profileEditModal)
);

constants.profileEditForm.addEventListener("submit", handleProfileEditSubmit);
constants.addCardFormElement.addEventListener("submit", handleAddCardSubmit);

constants.addNewCardButton.addEventListener("click", () =>
  openModal(constants.addCardModal)
);
constants.addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

constants.initialCards.forEach((cardData) =>
  renderCard(cardData, constants.cardListEl)
);
