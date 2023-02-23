const CLIENT_ID = `vAI4Z9I9EpZGSfHRDc0LT6KFfpQDnFWJ5j_MveULFzM`;
const slider = document.getElementById("slider");

let state = [];
let currenySlide;

const fetchPhotos = async () => {
  try {
    const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=4`;
    const responce = await fetch(url);
    const data = await responce.json();

    if (responce.ok && data.length) {
      state = data;
      currenySlide = data[0].id;
      setPhotos();
    }
  } catch (err) {
    console.log(err);
  }
};

const renderItem = () => {
  return state
    .map(({urls: {regular}, user: {name}, id}) => {
      const isActive = currenySlide === id ? "active" : "";
      return `<div class="slide ${isActive}" style="background-image: url(${regular})">
                <div class="slide-text">
                <span>photo by</span>
                ${name}
                </div>
              </div>`;
    })
    .join("");
};

const handleClick = ({currentTarget}) => {
  const slides = document.querySelectorAll(".slide");
  const {id} = currentTarget.dataset;

  slides.forEach((slide) => slide.classList.remove("active"));
  currentTarget.classList.add("active");
  currenySlide = id;
};

const setPhotos = () => {
  slider.innerHTML = renderItem();
  const slides = document.querySelectorAll(".slide");

  slides.forEach((slide) => {
    slide.addEventListener("click", handleClick);
  });
};

fetchPhotos();
