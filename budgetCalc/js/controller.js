var controller = (function (budgetCtrl, uiCtrl) {


    var setupEventListeners = function () {
        var DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);
        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
    }

    // обновляем процены у каждой записи
    function updatePercentages() {
        //1. Посчитать проценты для каждой записи типа Expense
        budgetCtrl.calculatePercentages();
        //budgetCtrl.showData();

        //2. Получаем данные по процентам с модели
        let idAndPercents = budgetCtrl.getAllIdsAndPercentages();
        //console.log("🚀 ~ file: controller.js:18 ~ updatePercentages ~ idAndPercents:", idAndPercents)

        //3. Обновить UI с новыми процентами
        uiCtrl.updatePercentages(idAndPercents);
    }

    function ctrlAddItem(e) {
        e.preventDefault();

        // 1. Получить данные из формы
        var input = uiCtrl.getInput();
        //console.log('', input)

        if (input.inputDescription !== '' && !isNaN(input.inputValue) && input.inputValue > 0) {
            //2. Добавить полученные данные в модель
            let newItem = budgetCtrl.addItem(input.inputType, input.inputDescription, input.inputValue);
            //budgetCtrl.showData();

            //3. Добавить "запись" в UI
            uiCtrl.renderListItem(newItem, input.inputType);
            uiCtrl.clearFields();
            testModule.init();

            //4. Подсчитать бюджет
            updateBudget();

            //5. Пересчитали проценыт
            updatePercentages();
        }

    }

    function ctrlDeleteItem(e) {
        let selectedID, splitID;

        if (e.target.closest('.item__remove')) {

            // Находим ID кот. нужно удалить
            selectedID = e.target.closest('li.budget-list__item').id
            splitID = selectedID.split('-');
            //console.log("🚀 ~ file: controller.js:40 ~ ctrlDeleteItem ~ selectedID:", selectedID)

            type = splitID[0];
            id = parseInt(splitID[1]);

            // Удаляем запись из модели
            budgetCtrl.deleteItem(type, id);

            // Удаляем запись из шаблона
            uiCtrl.deleteListItem(selectedID);

            updateBudget();

            // Пересчитали проценыт
            updatePercentages();

        }
    }


    function updateBudget() {
        //1. Рассчитать бюджет в модели
        budgetCtrl.calculateBudget();

        //2. Получить расчитанный бюджет из модели
        const totalBudget = budgetCtrl.getTotalBudget();

        //3. Отобразить бюджет в шаблоне
        uiCtrl.updateTotalBudget(totalBudget);
    }


    return {
        init: function () {
            console.log('App started!');
            uiCtrl.displayMonth();
            setupEventListeners();

            uiCtrl.updateTotalBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percent: 0
            });
        }
    }

})(modelController, viewController);

controller.init(); 