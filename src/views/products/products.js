import * as Api from "../api.js";

// 카테고리에 해당하는 상품 추가 
async function renderProducts(categoryName, categoryWorkWrapper) {
  let products = await Api.get("/api/products");
  let productsContent = "";
  let arr = [];
  products.forEach((data) => {
    if (data.category == categoryName) {
      arr.push(data);
    }
  });
  console.log(arr);
  for (let i = 0; i < 4; i++) {
      productsContent += `
      <li class="work">
          <div class="product-image">
            <a href="/products/detail?id=${arr[i]._id}"><img src="" alt="상품사진">
          </div>
          <span class="work-info">
              <span>${arr[i].painterName} | ${arr[i].productName}</span>
          </span>
          <span class="price">${arr[i].price}</span>
      </li>`; 
  } 
  let container = document.querySelector(categoryWorkWrapper);
  container.innerHTML = productsContent;
}

renderProducts("abstract", "#abstract-work-wrapper");
renderProducts("asian", "#asian-work-wrapper");
renderProducts("landscape", "#landscape-work-wrapper");
renderProducts("illustration", "#illustration-work-wrapper");
