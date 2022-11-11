import * as Api from "/api.js";
const ordererEmail = document.getElementById("emailInput");
const ordererName = document.getElementById("fullNameInput");
const ordererTel = document.getElementById("phoneNumberInput");

// 주문자 정보 입력
async function inputOrdererInfo() {
  const userData = await Api.get("/api/user");
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

  // try {
  const data = {
    products: JSON.parse(localStorage.getItem("cart")),
    recipientName: deliveryName.value,
    recipientPhoneNumber: deliveryTel.value,
    recipientAddress: deliveryAddress.value,
  };
  await Api.post("/api/order", data);
  alert("주문이 정상적으로 완료되었습니다.");
  window.location.href = "/order-finished";
  //   } catch (err) {}

  // const userUpdateData = {
  //   phoneNumber: "전화번호",
  // };

  // await Api.post("/api/order", userUpdateData);

  // alert("주문이 정상적으로 완료되었습니다.");
  // window.location.href = "/order/complete";
  //   } catch (err) {
  //     alert(`문제가 발생하였습니다.\n${err}`);
  //   }
}

payButton.addEventListener("click", order);
