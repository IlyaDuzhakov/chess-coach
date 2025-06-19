/* Основной стиль прелоадера */
.preloader {
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, #f5f8fc 0%, #e6f0fa 100%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.6s ease;
}

/* Когда прелоадер скрывается */
.preloader.hide {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

/* Анимационная сцена */
.scene {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 200px;
  overflow: hidden;
}

/* Фон пустыни */
.background {
  position: absolute;
  top: 0; left: 0;
  width: 200%;
  height: 100%;
  background: url('images/desert-bg.png') repeat-x;
  background-size: contain;
  animation: move-bg 20s linear infinite;
  z-index: 0;
}

@keyframes move-bg {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Лошадь */
.horse {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  height: 120px;
  z-index: 2;
  pointer-events: none;
}

/* Следы от копыт */
.track {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #333;
  border-radius: 50%;
  opacity: 0.6;
  animation: fadeOut 2s forwards;
}

@keyframes fadeOut {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.5); }
}

/* Текст приветствия */
.preloader-title {
  margin-top: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  color: #1f2d78;
  animation: fadeIn 1.2s ease forwards;
  opacity: 0;
  text-align: center;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Анимация вылета */
.preloader-title {
  animation: pop 1.5s ease-in-out;
}

@keyframes pop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}


