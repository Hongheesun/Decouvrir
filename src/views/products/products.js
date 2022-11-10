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