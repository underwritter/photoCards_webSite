const CLIENT_ID = `vAI4Z9I9EpZGSfHRDc0LT6KFfpQDnFWJ5j_MveULFzM`;
const slider = document.getElementById("slider");

let state = [];
let currentlySlide;

const leftKeyCode = 37;
const rightKeyCode = 39;

const fetchPhotos = async () => {
  try {
    const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=4`;
    const responce = await fetch(url);
    const data = await responce.json();

    if (responce.ok && data.length) {
      state = data;
      currentlySlide = data[0].id;
      setPhotos();
    }
  } catch (err) {
    console.log(err);
  }
};

const renderItem = () => {
  return state
    .map(({urls: {regular}, user: {name}, id}) => {
      const isActive = currentlySlide === id ? "active" : "";
      return `<div id="${id}" class="slide ${isActive}" style="background-image: url(${regular})">
                <div class="slide-text">
                <span>photo by</span>
                ${name}
                </div>
              </div>`;
    })
    .join("");
};

const getActiveSlide = () => document.querySelector(".active");
const handleClick = ({currentTarget}) => {
  const {id} = currentTarget.id;

  getActiveSlide().classList.remove("active");
  currentTarget.classList.add("active");
  currentlySlide = id;
};

const setPhotos = () => {
  slider.innerHTML = renderItem();
  const slides = document.querySelectorAll(".slide");

  document.addEventListener("keydown", (e) => {
    const currentNode = getActiveSlide();
    const currentSlideIdx = state.findIndex((item) => {
      return item.id === currentNode.id;
    });

    const nextSlide = {
      [leftKeyCode]: {
        currentStep: currentSlideIdx - 1,
        slideStepEndPoint: state.length - 1,
      },
      [rightKeyCode]: {
        currentStep: currentSlideIdx + 1,
        slideStepEndPoint: 0,
      },
    }[e.keyCode];

    if (!nextSlide) return;

    const slide = state[nextSlide.currentStep];
    const node = document.querySelector(`[id=${slide?.id}]`);

    if (!node) {
      currentNode.classList.remove("active");
      slides[nextSlide.slideStepEndPoint].classList.add("active");
    } else {
      currentNode.classList.remove("active");
      node.classList.add("active");
    }
  });

  slides.forEach((slide) => {
    slide.addEventListener("click", handleClick);
  });
};

fetchPhotos();

// const isJopa // boolean
// const user // object
// const users // array
// const getUser // function // вызываем, получаем после вызова
// const getUsers // тоже самое что и выше
// const onClick // вызываем
// const handleRequest // вызываем
// const convertData //
// const convertedData //
// const strJopa = 'jopa'
