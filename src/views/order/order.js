import * as Api from "/api.js";

let orderItemList = document.querySelector("#order-list");
const buyList = JSON.parse(localStorage.getItem("buy-direct")) || JSON.parse(localStorage.getItem("buy-cart"));

// order list 총 가격 구하기
function totalPrice(buyList) {
    return buyList.reduce((sum, cur) => sum + cur.price, 0); 
}

// 로컬스토리지에 있는 order 리스트 화면에 출력
async function addOrderItemList(buyList) {
    let orderListContent = "";
    if(buyList !== null && buyList !== 0){
        buyList.forEach(item => {
            orderListContent += ` 
                <li class="order-item">
                    <div class="order-item-column">
                    <div class="img-container">
                        <img src="${item.image}" alt="작품사진">
                    </div>
                    </div>
                    
                    <div class="order-item-column item-info-left"> 
                    <p class="work-name"><a>${item.productName}</a></p>
                    <p>${item.paintertName}</p>
                    </div>
                    <div class="order-item-column item-info-right">
                    <p class="work-price">${item.price} 원</p>
                    </div>
                </li>`;
            document.querySelector(".total-price").innerHTML = `${totalPrice(orderList)}원`;
        });    
    }
    console.log('orderListContent: ', orderListContent);
    orderItemList.innerHTML = orderListContent;
}
addOrderItemList(orderList);

const ordererEmail = document.getElementById("orderer-email");
const ordererName = document.getElementById("orderer-name");
const ordererTel = document.getElementById("orderer-tel");

// 주문자 정보 입력
let userData;
async function inputOrdererInfo(){
    userData = await Api.get("/api/user");
    
    ordererEmail.value = userData.email;
    ordererName.value = userData.fullName;

    if(userData.phoneNumber){
        ordererTel.value = userData.phoneNumber;
    }
}

inputOrdererInfo();


const deliveryName = document.querySelector("#delivery-name");
const deliveryTel = document.querySelector("#delivery-tel");
const postalCode = document.querySelector("#postal-code");
const searchAddressButton = document.querySelector("#search-address-btn");
const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");
const sameAsUserBtn = document.querySelector(".same-shipping-btn");


// 다음 주소 가져오기
window.onload = function () {
    searchAddressButton.addEventListener("click", () => {
      new daum.Postcode({
        oncomplete: function (data) {
          postalCode.value = data.zonecode;
          address1.value = data.address;
          address2.placeholder = "상세 주소를 입력해 주세요.";
          address2.focus();
        },
      }).open();
    });
};


// 배송 정보 입력
function inputUserDeliverInfo() {
    console.log(userData);
    deliveryName.value = userData.fullName;

    if(userData.phoneNumber){
        deliveryTel.value = userData.phoneNumber;
    }
    
    if(userData.address){
        postalCode.value = userData.address.postalCode;
        address1.value = userData.address.address1;
        address2.value = userData.address.address2;
    }
}
sameAsUserBtn.addEventListener("click", inputUserDeliverInfo);


// 결제진행
const orderBtn = document.querySelector(".order-btn");

async function order() {
    if(!ordererTel.value){
        return alert("주문자 전화번호를 입력해주세요.");
    }

    if(!deliveryName.value || !deliveryTel.value || !postalCode.value || !address2.value){
        return alert("배송지 정보를 입력해주세요.");
    }

    // 주문 정보 및 유저 post 요청
    try {
        const products = [];
        buyList.forEach((elem) => {
            products.push({
                productId: elem.productId,
            });
        });

        const orderData =  {
            email: userData.email,
            products: products,
            totalPrice: totalPrice(orderList),
            recipientName: deliveryName.value,
            recipientPhoneNumber: deliveryTel.value,
            recipientAddress:{
                postalCode: postalCode.value, 
                adress1: address1.value,
                address2: address2.value,
            },
        };
        await Api.post("/api/order", orderData);

        const userUpdateData = {
            phoneNumber: "전화번호",
        };

        await Api.patch("/api/users", userData._id, userUpdateData);
        alert("주문이 정상적으로 완료되었습니다.");

        if(buyList == JSON.parse(localStorage.getItem("buy-direct"))) {
            localStorage.removeItem("buy-direct");
        } else {
            localStorage.removeItem("buy-cart");
            localStorage.removeItem("cart");
        }

        window.location.href = "/order/complete";

    } catch(err) {
        console.error(err);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }

}

orderBtn.addEventListener("click", order);