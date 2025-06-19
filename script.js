document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".mySwiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
    document.body.classList.toggle('lock-scroll');
  });
  document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('show');
    document.body.classList.remove('lock-scroll');
  });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Автопрокрутка каждые 4 секунды
setInterval(nextSlide, 2000);

// Начальный показ
showSlide(currentSlide);

window.addEventListener('load', () => {
  const track = document.querySelector('.carousel-track');
  const items = track.querySelectorAll('.carousel-item');
  const speed = 0.5; // скорость прокрутки

  // Клонируем элементы для бесконечной прокрутки
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollLeft = 0;

  function loopScroll() {
    scrollLeft += speed;
    track.scrollLeft = scrollLeft;

    // Когда прокрутка дошла до середины — сбрасываем
    if (scrollLeft >= track.scrollWidth / 2) {
      scrollLeft = 0;
    }

    requestAnimationFrame(loopScroll);
  }

  // Настройки стилей на всякий случай
  track.style.display = 'flex';
  track.style.overflow = 'hidden';
  track.style.scrollBehavior = 'auto'; // отключить анимации по умолчанию

  loopScroll();
});

const footer = document.querySelector('.footer');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footer.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

observer.observe(footer);

const revealElements = document.querySelectorAll('.reveal, .reveal-top, .reveal-bottom');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // Удаляем при выходе
    }
  });
}, {
  threshold: 0.2
});

revealElements.forEach(el => revealObserver.observe(el));

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('active');
  });
});
