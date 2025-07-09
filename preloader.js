document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const knight = preloader.querySelector('.preloader-knight');
  const text = preloader.querySelector('p');
  const hasSeenPreloader = localStorage.getItem('preloaderShown');

  function adaptPreloader() {
    const w = window.innerWidth;

    if (w <= 480) {
      knight.style.maxWidth = '100px';
      text.style.fontSize = '1rem';
    } else if (w <= 768) {
      knight.style.maxWidth = '120px';
      text.style.fontSize = '1.2rem';
    } else {
      knight.style.maxWidth = '200px';
      text.style.fontSize = '1.5rem';
    }
  }

  // применяем при загрузке
  adaptPreloader();

  // и при изменении размера окна
  window.addEventListener('resize', adaptPreloader);

  if (hasSeenPreloader) {
    preloader.style.display = 'none';
    document.body.style.overflow = 'auto';
  } else {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.style.overflow = 'auto';

      setTimeout(() => {
        preloader.style.display = 'none';
        localStorage.setItem('preloaderShown', 'true');
      }, 500); // после fade-out
    }, 3000); // сколько показывается прелоадер
  }
});
