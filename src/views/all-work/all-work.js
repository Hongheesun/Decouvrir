// function getProduct() {
// const config = {
//   method: "get",
// };
// fetch(`/api/products`, config)
//   .then((response) => response.json())
//   .then((data) => {
//     // const category = document.querySelector(".sub-title");
//     // const imageTag = document.querySelector(".product-image");
//     // const productName = document.querySelector(".product-name");
//     // //   const painter = document.querySelector(".painter");
//     // const price = document.querySelector(".price");

//     // imageTag.insertAdjacentHTML(`<img src="${data[0].productImage}"/>`);
//     // category.textContent = data[0].category;
//     // productName.textContent = data[0].productName;
//     // //   painter.textContent = data[0].painter;
//     // price.textContent = data[0].price;

//     // console.log(data.length);

//     const category = document.querySelector(`.sub-title:nth - child(${i})`);
//     const imageTag = document.querySelector(`.product-image:nth - child(${i})`);
//     const productName = document.querySelector(
//       `.product-name:nth - child(${i})`
//     );
//     const price = document.querySelector(`.price:nth - child(${i})`);

//     // for (let i = 0; i < data.length; i++) {
//     //   category.innerText = data[i].category;
//     //   productName.innerText = data[i].productName;
//     //   price.innerText = data[i].price;
//     // }
//   })
//   .catch((error) => console.log("fetch 에러!"));
// //}

// async function getProducts() {
//   let url = `/api/products`;
//   try {
//     let res = await fetch(url);
//     return await res.json();
//   } catch (error) {
//     console.log(error);
//   }
// }
async function getProducts() {
  let url = `/api/products`;
  try {
    let res = await fetch(url);
    return await res.json();
    // for (let i = 0; i < res.json.length; i++) {
    //   if (res.json[i]["category"] === "abstract") {
    //     return await res.json();
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
}

async function renderProducts() {
  let products = await getProducts();
  console.log(products);
  let html = "";
  products.forEach((data) => {
    let htmlSegment = `   <li class="work">
    <div class="product-image">
    </div>
    <span class="work-info">
        <span class="painter">
        </span>
        <span> | </span>
        <span class="product-name">${data.productName}
        </span>
    </span>
    <span class="price">${data.price}
    </span>
</li>`;

    html += htmlSegment;
  });

  let container = document.querySelector(".work-wrapper");
  container.innerHTML = html;
}

renderProducts();
