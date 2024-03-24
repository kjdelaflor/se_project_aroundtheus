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
  cardPreview.open({ name, link });
}

function createCard(cardData) {
  const cardEl = new Card(cardData, constants.cardSelector, handleImageClick);
  return cardEl.getView();
}

const editModalForm = new PopupWithForm("#profile-edit-modal", (data) => {
  userInformation.setUserInfo({
    name: data.title,
    description: data.description,
  });
});
editModalForm.setEventListeners();
constants.profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const userData = userInformation.getUserInfo();
  constants.profileTitleInput.value = userData.name;
  constants.profileDescriptionInput.value = userData.description.trim();

  editModalForm.open();
});

const modalAddForm = new PopupWithForm("#add-card-modal", (data) => {
  cardSection.addItem(createCard(data));
});
modalAddForm.setEventListeners();
constants.addNewCardButton.addEventListener("click", () => {
  modalAddForm.open();
  addFormValidator.resetValidation();
});

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardEl = createCard(item);
      cardSection.addItem(cardEl);
    },
  },
  constants.cardListSelector
);

cardSection.renderItems(constants.initialCards);
