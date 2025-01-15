// Slide의 DOM 요소 변수 선언
const $slide = document.querySelector("#gallery-slide > ul");
const $leftBtn = document.querySelector(".material-symbols-outlined-left");
const $rightBtn = document.querySelector(".material-symbols-outlined-right");
const $slideItems = document.querySelectorAll("li.slide-box");

// Slide 작동에 필요한 수치 선언
let slideWidth = $slide.clientWidth; // Slide 너비
let slideNums = $slideItems.length; // Slide 개수
let currentSlide = 1; // 현재 슬라이드 번호

const rightBtnEvent = () => {
  currentSlide++; // 슬라이드 번호 +1

  if (currentSlide <= slideNums) {
    const offset = slideWidth * (currentSlide - 1); // 슬라이드 이동을 위한 offset 계산

    // 각 슬라이드의 left에 offset 적용 (-offset을 줘서 왼쪽으로 이동)
    $slideItems.forEach((item) => {
      setTimeout(() => {
        item.setAttribute("style", `left: ${-offset}px`);
      }, 100);
    });
  } else {
    currentSlide--;
  }
};

const leftBtnEvent = () => {
  currentSlide--; // 슬라이드 번호 -1

  if (currentSlide > 0) {
    const offset = slideWidth * (currentSlide - 1);
    $slideItems.forEach((item) => {
      item.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currentSlide++;
  }
};

// 버튼 이벤트
$rightBtn.addEventListener("click", rightBtnEvent);
$leftBtn.addEventListener("click", leftBtnEvent);