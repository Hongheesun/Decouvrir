// export default axiosPost;
const postBtn = document.querySelector(".post-button");

postBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 폼 동작 막기

  let painterEmail = document.querySelector(".email").value;
  let productName = document.querySelector(".name").value;
  let content = document.querySelector(".content").value;
  let price = document.querySelector(".price").value;
  let image = document.querySelector(".image").value;
  let category = document.querySelector(".category").value;

  let productData = {
    method: "POST",
    body: JSON.stringify({
      painterEmail,
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

  fetch(`/api/product`, productData)
    // .then((response) => response.json())
    .then((res) => {
      // javascript로 데이터를 받아 json 형태로 return 시키고
      return res.json();
    })
    .then((json) => {
      // 다시 then으로 받아 json으로 출력하면 결과값이 나온다
      console.log(json);
    })
    .catch((error) => console.log("fetch 에러!"));
});
