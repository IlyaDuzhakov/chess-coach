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
  const bot = document.getElementById('bot-icon'); // ✅ твой бот
  const form = document.querySelector('.form');   // если нужно скрывать форму тоже

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('show');
    document.body.classList.toggle('lock-scroll');

    const isOpen = nav.classList.contains('show');

    if (isOpen) {
      if (bot) bot.style.visibility = 'hidden';
      if (form) form.style.visibility = 'hidden';
    } else {
      if (bot) bot.style.visibility = '';
      if (form) form.style.visibility = '';
    }
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      burger.classList.remove('open');
      document.body.classList.remove('lock-scroll');

      if (bot) bot.style.visibility = '';
      if (form) form.style.visibility = '';
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

// window.addEventListener('load', () => {
//   if (window.innerWidth > 768) { // Только для десктопов
//     const track = document.querySelector('.carousel-track');

//   const items = track.querySelectorAll('.carousel-item');
//   const speed = 0.5; // скорость прокрутки
//   }
//   // Клонируем элементы для бесконечной прокрутки
//   items.forEach(item => {
//     const clone = item.cloneNode(true);
//     track.appendChild(clone);
//   });

//   let scrollLeft = 0;

//   function loopScroll() {
//     scrollLeft += speed;
//     track.scrollLeft = scrollLeft;

//     // Когда прокрутка дошла до середины — сбрасываем
//     if (scrollLeft >= track.scrollWidth / 2) {
//       scrollLeft = 0;
//     }

//     requestAnimationFrame(loopScroll);
//   }

  // Настройки стилей на всякий случай
//   track.style.display = 'flex';
//   track.style.overflow = 'hidden';
//   track.style.scrollBehavior = 'auto'; // отключить анимации по умолчанию

//   loopScroll();
// });

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
  
  // intensive

  document.querySelectorAll('.btn__intensive').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.closest('.intensive-card').querySelector('h3')?.textContent || 'Неизвестный интенсив';
    document.getElementById('intensive').value = title;
    document.getElementById('telegramForm').scrollIntoView({ behavior: 'smooth' });

    //
    const status = document.getElementById('form-status');
    //
  });
});

// intensive

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // polisity
     if (!form.policy.checked) {
      status.textContent = '❗ Вы должны согласиться с политикой.';
      return;
    }
    // polisity
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

