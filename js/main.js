const elChangeThemeBtn = document.querySelector(".site-header-theme-button");

elChangeThemeBtn.addEventListener("click" , function(){
  document.body.classList.toggle("theme-dark");
});