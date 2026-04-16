document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".mySwiper", {
    loop: true,
    direction: 'horizontal',  // Убедитесь, что направление горизонтальное
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

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-item');

let currentSlide = 0;
let interval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'block' : 'none';
  });
}

function startAutoSlide() {
  interval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

// адаптация
function initCarousel() {
  stopAutoSlide();

  if (window.innerWidth > 768) {
    // десктоп — показывать все
    slides.forEach(slide => {
      slide.style.display = 'block';
    });
    track.style.display = 'flex';
    track.style.overflow = 'hidden';
  } else {
    // мобилка/планшет — по одному с авто-сменой
    track.style.display = 'block';
    track.style.overflow = 'hidden';
    showSlide(currentSlide);
    startAutoSlide();
  }
}

// следить за ресайзом
window.addEventListener('resize', initCarousel);
window.addEventListener('load', initCarousel);


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

document.addEventListener('click', (e) => {
  const header = e.target.closest('.accordion-header');
  if (!header) return;
  const item = header.parentElement;
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
  if (!isActive) item.classList.add('active');
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
  const name = form.elements['name'].value;
const email = form.elements['email'].value;
const phone = form.elements['phone'].value;
const comment = form.elements['comment'].value;

const status = document.getElementById('form-status');

try {
  const response = await fetch('https://telegram-form-server-rfki.onrender.com/send-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, comment })
  });

  // Пытаемся прочитать JSON, но не зависим от результата
  let result = {};
  try {
    result = await response.json();
  } catch (e) {
    console.warn('Не удалось распарсить JSON:', e);
  }

  // Всегда показываем успех
  status.textContent = '✅ Спасибо! С вами свяжутся в ближайшее время.';
  form.reset();
  setTimeout(() => {
    status.textContent = '';
  }, 5000);

} catch (error) {
  console.error('Ошибка при отправке формы (но скрыта от пользователя):', error);
  // Всё равно показываем успех
  status.textContent = '✅ Спасибо! С вами свяжутся в ближайшее время.';
  form.reset();
  setTimeout(() => {
    status.textContent = '';
  }, 5000);
}
  });
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
document.addEventListener("DOMContentLoaded", function () {
  const botForm = document.getElementById('bot-form');
  const form = document.getElementById('telegramForm');
  const intensiveInput = document.getElementById('intensive');
  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const popup = document.getElementById('bonusPopup');
  const checkbox = document.getElementById('agree');
  
  // Проверка на существование элементов
  if (!botForm || !form) {
    console.warn('❗ bot-form или telegramForm не найден.');
    return;
  }

  // Открытие формы при нажатии кнопки "Записаться"
  document.querySelectorAll('.open-bot-form').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      botForm.classList.remove('hidden');
      if (popup) popup.style.display = 'none';

      const card = btn.closest('.price-card');
      const title = card?.querySelector('h3')?.textContent.trim() || 'Неизвестный';

      if (intensiveInput) intensiveInput.value = title;

      botForm.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Отправка формы и валидация
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const comment = form.elements['comment'].value.trim();

    const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]{2,}$/;
    const phoneRegex = /^[\d\s()+-]{6,}$/;

    // Валидация
    if (!checkbox.checked) {
      status.textContent = '⚠️ Нужно согласиться с политикой.';
      status.style.color = 'red';
      return;
    }

    if (!nameRegex.test(name)) {
      status.textContent = '⚠️ Имя должно содержать только буквы и быть не короче 2 символов.';
      status.style.color = 'red';
      return;
    }

    if (!phoneRegex.test(phone)) {
      status.textContent = '⚠️ Телефон должен быть корректным.';
      status.style.color = 'red';
      return;
    }

    submitBtn.disabled = true;
    status.textContent = '⏳ Отправка…';
    status.style.color = 'black';

    try {
      const response = await fetch('https://telegram-form-server-rfki.onrender.com/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, comment })
      });

      const result = await response.json();

      if (result.ok) {
        status.textContent = '✅ Спасибо! С вами свяжутся.';
        status.style.color = 'green';
        form.reset();
        showPopup(); // Показываем попап при успешной отправке
      } else {
        status.textContent = '❌ Ошибка при отправке.';
        status.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      status.textContent = '🚫 Сервер недоступен. Попробуйте позже.';
      status.style.color = 'red';
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => {
        status.textContent = '';
      }, 7000);
    }
  });
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector('#bonusPopup'); // Фон попапа
  const closeBtn = document.getElementById('popupClose'); // Кнопка закрытия попапа
  const openBtn = document.querySelector('.open-popup'); // Кнопка для открытия попапа (рекламного)

  // Функция для открытия попапа
  function showPopup() {
    popup.classList.add('active'); // Показываем попап
  }

  // Функция для закрытия попапа
  function closePopup() {
    popup.classList.remove('active'); // Скрываем попап
  }

  // Открытие попапа при клике на кнопку "Записаться" (или на любую другую кнопку)
  if (openBtn) {
    openBtn.addEventListener('click', function () {
      showPopup(); // Открыть попап
    });
  }

  // Закрытие попапа при клике на кнопку "Закрыть"
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closePopup(); // Закрыть попап
    });
  }

  // Закрытие попапа при клике на фон (клик вне попапа)
  if (popup) {
    popup.addEventListener('click', function (e) {
      if (e.target === popup) { // Закрыть, если клик по фону
        closePopup(); // Закрыть попап
      }
    });
  }

  // Таймеры управляются через popup.js (с cooldown через localStorage)
});


});


