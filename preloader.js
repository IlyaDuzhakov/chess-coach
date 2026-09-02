document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const knight = preloader.querySelector('.preloader-knight');
  const text = preloader.querySelector('p');
  const hasSeenPreloader = localStorage.getItem('preloaderShown');

  function centerAndAdapt() {
    const w = window.innerWidth;

    if (w <= 600) {
      knight.style.maxWidth = '120px';
      text.style.fontSize = '1rem';
    } else if (w <= 1024) {
      knight.style.maxWidth = '160px';
      text.style.fontSize = '1.2rem';
    } else {
      knight.style.maxWidth = '200px';
      text.style.fontSize = '1.5rem';
    }

    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';
  }

  centerAndAdapt();
  window.addEventListener('resize', centerAndAdapt);

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
      }, 500);
    }, 3000);
  }
});
