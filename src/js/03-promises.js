import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const object = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(object);
      } else {
        reject(object);
      }
    }, delay);
  });
};

function onSubmitForm(evt) {
  evt.preventDefault();

  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(form.step.value);
  };
};

form.addEventListener('submit', onSubmitForm);