export function initForms() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const wrapper = form.parentElement;
    const success = wrapper?.querySelector('[data-form-success]');
    const error = wrapper?.querySelector('[data-form-error]');
    const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
    const data = new FormData(form);
    const initialLabel = submit?.textContent || 'napisz do mnie';

    success?.classList.remove('is-visible');
    error?.classList.remove('is-visible');
    if (submit) {
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      submit.textContent = 'wysyłanie...';
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      });

      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);

      form.reset();
      success?.classList.add('is-visible');
    } catch (requestError) {
      console.error('Contact form submission failed', requestError);
      error?.classList.add('is-visible');
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
        submit.textContent = initialLabel;
      }
    }
  }));
}
