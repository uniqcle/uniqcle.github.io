const headers = document.querySelectorAll('[data-name="accordeon-title"]')

headers.forEach(header => {
    header.addEventListener('click', function () {

        this.nextElementSibling.classList.toggle('hidden')
    })
})