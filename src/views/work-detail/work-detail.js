
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

function addCart(){
    let cartList = JSON.parse(localStorage.getItem("cart"));
    if(cartList === null){
        cartList = [];
    }
    const price = Number(document.querySelector("#work-price").textContent.replace("원", ""));
    const [artistName, productName] = document.querySelector("#work-name").textContent.split(" | ");

    // 작품이름, 가격, 이미지 + 작가이름 + 프로덕트 아이디
    const wantToCart = {
        name: productName,
        price: price,
        image: document.querySelector("#work-img").src,
        artistName: artistName,
        productId: document.querySelector("#product-id").name,
    }
    // 기존 장바구니 리스트에 현재 작품이 있다면 error?

    // 기존 장바구니 리스트에 현재 작품까지 넣음.
    cartList.push(wantToCart);

    // 로컬스토리지에 추가
    localStorage.setItem("cart", JSON.stringify(cartList));
}

addCartBtn.addEventListener("click", addCart);


// 구매하기 
const buyBtn = document.querySelector(".BuyNow");

function buyNow(){
    const price = Number(document.querySelector("#work-price").textContent.replace("원", ""));

    const buyList = {
        productId: document.querySelector("#product-id").name,
        price: price,
    }
    localStorage.setItem("buy", JSON.stringify(buyList));
}

buyBtn.addEventListener("click", buyNow);

