const COLOR_CHANGE_TIME = 1000;
let timerId = null;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);
// за замовчуванням на початку  кнопка стоп не активна
stopBtn.disabled = true;


//рандомна зміна кольору за 1 с.
function onStartBtn() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_CHANGE_TIME);

  startBtn.disabled = true;
  stopBtn.disabled = false;

}

// функція stop рандомного переключання кольору
function onStopBtn() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// Для генерування випадкового кольору функція getRandomHexColor.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
