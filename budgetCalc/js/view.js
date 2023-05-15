var viewController = (function () {

    var DOMstrings = {
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expensesLabel: "#expenses-label",
        expensesPercentLabel: "#expenses-percent-label",

        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form',
        incomeContainer: '#income__list',
        expenseContainer: '#expenses__list',

        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'
    }

    function getInput() {
        return {
            inputType: document.querySelector(DOMstrings.inputType).value,
            inputDescription: document.querySelector(DOMstrings.inputDescription).value,
            inputValue: document.querySelector(DOMstrings.inputValue).value
        }
    }


    function renderListItem(item, type) {
        let html, newHtml, containerElement;

        if (type === 'inc') {
            containerElement = DOMstrings.incomeContainer;

            html = `
                    <li id="inc-%id%" class="budget-list__item item item--income">
                    <div class="item__title">%description%</div>
                    <div class="item__right">
                        <div class="item__amount"> %value%</div>
                        <button class="item__remove">
                            <img
                                src="./img/circle-green.svg"
                                alt="delete"
                            />
                        </button>
                    </div>
                </li>`;

        } else {
            containerElement = DOMstrings.expenseContainer;

            html = `
            <li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                 %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`;
        }

        newHtml = html.replace('%id%', item.id);
        newHtml = newHtml.replace('%description%', item.desc);
        newHtml = newHtml.replace('%value%', formatNumber(item.val, type))

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', newHtml)
    }

    function clearFields() {
        var inputDesc, inputVal;

        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = "";
        inputDesc.focus();

        inputVal.value = "";

    }

    function deleteListItem(deletedItemID) {
        document.querySelector(`#${deletedItemID}`).remove();
    }

    function updateTotalBudget(totalBudget) {
        var type;

        if (totalBudget.budget > 0) {
            type = 'inc'
        } else {
            type = 'exp'
        }

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(totalBudget.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(totalBudget.totalIncome, 'inc');
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(totalBudget.totalExpenses, 'exp');

        if (totalBudget.percent > 0) {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = totalBudget.expensesPercentLabel;
        } else {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = '--'
        }


    }

    function updatePercentages(items) {

        items.forEach(function (item) {

            let elem = document.querySelector(`#exp-${item[0]}`).querySelector('.item__percent')

            if (item[1] >= 0) {
                elem.textContent = item[1] + "%";
                elem.parentElement.style.display = 'block';

            } else {
                elem.parentElement.style.display = 'none';
            }

        });
    }


    function formatNumber(num, type) {
        var numSplit, int, dec, newInt, resultNumber;

        /*
        - или - перед числом в зависимости от типа
        два знакао после точки, десятые и сотые
        50 => 50.00
        87.5649874132 => 87.56
        */
        // Убираем знак минус у отрицательных чисел
        num = Math.abs(num); // Math.abs(-10) = 10
        // Приводим к 2-м цифрам после точки
        num = num.toFixed(2); // (2.45678).toFixed(2) = 2.46      (2).toFixed(2) = 2.00

        /*
        123000 => 123,000.00
        123,456,789 => 123,456,789.00
        12,345
        */

        numSplit = num.split("."); // 45.78 => [45, 78]
        // Целая часть
        int = numSplit[0]; // 45
        // Десятые, от исходной строки
        dec = numSplit[1]; // 78

        // Расставляем запятые
        // Исходя из длинны числа делим его на части по 3 цифры
        // Начиная с правой стороны проставляем запятые после каждого третьего числа
        // 123456789 => 123,456,789
        // Если длинна номера больше чем 3 цифры значит надо ставить запятые
        if (int.length > 3) {
            newInt = "";

            //123456789
            //console.log("formatNumber -> int.length", int.length)

            for (var i = 0; i < int.length / 3; i++) {


                // Формирую новую строку с номером
                newInt =
                    // Добавляю запятую каждые 3 числа
                    "," +
                    // Вырезанный кусок из исходной строки
                    int.substring(int.length - 3 * (i + 1), int.length - 3 * i) +
                    // Конец строки, правая часть
                    newInt;

            }
            //console.log("formatNumber -> newInt", newInt)

            // Убираем запятую в начале, если она есть
            if (newInt[0] === ",") {
                newInt = newInt.substring(1);
            }



            // Если исходное число равно нулю, то в новую строку записываем ноль.
        } else if (int === "0") {
            newInt = "0";
            // Если исходное целое число имеет 3 и менее символов
        } else {
            newInt = int;
        }

        resultNumber = newInt + "." + dec;

        if (type === "exp") {
            resultNumber = "- " + resultNumber;
        } else if (type === "inc") {
            resultNumber = "+ " + resultNumber;
        }

        return resultNumber;
    }


    function displayMonth() {
        let now, year, month, monthArr;


        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        console.log(year);
        console.log(month)

        monthArr = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        month = monthArr[month];

        document.querySelector(DOMstrings.monthLabel).innerText = month;
        document.querySelector(DOMstrings.yearLabel).innerText = year;

    }


    return {
        getInput: getInput,
        renderListItem: renderListItem,
        clearFields: clearFields,
        deleteListItem: deleteListItem,
        updateTotalBudget: updateTotalBudget,
        updatePercentages: updatePercentages,
        displayMonth: displayMonth,
        getDomStrings: function () {
            return DOMstrings;
        }
    }

})()