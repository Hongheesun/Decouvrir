import * as Api from "../api"
const ordererEmail = document.getElementById("orderer-email");
const ordererName = document.getElementById("orderer-name");
const ordererTel = document.getElementById("orderer-tel");

// 주문자 정보 입력
async function inputOrdererInfo(){
    const userData = await Api.get("/api/user");
    const { email, fullName, phoneNumber} = userData;
    
    ordererEmail.value = email;
    ordererName.value = fullName;

    if(phoneNumber){
        ordererTel.value = phoneNumber;
    }
}

inputOrdererInfo();

const deliveryName = document.querySelector("#delivery-name");
const deliveryTel = document.querySelector("#delivery-tel");
const deliveryAddress = document.querySelector("#delivery-address");
const deliveryMsg = document.querySelector("#delivery-msg");
const sameAsUserBtn = document.querySelectorAll(".same-shipping-btn");
// sameAsUserBtn[0]은 

// 배송 정보 입력
async function inputDeliveryInfo() {

}

// 결제진행
const orderBtn = document.querySelector(".order-btn");

async function order() {
    if(!ordererTel.value){
        return alert("주문자 전화번호를 입력해주세요.");
    }

    if(!deliveryName.value || !deliveryTel.value || !deliveryAddress.value || !deliveryMsg){
        return alert("배송지 정보를 입력해주세요.");
    }

    try {
        const orderData = await Api.post("/api/order", {

        });

        const userUpdateData = {
            phoneNumber: "전화번호",
        };

        await Api.post("../api/", userUpdateData);

        alert("주문이 정상적으로 완료되었습니다.");
        window.location.href = "/order/complete";
    } catch(err) {
        alert(`문제가 발생하였습니다.\n${err}`);
    }
}

orderBtn.addEventListener("click", order);