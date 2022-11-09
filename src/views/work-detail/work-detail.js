
// 작품 data 가져오기
async function getProductDetail() {
    const productData = {
        _id: "id",
        painterEmail: "sda",
        productName: "sdafds",
        price: "1000",
        content: "작품 설명",
        category: "풍경화",
        image: "fsd",
    }; // 우선 임의로 저장. await로 product api받아오기...
    
    document.querySelector("#product-id").name = productData._id;
    document.querySelector("#work-img").src= productData.image;
    document.querySelector("#work-type").innerHTML= productData.category;
    // 작가이름은 productData.painterEmail로 작가 스키마에서 찾아서 넣어야함
    document.querySelector("#work-name").innerHTML= `${productData.painterEmail} | ${productData.productName}`;
    document.querySelector("#work-price").innerHTML= productData.price + ' 원';
    document.querySelector("#work-explain").innerHTML= productData.content;
}

// 장바구니 추가하기
const addCartBtn = document.querySelector(".addCart");
const price = Number(document.querySelector("#work-price").textContent.replace("원", ""));
const [artistName, productName] = document.querySelector("#work-name").textContent.split(" | ");

function addCart(){
    let cartList = JSON.parse(localStorage.getItem("cart"));
    if(cartList === null){
        cartList = [];
    }

    const wantToCart = {
        productName: productName,
        painterName: artistName,
        price: price,
        image: document.querySelector("#work-img").src,
        productId: document.querySelector("#product-id").name,
    }

    // 예외처리) 기존 장바구니 리스트에 현재 작품이 있는 경우
    let check = true;
    for(let elem of cartList){
      if(elem["productId"] === document.querySelector("#product-id").name){
        check = false;
        alert("동일한 상품이 이미 장바구니에 담겨있습니다.");
        break; // return;해도 되나...?
      }
    }
    
    if(check) {
      cartList.push(wantToCart);
    }

    localStorage.setItem("cart", JSON.stringify(cartList));
}

addCartBtn.addEventListener("click", addCart);



// 구매하기 +
const buyBtn = document.querySelector(".BuyNow");

function buyNow(){
    const buyList = [{
        productName: productName,
        painterName: artistName,
        price: price,
        image: document.querySelector("#work-img").src,
        productId: document.querySelector("#product-id").name,
    }];
    localStorage.setItem("buy-direct", JSON.stringify(buyList));

    // 로그인을 하지 않은 경우 
    const token = sessionStorage.getItem("token");
    if (!token) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.replace("/login?order");
    }
    window.location.replace("/order");
}

buyBtn.addEventListener("click", buyNow);

