// export default axiosPost;
import * as Api from "../api";

const postBtn = document.querySelector(".post-button");
import { checkLogin } from "/useful-functions.js";
checkLogin();

let painterEmail = "";
let painterName = "";
let categoryId = "";

const productName = document.querySelector(".name").value;
const content = document.querySelector(".content").value;
const price = document.querySelector(".price").value;
const image = document.querySelector(".image").value;
const category = document.querySelector(".category").value;

let userData;
async function insertUserData() {
  userData = await Api.get("/api/user");
  console.log(userData);
  const userDate = userData;

  painterEmail = userDate.email;
  painterName = userDate.painterName;
}
insertUserData();
postBtn.addEventListener("click", addProduct);

function addProduct(e) {
  e.preventDefault(); // 기본 폼 동작 막기
  console.log("click");

  // getUserData();

  if (category === "abstract") {
    categoryId = "6368f390b4a8016623514ea2";
  } else if (category === "landscape") {
    categoryId = "6368f39db4a8016623514ea6";
  } else if (category === "illustration") {
    categoryId = "6368f3abb4a8016623514eae";
  } else if (category === "asian") {
    categoryId = "6368f3b0b4a8016623514eb2";
  }
  //const categoryId = document.querySelector(".categoryId").value;

  // let productData = {
  //   method: "POST",
  //   body: JSON.stringify({
  //     painterEmail,
  //     painterName,
  //     productName,
  //     price,
  //     content,
  //     category,
  //     categoryId,
  //     image,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //   },
  // };

  // fetch(`/api/product`, productData)
  //   .then((res) => {
  //     // javascript로 데이터를 받아 json 형태로 return 시키고
  //     return res.json();
  //   })
  //   .then((json) => {
  //     // 다시 then으로 받아 json으로 출력하면 결과값이 나온다
  //     console.log(json);
  //   })
  //   .catch((error) => console.log("fetch 에러!"));

  const data = JSON.stringify({
    painterEmail,
    painterName,
    productName,
    price,
    content,
    category,
    categoryId,
    image,
  });
}
