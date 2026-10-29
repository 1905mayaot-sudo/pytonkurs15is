const form = document.querySelector('#lead-form');
const note = document.querySelector('#form-note');
const toast = document.querySelector('#toast');
let toastTimer;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  note.textContent = `Спасибо, ${name}! Заявка подготовлена. Подключите обработчик формы, чтобы получать обращения.`;
  note.classList.add('success');
  toast.textContent = 'Готово — форма работает в демо-режиме.';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
  form.reset();
});

