document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('bonusPopup');
  const closeBtn = document.getElementById('popupClose');

  if (!popup || !closeBtn) {
    console.error('Popup elements not found!');
    return;
  }

  const popupKey = 'popupLastShown';

  const showPopup = () => {
    popup.classList.add('show');
    localStorage.setItem(popupKey, Date.now()); // записываем время показа
  };

  const lastShown = localStorage.getItem(popupKey);

  const now = Date.now();

  if (!lastShown || now - lastShown > 10 * 60 * 1000) { // больше чем 10 минут
    setTimeout(() => {
      showPopup();
    }, 25000); // 25 секунд
  }

  closeBtn.addEventListener('click', () => {
    popup.classList.remove('show');
  });
});
