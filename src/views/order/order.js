let ordererEmail = document.getElementById("orderer-email");
let ordererName = document.getElementById("orderer-name");
let ordererTel = document.getElementById("orderer-tel");

function inputOrdererInfo(){
    // user 정보를 받아와서
    ordererEmail.value = "xxxxxx@gmail.com";
    ordererName.value = "윤경";
    ordererTel = "010-1111-1234";
}
window.onload = function(){
    inputOrdererInfo();
}