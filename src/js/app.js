import Card from "./Card.js";
import catalogList from "./catalog.js";

const page = document.querySelector(".page");
const buttonMenu = page.querySelector(".navigate__button-menu");
const listNavigate = page.querySelector(".navigate__list");
const navigate = page.querySelector(".navigate");
const buttonMenuViev = page.querySelector(".navigate__button-menu-underline");
const buttonCall = page.querySelector(".call__button");
const callFormWrapper = page.querySelector(".call__wrapper");
const areaClosing = page.querySelector(".call__cover");
const callClosed = page.querySelector(".call__closed");
const sentMessage = page.querySelector(".sent");
const buttonDiscount = page.querySelector("#buttonDiscount");
const popupDiscount = page.querySelector("#popupDiscount");
const buttonDiscountClosed = popupDiscount.querySelector(
  ".popup__button-close"
);
const coverDiscountPopup = popupDiscount.querySelector(".popup__cover");

const orderButtons = page.querySelectorAll(".product__button");
const popupOrder = page.querySelector("#popupOrder");
const buttonOrderClosed = popupOrder.querySelector(".popup__button-close");
const coverOrderPopup = popupOrder.querySelector(".popup__cover");
const littleImages = Array.from(page.querySelectorAll(".product__img"));

const formPrimary = page.querySelector("#primary");
const formCall = page.querySelector("#call");
const formDiscount = page.querySelector("#discount");
const formOrder = page.querySelector("#order");

const inputs = page.querySelectorAll("input");
const phonePatt = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
const emailPatt =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const productContainer = page.querySelector(".products__list");
catalogList.forEach((product) => {
  const card = new Card(product, "#product-template");
  const newCard = card.generateCard();
  productContainer.append(newCard);
});

const showSentMessage = () => {
  sentMessage.classList.add("sent__active");
  setTimeout(() => {
    sentMessage.classList.remove("sent__active");
  }, 2500);
};
const toggleButtonSubmite = (form) => {
  const name = form[form.id + "_name"];
  const phone = form[form.id + "_phone"];
  const submite = form[form.id + "_submite"];
  const email = form[form.id + "_email"];
  if (email) {
    if (
      (name.value.length > 2) &
      phonePatt.test(phone.value) &
      emailPatt.test(email.value)
    ) {
      return submite.removeAttribute("disabled");
    } else {
      return submite.setAttribute("disabled", true);
    }
  }
  if ((name.value.length > 2) & phonePatt.test(phone.value)) {
    return submite.removeAttribute("disabled");
  } else {
    return submite.setAttribute("disabled", true);
  }
};
const validateForm = ({ name, phone, email }) => {
  if (name) {
    const errorName = name.closest("label").querySelector(".error");
    if (!name.value || name.value.length < 2) {
      errorName.textContent = "имя не может содержать меньше 2 символов";
    } else {
      errorName.textContent = "";
    }
  }

  if (phone) {
    const errorPhone = phone.closest(".label").querySelector(".error");
    if (!phone.value || !phonePatt.test(phone.value)) {
      errorPhone.textContent = "введите корректный номер телефона";
    } else {
      errorPhone.textContent = "";
    }
  }

  if (email) {
    const errorEmail = email.closest(".label")?.querySelector(".error");
    if (!emailPatt.test(email.value.toLowerCase())) {
      errorEmail.textContent = "введите корректный Email";
    } else {
      errorEmail.textContent = "";
    }
  }
};

const formReset = (form) => {
  form.reset();
  const feature = form.closest(".feature");
  const buttonClose = feature?.querySelector(".button-close");
  if (buttonClose) {
    buttonClose.click();
  }
  const errors = form.querySelectorAll(".error");
  errors.forEach((error) => (error.textContent = ""));
  toggleButtonSubmite(form);
};
const submite = (evt) => {
  evt.preventDefault();
  const form = evt.target.closest("form");
  const inputs = form?.querySelectorAll(".input");
  const data = {};
  inputs.forEach((input) => {
    data[input.name] = input.value;
  });
  try {
    fetch(
      `https://api.telegram.org/bot7001021053:AAFAAe6a_bspk0Mf1YlfVXbSsnWDXoEUiL8/sendMessage?chat_id=${5436051423}&parse_mode=html&text=НОВЫЙ ЗАКАЗ СКАМЕЙКИ -${JSON.stringify(
        data
      )}`
    ).then((res) => console.log(res));
    formReset(form);
    showSentMessage();
  } catch (err) {
    console.log(err);
  }
};

