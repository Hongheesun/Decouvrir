import * as Api from "/api.js";

const postBtn = document.querySelector("#postButton");
const productNameInput = document.querySelector("#name");
const contentInput = document.querySelector("#content");
const priceInput = document.querySelector("#price");
const categoryInput = document.querySelector("#category");

const photoFile = document.querySelector("#image");
let image = "";
//console.log(formData);

let painterEmail = "";
let painterName = "";
let categoryId = "";

let userData;

async function insertUserData() {
  userData = await Api.get("/api/user");
  painterEmail = userData.email;
  painterName = userData.painterName;
}

insertUserData();

///////
async function addProduct(e) {
  e.preventDefault();
  const productName = productNameInput.value;
  const content = contentInput.value;
  const price = priceInput.value;
  const category = categoryInput.value;

  const formData = new FormData();
  formData.append("image", photoFile.files[0]); // 파일 첨부

  fetch(`/api/images/upload`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.imagePath);
      image = data.imagePath;
      console.log(data.imagePath);
      const data2 = {
        painterEmail,
        painterName,
        productName,
        price,
        content,
        category,
        categoryId,
        image,
      };

      //try {
      // console.log(data);
      console.log(data2);
      Api.post(`/api/product`, data2);
      // }  catch (err) {
    });

  if (category === "abstract") {
    categoryId = "636ce421852cc32cf0f46591";
  } else if (category === "landscape") {
    categoryId = "636ce42f852cc32cf0f46595";
  } else if (category === "illustration") {
    categoryId = "636ce44d852cc32cf0f4659d";
  } else if (category === "asian") {
    categoryId = "636ce439852cc32cf0f46599";
  }

  //   console.error(err.stack);
  //   alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  // }
}

postBtn.addEventListener("click", addProduct);
