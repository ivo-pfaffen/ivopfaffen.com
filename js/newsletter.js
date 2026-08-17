document.querySelectorAll('.newsletter__form').forEach((form) => {
    const input = form.querySelector('.newsletter__input');
    const error = form.querySelector('.newsletter__error');

    const clearError = () => {
        form.classList.remove('has-error');

        if (input) {
            input.removeAttribute('aria-invalid');
        }

        if (error) {
            error.hidden = true;
        }
    };

    if (input) {
        input.addEventListener('input', clearError);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const button = form.querySelector('.newsletter__button');

        if (!input || !input.validity.valid) {
            form.classList.add('has-error');

            if (input) {
                input.setAttribute('aria-invalid', 'true');
                input.focus({ preventScroll: true });
            }

            if (error) {
                error.textContent = input && input.validity.valueMissing
                    ? 'falta el email'
                    : 'ese email no parece válido';
                error.hidden = false;
            }

            return;
        }

        if (!button) {
            return;
        }

        clearError();
        button.classList.add('is-submitted');
        button.setAttribute('aria-label', 'Suscripción enviada');

        window.fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: input.value.trim()
            })
        }).catch(() => {});
    });
});
