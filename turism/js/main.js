customSelect('select');

/* datepicker */

const picker = new easepick.create({
    element: "#when",
    css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"
    ],
    zIndex: 10,
    lang: "ru-RU",
    grid: 2,
    format: 'DD.MM.YY',
    calendars: 2,
    plugins: [
        "RangePlugin",
        "TimePlugin"
    ]
});

// Subscribe label 

const inputSubscribe = document.querySelector('.subscribe__input');
const label = document.querySelector('.subscribe__label');

inputSubscribe.addEventListener('input', () => {
    if (!inputSubscribe.value.trim()) {
        label.classList.add('subscribe__label--top')
    } else {
        label.classList.remove('subscribe__label--top');
    }
})



