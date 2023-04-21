const mobileNavBtn = document.querySelector('.mobile-nav-btn');
const sideBar = document.querySelector('.sidebar');

mobileNavBtn.addEventListener('click', function () {
    // console.log(sideBar);
    sideBar.classList.toggle('sidebar--active');

})

/* показать еще 3 карточки */
const btnMore = document.querySelector('.btn-more');
const hiddenCards = document.querySelectorAll('.cards-link--hidden');

btnMore.addEventListener('click', function () {

    hiddenCards.forEach(card => {
        card.classList.remove('cards-link--hidden');
    })

})


/* показать/скрыть контент виджеты */
const widgetsTitle = document.querySelectorAll('.widget__title');

widgetsTitle.forEach(title => {

    title.addEventListener('click', function () {
        title.nextElementSibling.classList.toggle('none')
        title.classList.toggle('widget__title--active')
    })
})

/* сброс инпутов по кнопке любая */
const checkboxAny = document.querySelector('#location-05');
const allLocationCheckboxes = document.querySelectorAll('.location__checkbox');

checkboxAny.addEventListener('change', function () {

    if (checkboxAny.checked) {
        allLocationCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        })
        checkboxAny.checked = true;
    }
})


allLocationCheckboxes.forEach(checkbox => {
    if (checkbox !== checkboxAny) {
        checkbox.addEventListener('change', function () {
            checkboxAny.checked = false;
        })
    }
})


/* Показать еще */
const optionsShowMore = document.querySelector('.options-show-more')
const hiddenElementsWidgets = document.querySelector('.widget__elements--hidden');

optionsShowMore.addEventListener('click', function (e) {
    e.preventDefault();

    hiddenElementsWidgets.classList.remove('widget__elements--hidden')
    optionsShowMore.remove();
})