// Кнопка оставить заявку
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('requestBtn');
  const form = document.getElementById('bot-form');

  btn.addEventListener('click', () => {
    form.classList.toggle('hidden');
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
document.addEventListener('DOMContentLoaded', () => {
  const botForm = document.getElementById('bot-form');
  const popup = document.getElementById('bonusPopup');
  const form = document.getElementById('telegramForm');
  const status = document.getElementById('form-status');
  const checkbox = document.getElementById('agree');
  const intensiveInput = document.getElementById('intensive');

  // кнопки открытия формы
  document.querySelectorAll('.open-bot-form').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      botForm.classList.remove('hidden');
      if (popup) popup.style.display = 'none';

      const title =
        btn.closest('.price-card')?.querySelector('h3')?.textContent || 'Неизвестный';
      intensiveInput.value = title;

      botForm.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // адаптация bot-icon
  const bot = document.getElementById('bot-icon');
  const headerRight = document.querySelector('.header__right');

  function moveBotIcon() {
    if (window.innerWidth <= 1024) {
      if (!headerRight.contains(bot)) {
        headerRight.appendChild(bot);
      }
    } else {
      document.body.appendChild(bot);
    }
  }

  let resizeTimeout;
  moveBotIcon();

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(moveBotIcon, 300);
  });

  // горизонтальный скролл видео и отзывов
  document.querySelectorAll('.video-scroll, .review-scroll').forEach(el => {
    el.addEventListener('wheel', (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    });
  });

  // инициализация карусели
  if (typeof initCarousel === 'function') {
    initCarousel();
  } else {
    console.warn('⚠️ Функция initCarousel не найдена!');
  }

  // ВАЛИДАЦИЯ И ОТПРАВКА
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const comment = form.elements['comment'].value.trim();
    const intensive = intensiveInput.value;

    if (!checkbox.checked) {
      status.textContent = '⚠️ Нужно согласиться с политикой.';
      return;
    }

    if (!name || !email || !phone) {
      status.textContent = '⚠️ Заполните все обязательные поля.';
      return;
    }

    try {
      const response = await fetch('https://telegram-form-server-rfki.onrender.com/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, comment, intensive })
      });

      const result = await response.json();

      if (result.ok) {
        status.textContent = '✅ Спасибо! С вами свяжутся.';
        form.reset();
        checkbox.checked = false;
      } else {
        status.textContent = '⚠️ Ошибка при отправке.';
      }
    } catch (err) {
      console.error(err);
      status.textContent = '🚫 Ошибка сервера.';
    }

    setTimeout(() => {
      status.textContent = '';
    }, 5000);
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
            el.innerHTML = data[lang][key];
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

const courses = document.querySelectorAll('.courses-slider .course');
let current = 0;

setInterval(() => {
  courses[current].classList.remove('active');
  current = (current + 1) % courses.length;
  courses[current].classList.add('active');
}, 12000);


document.querySelectorAll('[id^="toggle-program"]').forEach(button => {
  button.addEventListener('click', () => {
    const num = button.id.replace('toggle-program', '');
    const prog = document.getElementById(`course-program${num}`);
    const more = prog.querySelector('.more');

    prog.classList.toggle('hidden');
    if (prog.classList.contains('hidden')) {
      button.textContent = 'Показать программу ▼';
      if (more) more.classList.add('hidden');
    } else {
      button.textContent = 'Скрыть программу ▲';
      if (more) more.classList.remove('hidden');
    }
  });
});

const modal = document.getElementById('pdf-modal');
const iframe = modal.querySelector('iframe');
const closeBtn = document.getElementById('close-pdf');

document.querySelectorAll('.book__view').forEach(btn => {
  btn.addEventListener('click', () => {
    const pdfSrc = btn.getAttribute('data-pdf');
    iframe.src = pdfSrc;
    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  iframe.src = '';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    iframe.src = '';
  }
});

function showLarge(src) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modalImg.src = src;
  modal.style.display = 'flex';
  modal.onclick = () => modal.style.display = 'none';
}

// intensives
document.addEventListener('DOMContentLoaded', () => {
  // const monthIndex = new Date().getMonth(); // или const monthIndex = 2; - каждый месяц  
  const monthIndex = 7;
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const monthNamesRu = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const gradients = {
    winter: 'linear-gradient(135deg, #b2fefa, #0ed2f7)',
    spring: 'linear-gradient(135deg, #a1ffce, #faffd1)',
    summer: 'linear-gradient(135deg, #fbd786, #f7797d)',
    autumn: 'linear-gradient(135deg, #c2e9fb, #a1c4fd)'
  };

  let gradient = gradients.autumn;
  if ([11, 0, 1].includes(monthIndex)) gradient = gradients.winter;
  else if ([2, 3, 4].includes(monthIndex)) gradient = gradients.spring;
  else if ([5, 6, 7].includes(monthIndex)) gradient = gradients.summer;

  const monthKey = monthNames[monthIndex];
  const monthName = monthNamesRu[monthIndex];
  const lang = localStorage.getItem('lang') || 'ru';

  const section = document.getElementById('intensives');
  const grid = document.getElementById('intensiveGrid');
  const monthNameEl = document.getElementById('monthName');

  section.style.background = gradient;
  monthNameEl.textContent = lang === 'ru' ? monthName : monthName.charAt(0) + monthName.slice(1).toLowerCase();

  fetch('multilang/intensives.json')
    .then(res => res.json())
    .then(intensives => {
      const data = intensives[monthKey]?.[lang];
      if (!Array.isArray(data) || data.length === 0) {
        const noDataMsg = lang === 'ru'
          ? 'Нет интенсивов на этот месяц'
          : 'No intensives scheduled for this month';
        grid.innerHTML = `<p style="text-align:center; padding:20px;">${noDataMsg}</p>`;
        return;
      }

      grid.innerHTML = '';
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('intensive-card');

        const isPostponed = item.status === 'postponed';
        const noteText = isPostponed
          ? (item.note || (lang === 'ru'
              ? 'Интенсив перенесён. Следите за новостями.'
              : 'This intensive is postponed. Stay tuned for updates.'))
          : '';

        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>📆 <strong>${lang === 'ru' ? 'Даты' : 'Dates'}:</strong> ${item.dates}</p>
          <p>⌛ <strong>${lang === 'ru' ? 'Формат' : 'Format'}:</strong> ${item.format}</p>
          <details>
            <summary>📋 ${lang === 'ru' ? 'Программа по дням' : 'Program by days'}</summary>
            <ul>
              ${item.program.map(day => `<li>${day}</li>`).join('')}
            </ul>
          </details>
          <p>🎯 <strong>${lang === 'ru' ? 'Для кого' : 'For whom'}:</strong> ${item.for}</p>
          <p>🎁 <strong>${lang === 'ru' ? 'Бонус' : 'Bonus'}:</strong> ${item.bonus.replace('до 10%', 'от 10 до 20%').replace('up to 10%', 'from 10% to 20%')}</p>
          <p>💶 <strong>${lang === 'ru' ? 'Цена' : 'Price'}:</strong> ${item.price}</p>
          <div class="button-wrapper">
            ${
              isPostponed
                ? `<div style="color: red; font-weight: bold; margin-top:10px;">
                     ${noteText}
                   </div>`
                : `<button class="btn__intensive">${lang === 'ru' ? 'Записаться' : 'Sign up'}</button>`
            }
          </div>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = `<p style="text-align:center; padding:20px; color:red;">
        ${lang === 'ru' ? 'Ошибка загрузки данных' : 'Failed to load data'}
      </p>`;
    });
});

document.getElementById('intensiveBtn').addEventListener('click', () => {
  window.location.href = 'intensive_rezults.html';
});