// клик на кнопку записаться
document.addEventListener('click', (e) => {
  const form = document.querySelector('#bot-form');

  // кнопка "Записаться"
  const openBtn = e.target.closest('.open-bot-form, #bot-icon');
  if (openBtn) {
    // console.log('✅ Кнопка нажата или клик на коня!');
    form.classList.remove('hidden');
    form.classList.add('show');
    return;
  }

  // кнопка закрытия
  const closeBtn = e.target.closest('.form-close');
  if (closeBtn) {
    // console.log('❌ Форма закрыта по кнопке!');
    form.classList.add('hidden');
    form.classList.remove('show');
    return;
  }
      // Кнопка «Оставить заявку»
  const requestBtn = document.getElementById("requestBtn");
  if (requestBtn) {
    requestBtn.addEventListener("click", () => {
      showForm();
    });
  }
});
// клик на кнопку записаться

/*                    english                */
// Функция переключения языка
function loadLanguage(lang) {
  fetch('./multilang/translations.json')
    .then(res => res.json())
    .then(data => {
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[lang] && data[lang][key]) {
          el.innerHTML = data[lang][key];
        }
      });

      const faqContainer = document.getElementById('faq');
      if (faqContainer && data[lang].faq) {
        faqContainer.innerHTML = '';
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

      const switcherDesktop = document.getElementById('languageSwitcher');
      const switcherMobile = document.getElementById('languageSwitcherMobile');

      if (switcherDesktop) switcherDesktop.value = lang;
      if (switcherMobile) switcherMobile.value = lang;

      localStorage.setItem('lang', lang);
    })
    .catch(err => console.error('Ошибка загрузки перевода:', err));
}
// клик на кнопку записаться
document.addEventListener('DOMContentLoaded', () => {
  // Добавление обработчика на кнопку "Оставить заявку"
  const requestBtn = document.getElementById("requestBtn");
  if (requestBtn) {
    requestBtn.addEventListener("click", () => {
      showForm();
    });
  }

  // Обработчик клика на кнопки "Записаться" и "Закрыть"
  document.addEventListener('click', (e) => {
    const form = document.querySelector('#bot-form');
    
    // кнопка "Записаться"
    const openBtn = e.target.closest('.open-bot-form, #bot-icon');
    if (openBtn) {
      form.classList.remove('hidden');
      form.classList.add('show');
      return;
    }

    // кнопка закрытия
    const closeBtn = e.target.closest('.form-close');
    if (closeBtn) {
      form.classList.add('hidden');
      form.classList.remove('show');
      return;
    }
  });
});

function showForm() {
  const form = document.querySelector('#bot-form');
  form.classList.remove('hidden');
  form.classList.add('show');
}

// Вешаем слушатели после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('overlay');
  const sideMenu = document.getElementById('sideMenu');
  const closeBtn = document.getElementById('closeBtn');

  const switcherDesktop = document.getElementById('languageSwitcher');
  const switcherMobile = document.getElementById('languageSwitcherMobile');

  const defaultLang = localStorage.getItem('lang') || 'ru';
  loadLanguage(defaultLang);

  const handleLangChange = (e) => {
    const lang = e.target.value;
    //console.log(`Переключение на: ${lang}`);
    loadLanguage(lang);
  };

  if (switcherDesktop) switcherDesktop.addEventListener('change', handleLangChange);
  if (switcherMobile) switcherMobile.addEventListener('change', handleLangChange);

  const closeMenu = () => {
    sideMenu.classList.remove('show');
    overlay.classList.remove('show');
    burger.classList.remove('active');
  };

  if (burger) {
    burger.addEventListener('click', () => {
      sideMenu.classList.add('show');
      overlay.classList.add('show');
      burger.classList.add('active');
    });
  }

  if (overlay) overlay.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  document.querySelectorAll('.side-menu__nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});


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
// Sticky CTA — появляется после скролла 300px
window.addEventListener('scroll', () => {
  const cta = document.getElementById('stickyCTA');
  if (cta) {
    cta.classList.toggle('visible', window.scrollY > 300);
  }
}, { passive: true });

// Бургер в мобильной шапке — открывает то же боковое меню
document.addEventListener('DOMContentLoaded', () => {
  const mobileBurger = document.getElementById('mobileBurger');
  const sideMenuEl = document.getElementById('sideMenu');
  const overlayEl = document.getElementById('overlay');

  if (mobileBurger && sideMenuEl) {
    mobileBurger.addEventListener('click', () => {
      const isOpen = sideMenuEl.classList.contains('show');
      sideMenuEl.classList.toggle('show', !isOpen);
      overlayEl.classList.toggle('show', !isOpen);
      mobileBurger.classList.toggle('active', !isOpen);
    });

    // Закрываем при клике на overlay или ссылку в меню
    overlayEl?.addEventListener('click', () => {
      sideMenuEl.classList.remove('show');
      overlayEl.classList.remove('show');
      mobileBurger.classList.remove('active');
    });
    document.querySelectorAll('.side-menu__nav a').forEach(link => {
      link.addEventListener('click', () => mobileBurger.classList.remove('active'));
    });
  }
});

// Bottom nav — подсветка активного пункта при скролле
(function () {
  const sections = [
    { id: 'home',     nav: 'home' },
    { id: 'about',    nav: 'about' },
    { id: 'pricing',  nav: 'pricing' },
    { id: 'feedback', nav: 'feedback' },
  ];

  function updateBottomNav() {
    const scrollY = window.scrollY + 80;
    let current = 'home';
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    document.querySelectorAll('.bottom-nav__item[data-section]').forEach(item => {
      const sec = item.dataset.section;
      const isCta = item.classList.contains('bottom-nav__item--cta');
      if (!isCta) item.classList.toggle('active', sec === current);
    });
  }

  window.addEventListener('scroll', updateBottomNav, { passive: true });
  window.addEventListener('load', updateBottomNav);
})();

document.addEventListener('DOMContentLoaded', () => {
  // const monthIndex = new Date().getMonth(); // или const monthIndex = 2; - каждый месяц
  const monthIndex = new Date().getMonth();
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

  const loadIntensives = () => fetch('multilang/intensives.json')
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

  // Запускаем загрузку только когда секция появляется в viewport
  const intensivesSection = document.getElementById('intensives');
  if (intensivesSection) {
    const intensivesObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadIntensives();
        intensivesObserver.disconnect();
      }
    }, { rootMargin: '200px' });
    intensivesObserver.observe(intensivesSection);
  }
});

