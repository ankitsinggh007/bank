'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Sign Up Opstion
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scrolling
const btnscroller = document.querySelector('.nav__links');
btnscroller.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const a = e.target.getAttribute('href');
    document.querySelector(a).scrollIntoView({ behavior: 'smooth' });
  }
});
//Tabbed component
const btnop = document.querySelectorAll('.operations__tab');
const btncon = document.querySelectorAll('.operations__content');
const btnTab = document.querySelector('.operations__tab-container');
btnTab.addEventListener('click', function (e) {
  const a = e.target.closest('.operations__tab');
  if (!a) return;
  btnop.forEach(ele => ele.classList.remove('operations__tab--active'));
  btncon.forEach(ele => ele.classList.remove('operations__content--active'));

  a.classList.add('operations__tab--active');
  const con = document.querySelector(` .operations__content--${a.dataset.tab}`);
  con.classList.add('operations__content--active');
});
// Implement nav sticky
const navi = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const callback = function (entries, observer) {
  const a = entries[0];
  // console.log(a.isIntersecting);
  if (!a.isIntersecting) navi.classList.add('sticky');
  else navi.classList.remove('sticky');
};
const navHeight = navi.getBoundingClientRect().height;
// console.log(navHeight);
const option = {
  root: null,
  threshold: 0,
  // rootMargin: `$-{navHeight`,
};

const observer = new IntersectionObserver(callback, option);
observer.observe(header);
// Implement animation as we scroll
const sections = document.querySelectorAll('.section');

const sectionfunction = function (entries, observer) {
  console.log(entries[0]);
  if (!entries[0].isIntersecting) return;
  console.log(entries[0].target);
  entries[0].target.classList.remove('section--hidden');
  observer.unobserve(entries[0].target);
};

let secObserver = new IntersectionObserver(sectionfunction, {
  root: null,
  threshold: 0.15,
  roorMargin:"200px"
});
sections.forEach(element => {
  element.classList.add('section--hidden');
  secObserver.observe(element);
});
// Implement lazy loading
const img = document.querySelectorAll('img[data-src]');
const imgfunc = function (entries, observer) {
  const a = entries[0];
  if (!a.isIntersecting) return;
  a.target.src = a.target.dataset.src;
  // ut will emit load event
  // a.target.classList.remove('lazy-img');
  a.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
    observer.unobserve(this);
  });
};
const imgobserver = new IntersectionObserver(imgfunc, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
img.forEach(ele => imgobserver.observe(ele));
// Implement slider component

const slider = document.querySelectorAll('.slide');
console.log(slider);
const slide = document.querySelector('.slider');
const leftArrow = document.querySelector('.slider__btn--left');
const righttArrow = document.querySelector('.slider__btn--right');
const dot = document.querySelector('.dots');
slider.forEach((ele, i) => {
  const html = `<div class="dot${i} dots__dot" data-tab=${i}></div>`;
  dot.insertAdjacentHTML('beforeend', html);
});
const dots = document.querySelectorAll('.dots__dot');
console.log(dots);
let k = 0;
let currentPos = 0;
slider.forEach((ele, i) => {
  console.log(ele, i);
  // k++;
  ele.style.transform = `translate(${100 * i}%)`;
});
const activatedot = function (k) {
  dots.forEach((ele, i) => ele.classList.remove('dots__dot--active'));
  dots[k].classList.add('dots__dot--active');
};

const rightslider = function () {
  if (k == slider.length - 1) k = 0;
  else {
    k++;
  }
  slider.forEach((ele, i) => {
    ele.style.transform = `translate(${100 * (i - k)}%)`;
  });
  activatedot(k);
};
const leftslider = function () {
  if (k == 0) k = slider.length - 1;
  else {
    k--;
  }
  slider.forEach((ele, i) => {
    ele.style.transform = `translate(${100 * (i - k)}%)`;
  });
  activatedot(k);
};
righttArrow.addEventListener('click', rightslider);
leftArrow.addEventListener('click', leftslider);
slide.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowRight') {
    rightslider();
  } else if (e.key == 'ArrowLeft') {
    leftslider();
  }
});
