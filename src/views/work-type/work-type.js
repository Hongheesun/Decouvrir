import * as Api from "/api.js";

async function renderProducts() {
    let products = await Api.get("/api/products");;
    console.log(products);
    let html = "";
    
    products.forEach((data) => {
        if (data["category"] === "abstract") {
            let htmlSegment = `   <li class="work">
        <button class="delete-button" onClick="deleteProduct(${data["seq"]})" >삭제하기</button>
        
        <button class="open-toggle-button" onClick="showToggle()">수정하기</button> 
        <button class="open-toggle-button" onClick="addCart(${data["seq"]})">장바구니</button> 
        <button class="open-toggle-button" onClick="buyNow(${data["seq"]})">구매하기</button> 
        <form class="toggle-page">
          <button class="closeBtn" onClick="closeToggle()">X</button>
          <input class="is-medium search-input name" type="text" placeholder="상품명을 입력하세요.">
          <input class="is-medium search-input image" type="file">
          <input class="is-medium search-input category" type="text" placeholder="상품 카테고리.">
  
          <input class="is-medium search-input content" type="text" placeholder="상품 소개.">
          <input class="is-medium search-input price" type="text" placeholder="상품 희망 가격.">
  
          <button class="is-medium search-button post-button" type="submit" onclick='updateProduct(${data["seq"]})'>
              <span class="material-icons">
                  상품 수정
              </span>
          </button>
      </form>
  
        <div class="product-image">
            </div>
            <span class="work-info">
                <span class="painter">
                </span>
                <span> | </span>
                <span class="product-name" id="${data._id}">${data.productName}</span>
            </span>
            <span class="price">${data.price}
            </span>
        </li>`;

            html += htmlSegment;
            const imageBtn = document.querySelector(`#${data._id}`);
            imageBtn.addEventListener("click", window.location.href = `/products/?name=${productName}`);
        }
    });

    let container = document.querySelector(".work-wrapper");
    container.innerHTML = html;

    
}

renderProducts();



function deleteProduct(seq) {
    fetch(`/api/${seq}`, {
        method: "DELETE",
    })
        // .then((res) => res.json())
        .then((data) => {
            console.log("delete 성공!");
            //   return data;
        })
        .catch((err) => console.log(err));

    window.location.href = "/abstract";
}

/////////////////  updateProduct  /////////////////

function newPage(seq) {
    location.href = "/update.html";
}

function showToggle() {
    const togglePage = document.querySelector(".toggle-page");
    // const closeBtn = document.querySelector(".closeBtn");
    togglePage.style.display = "block";
}

function closeToggle() {
    const togglePage = document.querySelector(".toggle-page");
    togglePage.style.display = "none";
}

// openToggleButton.addEventListener("click", showToggle);

// // closeBtn.addEventListener("click", closeAddPage);

// const openToggleButton = document.querySelector(".open-toggle-button");
// const togglePage = document.querySelector(".toggle-page");
// const closeBtn = document.querySelector(".closeBtn");

// function showToggle() {
//   console.log("click 함수");
//   // if (togglePage.style.display == "none") {
//   togglePage.style.display = "block";
//   // } else {
//   //   togglePage.style.display = "none";
//   // }
// }

// function closeToggle() {
//   togglePage.style.display = "none";
// }

function updateProduct(seq) {
    let productName = document.querySelector(".name").value;
    let content = document.querySelector(".content").value;
    let price = document.querySelector(".price").value;
    let image = document.querySelector(".image").value;
    let category = document.querySelector(".category").value;

    let productData = {
        method: "PATCH",
        body: JSON.stringify({
            productName,
            price,
            content,
            category,
            image,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(`/api/${seq}`, productData)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log("patch 성공!");
        })
        .catch((err) => console.log(err));

    // closeAddPage();
}


