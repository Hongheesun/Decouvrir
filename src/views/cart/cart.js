const cartItemList = document.querySelector("#cart-item-list");
let cartList = JSON.parse(localStorage.getItem("cart"));

// 로컬스토리지에 있는 장바구니 리스트 화면에 출력
function addCartItemList(cartList) {
    let cartListContent = "";
    if(cartList !== null && cartList.length !== 0){
        cartList.forEach(item => {
            cartListContent += ` 
                <li class="cart-item">
                    <div class="cart-item-column">
                    <div class="img-container">
                        <img src="${item.image}" alt="작품사진">
                    </div>
                    </div>
                    
                    <div class="cart-item-column item-info-left"> 
                    <p class="work-name"><a>${item.name}</a></p>
                    <p>${item.artistName}</p>
                    </div>
                    <div class="cart-item-column item-info-right">
                    <p class="work-price">${item.price} 원</p>
                    <button class="item-delete-btn" type="button">삭제</button>
                    </div>
                </li>`;
            document.querySelector(".cart-total-price").innerHTML = `${totalPrice(cartList)}원`;
            document.querySelector(".all-item-order-btn").innerHTML = `총 ${totalCount(cartList)}건 주문 계속하기`;
        });    
    }
    else {
        cartItemList += "장바구니에 담긴 상품이 없습니다."
        document.querySelector(".cart-total").style.display = 'none';
        document.querySelectorAll(".buttons-container").style.display = 'none';
    }
    cartItemList.innerHTML = cartListContent;
}
addCartItemList(cartList);


// cart-total-price와 all-item-order-btn 합계 변경
function totalPrice(cartList) {
    return cartList.reduce((sum, cur) => sum + cur.price, 0); 
}

function totalCount(cartList) {
    return cartList.length;
}


// todo: 개별 cart list 삭제
const itemDeleteBtn = document.querySelector(".item-delete-btn");

function itemDelete() {
    // modal 또는 윈도우 창으로 삭제할건지 물어보기
    if(window.confirm("선택하신 상품을 장바구니에서 삭제하시겠습니까?")) {
        const newCartList = JSON.parse(localStorage.getItem("cart")).filter(elem => {
            
        }); // filter를 통해서 해당하는 상품 id와 같지 않은 걸로 구성하고 싶음. 
        localStorage.setItem("cart", JSON.stringify(newCartList));
        addCartItemList(newCartList);
    }
}

itemDeleteBtn.addEventListener("click", itemDelete);


// todo: 전체 상품 삭제
const allDeleteBtn = document.querySelector(".all-item-delete-btn");

function allDelete() {
    if(window.confirm("전체 상품을 장바구니에서 삭제하시겠습니까?")){
        localStorage.removeItem("cart");
        addCartItemList(); // 이게 맞는지 물어보자
    }
}

allDeleteBtn.addEventListener("click", allDelete);


// 주문하기 btn 
const buyAllBtn = document.querySelector(".all-item-order-btn");

function buyAllItem(){

    const buyList = JSON.parse(localStorage.getItem("cart")).map(elem => {
        return {
            productId: elem._id,
            price: elem.price,
        };
    });
    localStorage.setItem("buy", JSON.stringify(buyList));
}

buyBtn.addEventListener("click", buyAllItem);

