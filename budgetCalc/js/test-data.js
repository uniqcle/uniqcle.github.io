var testModule = (function () {


    function Example(type, desc, val) {
        this.type = type;
        this.desc = desc;
        this.val = val;
    }

    var data = [
        new Example('inc', 'мытье полов', 1000),
        new Example('inc', 'программирование', 500),
        new Example('inc', 'написание текстов', 130),
        new Example('inc', 'ремонт квартир', 5000),
        new Example('inc', 'уборка помещений', 200),
        new Example('inc', 'консультирование', 7000),
        new Example('inc', 'услуги такси', 600),
        new Example('exp', 'поездки', 400),
        new Example('exp', 'отдых', 4500),
        new Example('exp', 'плавание', 10),
        new Example('exp', 'питание', 1600),
        new Example('exp', 'кино', 5700),
        new Example('exp', 'театр', 600),
        new Example('exp', 'девушки', 800),
    ];

    function getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }



    function insertRandomItemUI() {
        randomItem = data[getRandomInt(data.length)];

        //console.log(randomItem)

        document.querySelector('#input__type').value = randomItem.type;
        document.querySelector('#input__description').value = randomItem.desc;
        document.querySelector('#input__value').value = randomItem.val;
    }

    return {
        init: insertRandomItemUI
    }

})()

testModule.init(); 