let menuToggle = document.querySelector('.toggle');
let navigator = document.querySelector('.navigator')
menuToggle.onclick = function(){
  menuToggle.classList.toggle('active');
  navigator.classList.toggle('active');
}

let list = document.querySelectorAll('.list');
for (let i = 0; i < list.length; i++) {
  list[i].onclick = function() {
    let j = 0;
    while(j < list.length) {
      list[j++].className = 'list';
    }
    list[i].className = 'list active';
  }
}

const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode");

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
});