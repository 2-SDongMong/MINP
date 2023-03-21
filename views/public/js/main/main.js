// 품앗이 캐러셀 슬라이드
let slides1 = document.querySelector('.slides1'),
  slide = document.querySelectorAll('.slides1 li'),
  currentIdx = 0,
  slideCount = slide.length,
  prevBtn = document.querySelector('#prev'),
  slideWidth = 610,
  slideMargin = 40,
  nextBtn = document.querySelector('#next');

slides1.style.width =
  (slideWidth + slideMargin) * slideCount - slideMargin + 'px';

function moveSlide(num) {
  slides1.style.left = -num * 650 + 'px';
  currentIdx = num;
}
nextBtn.addEventListener('click', function () {
  if (currentIdx < slideCount - 3) {
    moveSlide(currentIdx + 1);
  } else {
    moveSlide(0);
  }
});

prevBtn.addEventListener('click', function () {
  if (currentIdx > 0) {
    moveSlide(currentIdx - 1);
  } else {
    moveSlide(slideCount - 3);
  }
});

// 품앗이 캐러셀 슬라이드
let slides2 = document.querySelector('.slides2'),
  slide2 = document.querySelectorAll('.slides2 li'),
  currentIdx2 = 0,
  slideCount2 = slide2.length,
  prevBtn2 = document.querySelector('#prev2'),
  slideWidth2 = 410,
  slideMargin2 = 20,
  nextBtn2 = document.querySelector('#next2');

slides2.style.width =
  (slideWidth2 + slideMargin2) * slideCount2 - slideMargin2 + 'px';

function moveSlide2(num) {
  slides2.style.left = -num * 430 + 'px';
  currentIdx2 = num;
}
nextBtn2.addEventListener('click', function () {
  if (currentIdx2 < slideCount2 - 4) {
    moveSlide2(currentIdx2 + 1);
  } else {
    moveSlide2(0);
  }
});

prevBtn2.addEventListener('click', function () {
  if (currentIdx2 > 0) {
    moveSlide2(currentIdx2 - 1);
  } else {
    moveSlide2(slideCount2 - 4);
  }
});
