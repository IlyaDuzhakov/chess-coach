document.getElementById('telegramForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById('form-status');

  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    comment: form.comment.value.trim()
  };

  try {
    const res = await fetch('https://telegram-form-server-rfki.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      status.textContent = 'Успешно отправлено!';
      form.reset();
    } else {
      status.textContent = 'Ошибка при отправке.';
      status.style.color = 'red';
    }
  } catch (err) {
    status.textContent = 'Ошибка соединения.';
    status.style.color = 'red';
  }
});