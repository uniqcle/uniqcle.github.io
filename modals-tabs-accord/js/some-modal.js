const modalButtons = document.querySelectorAll('[data-modal-button]')
const modalCloseButtons = document.querySelectorAll('[data-modal-close]')
const modals = document.querySelectorAll('[data-modal]')

modalButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const modalId = this.dataset.modalButton;

        const modal = document.querySelector('#' + modalId)
        modal.classList.remove('hidden')


        modal.querySelector('.modal-window').addEventListener('click', function (e) {
            e.stopPropagation();
        });
    })
})

modalCloseButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        const currentModal = this.closest('[data-modal]')
        currentModal.classList.add('hidden')



    })
})


modals.forEach(modal => {
    modal.addEventListener('click', function (e) {
        this.classList.add('hidden')
    })
})