const submiteList = page.querySelectorAll(".submite");

submiteList.forEach((buttonSubmite) =>
  buttonSubmite.addEventListener("click", submite)
);
inputs.forEach((input) => {
  input.addEventListener("input", (evt) => {
    const form = evt.target.closest(".form");
    validateForm({
      [input.name.split("_")[1]]: input,
    });
    toggleButtonSubmite(form);
  });
});
toggleButtonSubmite(formPrimary);
toggleButtonSubmite(formCall);

littleImages?.forEach((image) => {
  image.addEventListener("click", () => {
    const imgWrapper = image.closest(".product__img-wrapper");
    const targetImages = imgWrapper.querySelectorAll(".product__img");
    targetImages.forEach((img) => img.classList.remove("product__img_active"));
    const bigImage = imgWrapper.querySelector(".product__img-big");
    image.classList.add("product__img_active");
    bigImage.src = image.src;
  });
});

const openPopupOrder = () => {
  popupOrder.classList.add("popup_active");
  buttonOrderClosed.addEventListener("click", closedPopupOrder);
  coverOrderPopup.addEventListener("click", closedPopupOrder);
  const formOrder = page.querySelector("#order");
  toggleButtonSubmite(formOrder);
  if (Array.from(navigate.classList).find((el) => el === "active")) {
    toggleMenuNavigation();
  }
};

const closedPopupDiscount = () => {
  popupDiscount.classList.remove("popup_active");
  buttonDiscountClosed.removeEventListener("click", closedPopupDiscount);
  coverDiscountPopup.removeEventListener("click", closedPopupDiscount);
  formReset(formDiscount);
};

const closedPopupOrder = () => {
  formDiscount.reset();
  popupOrder.classList.remove("popup_active");
  coverOrderPopup.removeEventListener("click", closedPopupDiscount);
  buttonOrderClosed.removeEventListener("click", closedPopupDiscount);
  formReset(formOrder);
};
const openPopupDiscount = () => {
  popupDiscount.classList.add("popup_active");
  buttonDiscountClosed.addEventListener("click", closedPopupDiscount);
  coverDiscountPopup.addEventListener("click", closedPopupDiscount);
  const formDiscount = page.querySelector("#discount");
  toggleButtonSubmite(formDiscount);
  if (Array.from(navigate.classList).find((el) => el === "active")) {
    toggleMenuNavigation();
  }
};

const toggleMenuNavigation = () => {
  navigate.classList.toggle("active");
  console.log(navigate.classList);
  listNavigate.classList.toggle("navigate__list_active");
  buttonMenuViev.classList.toggle("close__button-menu");
};

const colsedCall = () => {
  callFormWrapper.classList.remove("call__wrapper_visible");
  buttonCall.classList.remove("call__button_hidden");
  areaClosing.classList.remove("call__cover_visible");
  buttonCall.removeAttribute("disabled");
  areaClosing.removeEventListener("click", colsedCall);
  callClosed.removeEventListener("click", colsedCall);
  formReset(formCall);
};

const openCall = () => {
  buttonCall.setAttribute("disabled", true);
  callFormWrapper.classList.add("call__wrapper_visible");
  buttonCall.classList.add("call__button_hidden");
  areaClosing.classList.add("call__cover_visible");
  areaClosing.addEventListener("click", colsedCall);
  callClosed.addEventListener("click", colsedCall);
  if (Array.from(navigate.classList).find((el) => el === "active")) {
    toggleMenuNavigation();
  }
};

buttonCall.addEventListener("click", openCall);

buttonMenu.addEventListener("click", toggleMenuNavigation);

buttonDiscount.addEventListener("click", openPopupDiscount);

orderButtons.forEach((button) => {
  button.addEventListener("click", openPopupOrder);
});
