import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');

// стилі для кнопки старт
startBtn.disabled = true;
startBtn.style.color = 'green';
startBtn.style.fontSize = '20px';
startBtn.style.borderRadius = '10px';
startBtn.style.width = '100px';

//стилі body
const body = document.body;
body.style.backgroundColor = 'pink';

// на кнопку старт додаємо слухача події 
startBtn.addEventListener('click', onStartBtnClick);


//об'єкт налаштувань для функції бібліотеки "flatpickr"
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //користувач обрав дату і закрив календар
  onClose(selectedDates) {
    console.log(selectedDates);
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Success');
      startBtn.disabled = false;
      timer.setTargetDate(selectedDates[0]);
    }
    console.log(selectedDates[0]);
  },
};

flatpickr('input#datetime-picker', options);

//створення класу countDownTimer
class CountDownTimer {
  constructor({ selector }) {
    this.targetDate;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minsSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secsSpan = document.querySelector(`${selector} [data-seconds]`);
  }

  //метод класу, що приймає обрану дату з календаря та додає її у властивість targetDate
  setTargetDate(targetDate) {
    this.targetDate = targetDate;
  }

  //метод класу, що генерує розмітку таймера
  updateMarkup() {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = this.targetDate - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(delta);

      this.daysSpan.textContent = this.addLeadingZero(days);
      this.hoursSpan.textContent = this.addLeadingZero(hours);
      this.minsSpan.textContent = this.addLeadingZero(minutes);
      this.secsSpan.textContent = this.addLeadingZero(seconds);

      if (delta < 1000) {
        clearInterval(intervalId);
        Notiflix.Notify.success('Countdown finished!');
        input.disabled = false;
      }
    }, 1000);
  }

  //метод, що приймає значення в мілісекундах і повертає days, hours, minutes, seconds
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  //метод класу, що додає 0, якщо в числі менше двох символів (для форматування часу)
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

//ініціалізація таймера (створення екземпляру класу countDownTimer)
const timer = new CountDownTimer({
  selector: '.timer',
 
});

//при кліку на кнопку викликаємо timer, робимо кнопку, інпут неактивними
function onStartBtnClick() {
  timer.updateMarkup();
  startBtn.disabled = true;
  input.disabled = true;
}