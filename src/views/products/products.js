async function getProducts() {
  let url = `/api/products`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const abstract = "6368f390b4a8016623514ea2";
const landscape = "6368f39db4a8016623514ea6";
const illustration = "6368f3abb4a8016623514eae";
const asian = "6368f3b0b4a8016623514eb2";

async function renderProducts(category, wrapperName) {
  let products = await getProducts();
  const arr = [];
  console.log(products);
  let html = "";
  products.forEach((data) => {
    if (data["categoryId"] == category) {
      arr.push(data);
    }
    console.log(arr);
  });
  for (let i = 0; i < 4; i++) {
    let htmlSegment = `   
    <li class="work">
      <div class="product-image"></div>
      <span class="work-info">
          <span>${arr[i].painterName} | ${arr[i].productName}
          </span>
      </span>
      <span class="price">${arr[i].price}</span>
    </li>`;

    html += htmlSegment;
  }

  let container = document.querySelector(wrapperName);
  container.innerHTML = html;
}

renderProducts(abstract, "#abstract-work-wrapper");
renderProducts(asian, "#asian-work-wrapper");
renderProducts(landscape, "#landscape-work-wrapper");
renderProducts(illustration, "#illustration-work-wrapper");
