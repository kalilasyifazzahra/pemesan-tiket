(function () {
    const form = document.querySelector('.booking-form');

    const fields = {
        name: document.getElementById('username'),
        email: document.getElementById('email'),
        film: document.getElementById('tickets'),
        qty: document.getElementById('quantity')
    };

    const summary = {
        name: document.getElementById('s-name'),
        email: document.getElementById('s-email'),
        film: document.getElementById('s-film'),
        qty: document.getElementById('s-qty'),
        total: null
    };

    const priceInfo = document.createElement('p');
    priceInfo.id = "price-preview";
    priceInfo.className = "price-preview";
    form.appendChild(priceInfo);

    const ticketPrice = 50000;

    function updateSummary() {
        summary.name.textContent = fields.name.value || '-';
        summary.email.textContent = fields.email.value || '-';
        summary.film.textContent = fields.film.options[fields.film.selectedIndex].text;
        summary.qty.textContent = fields.qty.value || '1';
        const qty = parseInt(fields.qty.value) || 0;
        const total = qty * ticketPrice;
        priceInfo.textContent = qty > 0 ? `Total Harga: Rp ${total.toLocaleString()}` : '';
    }

    function showError(input, message) {
        let error = input.parentElement.querySelector('.error-msg');
        if (!error) {
            error = document.createElement('small');
            error.className = 'error-msg';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        input.classList.add('input-error');
    }

    function clearError(input) {
        const error = input.parentElement.querySelector('.error-msg');
        if (error) error.textContent = '';
        input.classList.remove('input-error');
    }

    function validate() {
        let isValid = true;
        if (fields.name.value.trim() === '') {
            showError(fields.name, 'Nama tidak boleh kosong.');
            isValid = false;
        } else {
            clearError(fields.name);
        }
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(fields.email.value.trim())) {
            showError(fields.email, 'Format email tidak valid.');
            isValid = false;
        } else {
            clearError(fields.email);
        }
        const qty = parseInt(fields.qty.value);
        if (isNaN(qty) || qty < 1 || qty > 10) {
            showError(fields.qty, 'Jumlah tiket minimal 1 dan maksimal 10.');
            isValid = false;
        } else {
            clearError(fields.qty);
        }
        return isValid;
    }

    Object.values(fields).forEach(el => {
        el.addEventListener('input', updateSummary);
        el.addEventListener('change', updateSummary);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        updateSummary();
        if (validate()) {
            alert('Pesanan berhasil! Total harga akan dikonfirmasi melalui email.');
            form.reset();
            updateSummary();
        }
    });

    updateSummary();
})();
