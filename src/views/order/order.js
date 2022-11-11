import * as Api from "/api.js";
const ordererEmail = document.getElementById("emailInput");
const ordererName = document.getElementById("fullNameInput");
const ordererTel = document.getElementById("phoneNumberInput");

// 주문자 정보 입력

let userData;
async function inputOrdererInfo() {
  userData = await Api.get("/api/user");
  console.log(userData);
  ordererEmail.value = userData.email || null;
  ordererName.value = userData.fullName || null;
  ordererTel.value = userData.phoneNumber || null;
}

inputOrdererInfo();

const deliveryName = document.querySelector("#recipientNameInput");
const deliveryTel = document.querySelector("#recipientPhoneNumberInput");
const deliveryAddress = document.querySelector("#recipientAddressInput");
const deliveryMsg = document.querySelector("#delieveryMessageInput");
const payButton = document.querySelector("#payButton");
const sameButton = document.querySelector(".same-shipping-btn");
// const sameAsUserBtn = document.querySelectorAll(".same-shipping-btn");
// sameAsUserBtn[0]은

// 배송 정보 입력
// async function inputDeliveryInfo() {}

// 결제진행
// const orderBtn = document.querySelector(".order-btn");

async function order() {
  if (!ordererTel.value) {
    return alert("주문자 전화번호를 입력해주세요.");
  }

  if (!deliveryName.value || !deliveryTel.value || !deliveryAddress.value) {
    return alert("배송지 정보를 입력해주세요.");
  }

  const data = {
    products: JSON.parse(localStorage.getItem("cart")),
    recipientName: deliveryName.value,
    recipientPhoneNumber: deliveryTel.value,
    recipientAddress: deliveryAddress.value,
  };
  await Api.post("/api/order", data);
  alert("주문이 정상적으로 완료되었습니다.");
  window.location.href = "/order-finished";
}

// 배송 정보 입력
function inputUserDeliverInfo() {
  console.log(userData);
  deliveryName.value = userData.fullName;

  if (userData.phoneNumber) {
    deliveryTel.value = userData.phoneNumber;
  }

  if (userData.address) {
    deliveryAddress.value = userData.address;
  }
}

sameButton.addEventListener("click", inputUserDeliverInfo);
payButton.addEventListener("click", order);
