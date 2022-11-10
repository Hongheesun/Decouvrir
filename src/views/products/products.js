import * as Api from "../api.js";
import { location } from "../useful-functions.js";


// 카테고리에 해당하는 상품 추가 
async function renderProducts(categoryWorkWrapper, categoryName) {
  const products = await Api.get("/api/products");
  let productsContent = "";
  products.forEach((data) => {
    if(data.category === categoryName){
      productsContent += `
      <li class="work">
          <div class="product-image">
            <img src="" alt="상품사진">
          </div>
          <span class="work-info">
              <span class="painter">${data.painterEmail}</span>
              <span> | </span>
              <span class="product-name">${data.productName}</span>
          </span>
          <span class="price">${data.price}</span>
      </li>`; 
    }
    categoryWorkWrapper.innerHTML = productsContent;
  }); 
}


// 카테고리별로 section 추가
let categoryList = document.querySelector(".all-work-type");
async function addCategoryList() {
    const categories = await Api.get("/api/category");
    let categoryContent = "";
    for (let category of categories) {
        categoryContent += `
            <section class="work-type">
                <span class="sub-title" id="${category.categoryName}">${category.categoryName}</span>
                <ul class="work-wrapper" id="category-${category.categoryName}">
                </ul>
            </section>`;
        categoryList.innerHTML = categoryContent;
        let categoryBtn = document.querySelector(`#${category.categoryName}`);   
        categoryBtn.addEventListener("click", location(`products/list?category=${category.categoryName}`));

        let categoryWorkWrapper = document.querySelector(`#category-${category.categoryName}`);
        renderProducts(categoryWorkWrapper, category.categoryName);
        console.log(categoryWorkWrapper);
    };
    
}
addCategoryList();




