import * as Api from "../api.js";

const abstract = "6368f390b4a8016623514ea2";
const landscape = "6368f39db4a8016623514ea6";
const illustration = "6368f3abb4a8016623514eae";
const asian = "6368f3b0b4a8016623514eb2";

// 카테고리에 해당하는 상품 추가 
async function renderProducts(categoryId, categoryWorkWrapper) {
  let products = await Api.get("/api/products");
  let productsContent = "";
  let arr = [];
  products.forEach((data) => {
    if (data["categoryId"] == categoryId) {
      arr.push(data);
    }
  });
  for (let i = 0; i < 4; i++) {
      productsContent += `
      <li class="work">
          <div class="product-image">
            <img src="" alt="상품사진">
          </div>
          <span class="work-info">
              <span>${arr[i].painterEmail} | ${arr[i].productName}</span>
          </span>
          <span class="price">${arr[i].price}</span>
      </li>`; 
  } 
  let container = document.querySelector(categoryWorkWrapper);
  container.innerHTML = productsContent;
}

renderProducts(abstract, "#abstract-work-wrapper");
renderProducts(asian, "#asian-work-wrapper");
renderProducts(landscape, "#landscape-work-wrapper");
renderProducts(illustration, "#illustration-work-wrapper");

// 카테고리별로 section 추가
// let categoryList = document.querySelector(".all-work-type");
// async function addCategoryList() {
//     const categories = await Api.get("/api/category");
//     let categoryContent = "";
//     for (let category of categories) {
//         categoryContent += `
//             <section class="work-type">
//                 <span class="sub-title" id="${category.categoryName}">${category.categoryName}</span>
//                 <ul class="work-wrapper" id="category-${category.categoryName}">
//                 </ul>
//             </section>`;
//         categoryList.innerHTML = categoryContent;
//         let categoryBtn = document.querySelector(`#${category.categoryName}`);   
//         categoryBtn.addEventListener("click", location(`products/list?category=${category.categoryName}`));

//         let categoryWorkWrapper = document.querySelector(`#category-${category.categoryName}`);
//         renderProducts(categoryWorkWrapper, category.categoryName);
//         console.log(categoryWorkWrapper);
//     };
    
// }
// addCategoryList();