
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const hasSeenPreloader = localStorage.getItem('preloaderShown');

  if (hasSeenPreloader) {
    preloader.style.display = 'none';
    document.body.style.overflow = 'auto'; // сразу вернём прокрутку
  } else {
    // Показываем и анимируем прелоадер
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.style.overflow = 'auto'; // вернуть прокрутку

      // Запускаем "следы"
      const scene = document.querySelector('.scene');
      if (!scene) return;

      let step = 0;
      const interval = setInterval(() => {
        const track = document.createElement('div');
        track.classList.add('track');

        track.style.left = `${100 + step * 25}px`;
        track.style.top = step % 2 === 0 ? '110px' : '120px';

        scene.appendChild(track);

        setTimeout(() => {
          track.remove();
        }, 6000);

        step++;
      }, 250);

      // Убираем прелоадер полностью
      setTimeout(() => {
        preloader.style.display = 'none';
        localStorage.setItem('preloaderShown', 'true');
        clearInterval(interval); // остановим следы, если нужно
      }, 500); // когда fade-out закончился

    }, 1500); // сколько показывается прелоадер
  }
});
