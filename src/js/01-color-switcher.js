const BG_CHANGE_FREQUENCY = 1000;
let timerId = null;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);
startBtn.classList.add('btnStart-color');
stopBtn.classList.add('btnStop-color');
// за замовчуванням на початку  кнопка стоп не активна
stopBtn.disabled = true;


//рандомна зміна кольору за 1 с.
function onStartBtn() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, BG_CHANGE_FREQUENCY);

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
