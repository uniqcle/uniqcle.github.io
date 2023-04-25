const addForm = document.querySelector('#addForm');
let itemsList = document.querySelector('#items');
let filter = document.querySelector('#filter')

addForm.addEventListener('submit', addItem)
/// Удаление задачи
itemsList.addEventListener('click', removeItem);
//Фильтр
filter.addEventListener('keyup', filterItems)


/// Добавление задачи
function addItem(e) {
    e.preventDefault();

    let newItemInput = document.querySelector('#newItemText');
    let newItemText = newItemInput.value;

    let newLi = document.createElement('li');
    newLi.classList.add('list-group-item')
    let textNode = document.createTextNode(newItemText)
    newLi.appendChild(textNode);

    let deleteBtn = document.createElement('button')
    deleteBtn.className = "btn btn-light btn-sm float-right";
    let textBtnNode = document.createTextNode('Удалить')
    deleteBtn.appendChild(textBtnNode)
    deleteBtn.setAttribute('data-action', "delete")
    deleteBtn.type = "button"

    newLi.insertAdjacentElement('beforeend', deleteBtn)

    itemsList.insertAdjacentElement('afterbegin', newLi)
    newItemInput.value = '';
}


function removeItem(e) {
    if (e.target.hasAttribute('data-action')
        && e.target.getAttribute('data-action') === 'delete') {

        if (confirm('Вы уверены удалить задачу?')) {
            e.target.parentNode.remove();
        }
    }
}


function filterItems(e) {
    let searchedText = e.target.value.toLowerCase();

    let items = itemsList.querySelectorAll('li')

    items.forEach(function (item) {
        let itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(searchedText) != -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none"
        }
    })

}