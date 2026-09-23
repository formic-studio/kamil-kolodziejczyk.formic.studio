export function initForms() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form); const recipient = form.dataset.recipient;
    if (!recipient) return;
    const subject = encodeURIComponent(`Wiadomość ze strony od ${String(data.get('name') || '')}`);
    const body = encodeURIComponent(`Imię i nazwisko: ${String(data.get('name') || '')}\nE-mail: ${String(data.get('email') || '')}\n\n${String(data.get('message') || '')}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    form.parentElement?.querySelector('[data-form-success]')?.classList.add('is-visible');
  }));
}
