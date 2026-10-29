const form = document.querySelector('#lead-form');
const note = document.querySelector('#form-note');
const toast = document.querySelector('#toast');
let toastTimer;

// Set this to the deployed Google Apps Script Web App URL after publishing it.
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwrTHltcP8YQ0rf2sDvQZXoAMCUcwC8_GHV-Eq8IiJaDHqeS5XCrQXf_k5aR5Pt5Mj7/exec';

const purchaseStage = document.querySelector('.purchase-stage');
const purchaseButton = document.querySelector('.purchase-button');
const purchaseMascots = document.querySelectorAll('dotlottie-wc.mascot');
purchaseButton?.addEventListener('click', () => {
  purchaseStage?.classList.add('celebrate');
  purchaseMascots.forEach((mascot) => mascot.dotLottie?.play());
  window.setTimeout(() => purchaseStage?.classList.remove('celebrate'), 1800);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  if (!FORM_ENDPOINT) {
    note.textContent = 'Форма пока не подключена к почтовому обработчику.';
    note.classList.remove('success');
    return;
  }

  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  note.textContent = 'Отправляем заявку…';
  note.classList.remove('success');

  try {
    const data = new FormData(form);
    data.set('consent', form.querySelector('[name="consent"]').checked ? 'yes' : '');
    const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: new URLSearchParams(data) });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || 'Не удалось отправить заявку');

    note.textContent = 'Заявка отправлена. Проверьте почту — мы пришлём информацию о курсе.';
    note.classList.add('success');
    toast.textContent = 'Заявка отправлена.';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
    form.reset();
  } catch (error) {
    note.textContent = 'Не получилось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.';
    note.classList.remove('success');
  } finally {
    submit.disabled = false;
  }
});

