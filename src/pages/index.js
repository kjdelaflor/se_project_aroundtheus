import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import { data } from "autoprefixer";
import PopupConfirm from "../components/PopupConfirm.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "22231872-387e-4912-9c3e-b82f6b406717",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((res) => {
    cardSection.renderItems(res);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((res) => {
    userInformation.setUserInfo({
      name: res.name,
      description: res.about,
    });
    userInformation.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

const deleteCardModal = new PopupConfirm(
  "#modal-delete-card",
  handleDeleteClick
);
deleteCardModal.setEventListeners();

function handleDeleteClick(card) {
  deleteCardModal.open();
  deleteCardModal.setConfirmCall(() => {
    deleteCardModal.renderLoading(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.handleDeleteCard();
        deleteCardModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteCardModal.renderLoading(false);
      });
  });
}

const cardPreview = new PopupWithImage("#modal-image-preview");
cardPreview.setEventListeners();

const userInformation = new UserInfo({
  name: "#profile-title",
  description: "#profile-description",
  avatar: ".profile__image",
});

const editModalAvatar = new PopupWithForm("#modal-avatar", (data) => {
  editModalAvatar.renderLoading(true);
  api
    .updateProfilePicture(data)
    .then((res) => {
      userInformation.setUserAvatar(res.avatar);
      editModalAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModalAvatar.renderLoading(false);
    });
});

editModalAvatar.setEventListeners();
constants.editButtonAvatar.addEventListener("click", () => {
  avatarValidator.enableValidation();
  editModalAvatar.open();
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

const avatarValidator = new FormValidator(
  constants.validationSettings,
  constants.profileAvatarForm
);
avatarValidator.enableValidation();

/*card.js*/

function handleImageClick(name, link) {
  cardPreview.open({ name, link });
}

function createCard(cardData) {
  const cardEl = new Card(
    {
      name: cardData.name,
      link: cardData.link,
    },
    constants.cardSelector,
    handleImageClick,
    handleDeleteClick,
    removeLike,
    likeCard
  );
  return cardEl.getView();
}

const editModalForm = new PopupWithForm("#profile-edit-modal", (data) => {
  editModalForm.renderLoading(true);
  api
    .updateProfileInfo(data)
    .then((res) => {
      userInformation.setUserInfo({
        name: res.name,
        description: res.about,
      });
      editModalForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModalForm.renderLoading(false);
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
  modalAddForm.renderLoading(true);
  api
    .addNewCard(data)
    .then((res) => {
      cardSection.addItem(createCard(res));
      modalAddForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      modalAddForm.renderLoading(false);
    });
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

function likeCard(card) {
  api
    .likeCard(card.getId())
    .then(() => {
      card.setIsLiked(true);
    })
    .catch((err) => {
      console.error(err);
    });
}

function removeLike(card) {
  api
    .removeLikeCard(card.getId())
    .then(() => {
      card.setIsLiked(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

//cardSection.renderItems(constants.initialCards);
