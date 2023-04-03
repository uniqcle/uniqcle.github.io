const tabsHeaders = document.querySelectorAll('[data-tab]')
const contentBoxs = document.querySelectorAll('[data-tab-content]')

tabsHeaders.forEach((tabHeader) => {
    tabHeader.addEventListener('click', function () {
        // console.log(this.dataset.tab)
        const contentBox = document.querySelector('#' + this.dataset.tab)

        contentBoxs.forEach(item => {
            item.classList.add('hidden')
        })

        contentBox.classList.remove('hidden')
    })
})