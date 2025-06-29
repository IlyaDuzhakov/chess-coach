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

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('show');
    document.body.classList.toggle('lock-scroll');
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      burger.classList.remove('open');
      document.body.classList.remove('lock-scroll');
    });
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
  if (window.innerWidth > 768) { // Только для десктопов
    const track = document.querySelector('.carousel-track');

  const items = track.querySelectorAll('.carousel-item');
  const speed = 0.5; // скорость прокрутки
  }
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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('telegramForm');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const phone = form.elements['phone'].value;
    const comment = form.elements['comment'].value;

    try {
      const response = await fetch('https://telegram-form-server-rfki.onrender.com/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, comment })
      });

      const result = await response.json();

      if (result.ok) {
        status.textContent = '✅ Спасибо! С вами свяжутся в ближайшее время.';
        form.reset();

        setTimeout(() => {
          status.textContent = '';
        }, 5000);
      } else {
        status.textContent = '⚠️ Ошибка при отправке. Попробуйте снова.';
        setTimeout(() => {
          status.textContent = '';
        }, 5000);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      status.textContent = '🚫 Ошибка сервера. Попробуйте позже.';
      setTimeout(() => {
        status.textContent = '';
      }, 5000);
    }
  });
});


const botIcon = document.getElementById('bot-icon');
const botForm = document.getElementById('bot-form');

botIcon.addEventListener('click', () => {
  botForm.classList.toggle('hidden');
});

function initCarousel() {
  const isMobile = window.innerWidth <= 768;
  const track = document.querySelector('.carousel-track');
  const items = track.querySelectorAll('.carousel-item');

  // Очистим клоны при ресайзе
  const clones = track.querySelectorAll('.clone');
  clones.forEach(clone => clone.remove());

  // Остановим старую анимацию
  if (window.carouselAnimationFrame) {
    cancelAnimationFrame(window.carouselAnimationFrame);
  }

  // Очистим классы active
  items.forEach(item => item.classList.remove('active'));

  if (isMobile) {
    // 👉 Мобильный: одна карточка
    let index = 0;
    if (items.length > 0) items[index].classList.add('active');

    if (window.carouselInterval) clearInterval(window.carouselInterval);

    window.carouselInterval = setInterval(() => {
      items[index].classList.remove('active');
      index = (index + 1) % items.length;
      items[index].classList.add('active');
    }, 3000);
  } else {
    // 💻 Десктоп: автопрокрутка
    const speed = 0.5;

    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      track.appendChild(clone);
    });

    let scrollLeft = 0;

    function loopScroll() {
      scrollLeft += speed;
      track.scrollLeft = scrollLeft;

      if (scrollLeft >= track.scrollWidth / 2) {
        scrollLeft = 0;
      }

      window.carouselAnimationFrame = requestAnimationFrame(loopScroll);
    }

    loopScroll();
  }
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', initCarousel);

// Повторно запускаем при изменении размера (но с debounce)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initCarousel, 300);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-scroll, .review-scroll').forEach(el => {
    el.addEventListener('wheel', (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    });
  });
});

/*                    english                */

document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('languageSwitcher');
  const elements = document.querySelectorAll('[data-i18n]');
  const defaultLang = localStorage.getItem('lang') || 'ru';

  function loadLanguage(lang) {
    fetch('./multilang/translations.json')
      .then(res => res.json())
      .then(data => {
        elements.forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (data[lang] && data[lang][key]) {
            el.textContent = data[lang][key];
          }
        });

        // 👉 Дополнительно, если есть блок FAQ
        if (data[lang].faq) {
          const faqContainer = document.getElementById('faq');
          if (faqContainer) {
            faqContainer.innerHTML = ''; // очистить
            data[lang].faq.forEach(item => {
              const faqItem = document.createElement('div');
              faqItem.className = 'accordion-item';
              faqItem.innerHTML = `
                <button class="accordion-header">
                  <span>${item.question}</span>
                  <svg class="icon" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div class="accordion-content">
                  ${item.answers.map(ans => `<p>${ans}</p>`).join('')}
                </div>
              `;
              faqContainer.appendChild(faqItem);
            });
          }
        }
      });
  }

  switcher.value = defaultLang;
  loadLanguage(defaultLang);

  switcher.addEventListener('change', () => {
    const selectedLang = switcher.value;
    localStorage.setItem('lang', selectedLang);
    loadLanguage(selectedLang);
  });
});

const switcher = document.getElementById('languageSwitcher');
const mobileSwitcher = document.getElementById('languageSwitcherMobile');

function loadLanguage(lang) {
  fetch('./multilang/translations.json')
    .then(res => res.json())
    .then(data => {
      // твоя логика замены текста
    });
}

const selectedLang = localStorage.getItem('lang') || 'ru';
if (switcher) switcher.value = selectedLang;
if (mobileSwitcher) mobileSwitcher.value = selectedLang;

if (switcher) {
  switcher.addEventListener('change', () => {
    localStorage.setItem('lang', switcher.value);
    location.reload();
  });
}

if (mobileSwitcher) {
  mobileSwitcher.addEventListener('change', () => {
    localStorage.setItem('lang', mobileSwitcher.value);
    location.reload();
  });
}

loadLanguage(selectedLang);
