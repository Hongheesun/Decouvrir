import * as Api from "../../api.js";
import { location, getUrlParams } from "../../useful-functions.js";

let categoryName = document.querySelector(".sub-title");
let categoryItemList = document.querySelector(".work-wrapper");

async function renderProducts() {
    const { category } = getUrlParams();
    categoryName.innerHTML = category;

    let products = await Api.get("/api/products");
    let productsContent = "";
    
    products.forEach((data) => {
        if (data.category === category) {
            console.log(data.category);
            productsContent += `
                <li class="work">
                    <div class="product-image">
                        <a href="/products/detail?id=${data._id}"><img src="" id= "${data._id}" alt="상품사진"></a>
                    </div>
                    <span class="work-info">
                        <span class="painter">${data.painterEmail}</span>
                        <span> | </span>
                        <span class="product-name">${data.productName}</span>
                    </span>
                    <span class="price">${data.price}</span>
                </li>`; 
            categoryItemList.innerHTML = productsContent;
            // const imageBtn = document.querySelector(`#${data._id}`);
            // imageBtn.addEventListener("click", location(`/products/detail?id=${data._id}`));
        }
    });
    
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


