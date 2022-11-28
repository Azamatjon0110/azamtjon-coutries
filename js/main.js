
const getItem = localStorage.getItem("darkmode");
if(getItem){
  document.body.classList.add(getItem);
}

const elChangeThemeBtn = document.querySelector(".site-header-theme-button");

elChangeThemeBtn.addEventListener("click" , function(){
  document.body.classList.toggle("theme-dark");
  if(document.body.classList.contains("theme-dark")){
    localStorage.setItem("darkmode", "theme-dark");
  }else{
    localStorage.setItem("darkmode", "")
  }
});

const elForm = document.querySelector(".js-form");
const elFormInput = elForm.querySelector(".js-input");
const elFormSelect = elForm.querySelector(".js-select");
const countriesList = document.querySelector(".hero-bottom-box");
const modalBox = document.querySelector(".modal-dialog-centered");
const countriesTemp = document.querySelector(".countries-temp").content;
const modalTemp = document.querySelector(".modal-temp").content;
const frag = new DocumentFragment();

function renderCountries(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const temp = countriesTemp.cloneNode(true);
    temp.querySelector(".item-img").src = item.flags.svg;
    temp.querySelector(".item-title").textContent = item.name.common;
    temp.querySelector(".js-population").textContent = item.population;
    temp.querySelector(".js-region").textContent = item.region;
    temp.querySelector(".js-capital").textContent = item.capital;
    temp.querySelector(".country-info").dataset.id = item.name.common;
    frag.appendChild(temp);
  });
  node.appendChild(frag);
};

function renderModal(arr, node){
  node.innerHTML = "";
  arr.forEach(elem => {
    console.log(elem.currencies[Object.keys(elem.currencies)].name);
    const temp = modalTemp.cloneNode(true);
    temp.querySelector(".country-title").textContent = elem.name.common;
    temp.querySelector(".modal-img").src = elem.flags.svg;
    temp.querySelector(".js-modal-region").textContent = elem.region;
    temp.querySelector(".js-modal-currencies").textContent = elem.currencies[Object.keys(elem.currencies)].name;
    temp.querySelector(".js-modal-border").textContent = elem.borders;
    temp.querySelector(".js-modal-language").textContent = elem.languages[Object.keys(elem.languages)];
    temp.querySelector(".js-modal-subregion").textContent = elem.subregion;
    temp.querySelector(".map-link").href = elem.maps.googleMaps;
    frag.appendChild(temp);
  });
  node.appendChild(frag)
};

async function getCountries(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderCountries(data, countriesList);
  } catch (error) {
    console.log(error);
  }
};

async function getCountry(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderModal(data, modalBox);
  } catch (error) {
    console.log(error);
  }
};


getCountries("https://restcountries.com/v3.1/region/europe");

elForm.addEventListener("change", evt => {
  evt.preventDefault();
  const inputValue = elFormInput.value.trim().toLowerCase();
  if(inputValue){
    getCountries(`https://restcountries.com/v3.1/name/${inputValue}`);
  }else{
    getCountries(`https://restcountries.com/v3.1/region/${elFormSelect.value}`);
  }
});

countriesList.addEventListener("click", evt => {
  if(evt.target.matches(".country-info")){
    const btnId = evt.target.dataset.id;
    getCountry(`https://restcountries.com/v3.1/name/${btnId}`);
  }
});