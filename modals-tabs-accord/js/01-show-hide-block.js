const btn = document.querySelector('#button');
const content = document.querySelector("#content");

btn.addEventListener('click', function () {

    content.classList.toggle('content-hidden');

    if (content.classList.contains('content-hidden')) {
        btn.textContent = "Открыть блок";
    } else {
        btn.textContent = "Закрыть блок";
    }

})