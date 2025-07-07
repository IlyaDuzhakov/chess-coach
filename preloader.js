document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const hasSeenPreloader = localStorage.getItem('preloaderShown');

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
