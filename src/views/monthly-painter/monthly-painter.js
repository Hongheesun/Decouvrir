// 작가들의 리스트에서 랜덤으로 세개를 추출한다
// or 찜이 많은 작가들의 리스트 3개를 얻어온다.

// 추려진 3개의 작가들의 데이터 파일에서 작가이름, 작가 슬로건, 작가 설명을 받아온다.

// 작가 보러가기를 누르면 작가의 페이지로
async function getPainters() {
  let url = `/api/userlist`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderMonthlyPainters() {
  let painters = await getPainters();
  console.log(painters);
  let html = "";
  painters.forEach((data) => {
    if (data["painterName"]) {
      let htmlSegment = `   
      <div class="painter-card">
          <span class="painter-name">${data["painterName"]}</span>
          <span class="painter-introduce">${data["introduce"]}</span>
        <div class="card-footer">
          <a href="#" >작가 페이지</a>
          <a href="#" >작품 보러가기</a>
        </div>
      </div>`;

      html += htmlSegment;
    }
  });

  let container = document.querySelector(".monthly-painters");
  container.innerHTML = html;
  XMLDocument;
}

renderMonthlyPainters();
