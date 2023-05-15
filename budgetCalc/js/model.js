var modelController = (function () {
    var Income = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.val = value;
    }

    var Expence = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.val = value;
        this.percentage = -1;
    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percent: -1
    }


    Expence.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.val / totalIncome) * 100)
        } else {
            this.percentage = -1;
        }
    }


    Expence.prototype.getPercentage = function () {
        return this.percentage;
    }


    function addItem(type, desc, value) {
        let newItem;
        let id;

        // генерация уникального id
        if (data.allItems[type].length > 0) {
            id = data.allItems[type].length + 1;
        } else {
            id = 1;
        }


        // определяем доход.расход
        if (type === 'inc') {
            newItem = new Income(id, desc, parseFloat(value))
        } else if (type === 'exp') {
            newItem = new Expence(id, desc, parseFloat(value))
        }

        // записываем запись в структуру дан
        data.allItems[type].push(newItem);

        return newItem;
    }

    function deleteItem(type, id) {

        // Находим индекс записи
        let currentIndex = data.allItems[type].findIndex(item => {
            return item.id === id
        })

        // удалить найденную запись по индексу
        if (currentIndex !== -1) data.allItems[type].splice(currentIndex, 1)

    }


    function calculateTotalSum(type) {
        var sum = 0;

        data.allItems[type].forEach(function (item) {
            sum = sum + item.val;
        });

        return sum;
    }

    function calculateBudget() {
        // посчитать все доходы
        data.totals.inc = calculateTotalSum('inc');
        data.totals.exp = calculateTotalSum('exp');

        // подсчитать общий бюджет
        data.budget = data.totals.inc - data.totals.exp;


        // подсчитать % для расходов
        if (data.totals.inc > 0) {
            data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percent = -1;
        }

    }


    function getTotalBudget() {
        return {
            budget: data.budget,
            totalIncome: data.totals.inc,
            totalExpenses: data.totals.exp,
            percent: data.percent
        }
    }

    function calculatePercentages() {
        data.allItems.exp.forEach(function (item) {
            item.calcPercentage(data.totals.inc)
        })
    }

    function getAllIdsAndPercentages() {

        return data.allItems.exp.map(function (item) {
            return [item.id, item.getPercentage()]
        })
    }


    return {
        addItem,
        deleteItem,
        calculateBudget,
        getTotalBudget,
        calculatePercentages,
        getAllIdsAndPercentages,
        showData: function () {
            console.log(data)
        }
    }


})()