document.getElementById('intensiveBtn').addEventListener('click', () => {
  window.location.href = 'intensive_rezults.html';
});

// бургер

document.querySelectorAll('.side-menu__nav a').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('show');
    overlay.classList.remove('show');
    burger.classList.remove('active');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('overlay');
  const sideMenu = document.getElementById('sideMenu');
  const closeBtn = document.getElementById('closeBtn');

  const closeMenu = () => {
    sideMenu.classList.remove('show');
    overlay.classList.remove('show');
    burger.classList.remove('active');
  };

  burger.addEventListener('click', () => {
    sideMenu.classList.add('show');
    overlay.classList.add('show');
    burger.classList.add('active');
  });
  // 👉 подгружаем язык прямо здесь
  const currentLang = localStorage.getItem('lang') || 'ru';
  loadLanguage(currentLang);

  overlay.addEventListener('click', closeMenu);
  closeBtn.addEventListener('click', closeMenu);

  // document.querySelectorAll('.side-menu__nav a').forEach(link => {
  //   link.addEventListener('click', closeMenu);
  // });
});

// pricing.json
document.addEventListener('DOMContentLoaded', () => {
  function renderPricing(lang = 'ru') {
    fetch('./multilang/pricing.json')
      .then(res => res.json())
      .then(data => {
        const section = document.querySelector('.content__prise');
        if (!section) return;

        section.innerHTML = '';

        data[lang].forEach(item => {
          const card = document.createElement('div');
          card.className = `price-card price-card--${item.type}`;

          let html = `
            ${item.badge ? `<div class="price-badge">${item.badge}</div>` : ''}
            ${item.icon ? `<img src="${item.icon}" alt="${item.title}" class="icon-title">` : ''}
            <h3>${item.title}</h3>
          `;

          if (item.people) {
            html += `<p class="number__peoples">${item.people}</p>`;
          }

          item.options.forEach(opt => {
            html += `<p>⌛ ${opt.duration} — <strong>${opt.price || ''}</strong> 
              ${opt.old ? `<br><small>(вместо ${opt.old})</small>` : ''} 
              ${opt.note || ''}</p>`;
          });

          if (item.notes) {
            item.notes.forEach(note => {
              html += `<p class="note">${note}</p>`;
            });
          }

          if (item.link) {
            html += `<a href="${item.link}" target="_blank" class="btn btn-primary btn-pink-purple">${item.link_text}</a>`;
          } else if (item.button) {
            html += `<button class="btn btn-primary open-bot-form btn-pink-purple">${item.button}</button>`;
          }

          card.innerHTML = html;
          section.appendChild(card);
        });
      })
      .catch(err => {
        console.error('Ошибка загрузки pricing.json:', err);
      });
  }

  // 👉 Вызовем её сразу при загрузке
  const currentLang = localStorage.getItem('lang') || 'ru';
  renderPricing(currentLang);

  // и ещё можно привязать к смене языка, если нужно:
  const switcher = document.getElementById('languageSwitcher');
  const switcherMobile = document.getElementById('languageSwitcherMobile');

  [switcher, switcherMobile].forEach(sw => {
    if (!sw) return;
    sw.addEventListener('change', () => {
      const lang = sw.value;
      renderPricing(lang);
    });
  });
});

// убираем lazy loading

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.querySelectorAll('#champions img[loading="lazy"]')
      .forEach(img => {
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
      });
  }
});
