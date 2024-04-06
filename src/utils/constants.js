export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditCloseButton =
  profileEditModal.querySelector(".modal__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".cards__list");
export const cardListSelector = ".cards__list";
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const addCardModalCloseButton =
  addCardModal.querySelector(".modal__close");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const cardTitleInput = document.querySelector("#modal-input-type-title");
export const cardUrlInput = document.querySelector("#modal-input-type-url");
export const modalPreviewImage = document.querySelector("#modal-image-preview");
export const modalImagePreviewLink = modalPreviewImage.querySelector(
  ".modal__preview-image"
);
export const modalPreviewTitle = modalPreviewImage.querySelector(
  ".modal__title-preview"
);
export const previewCloseButton = document.querySelector(
  ".modal__close-preview-button"
);

export const cardSelector = "#card-template";
export const profileImageAvatar = document.querySelector("#modal-avatar");
export const profileAvatarForm =
  profileImageAvatar.querySelector(".modal__form");
export const deleteButton = document.querySelector(".card__list-trash");
export const deleteCard = document.querySelector("#modal-delete-card");
export const editButtonAvatar = document.querySelector(".profile__avatar-img");
/*validation*/

export const selectors = {
  popupForm: "modal__form",
  previewImage: "modal__preview-image",
};

export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_error_visible",
  inactiveButtonClass: "modal__button_disabled",
  submitButtonSelector: ".modal__button",
  avatar: ".profile__image",
};
