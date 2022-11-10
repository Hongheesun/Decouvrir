let artistSlogan = document.getElementById('artist-slogan');
let artistName = document.getElementById('artist-name');
let artistSNS = document.getElementById('artist-sns');

let artistExplain = document.getElementById('artist-explain');

function changeText(){
    // 작가의 이름으로 데이터 찾음... 이름이 동일한 데이터의 값으로 innerHTML
    artistSlogan.innerHTML = "";
    artistName.innerHTML = "";
    artistExplain.innerHTML = "";

}
function addArtistWork(){
    // 작가의 이름으로 데이터를 찾아서 작가의 작품들을 추가
    let newWork = document.createElement('img');
    newWork.setAttribute('class', '');
    
}