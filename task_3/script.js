/** 
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://jsonplaceholder.typicode.com/photos?_limit=5, 
где get-параметр limit — это введённое число.

Пример. Если пользователь ввёл 8, то запрос будет вида: https://jsonplaceholder.typicode.com/photos?_limit=8.

После получения данных вывести ниже картинки на экран.

Подсказка 

const value = document.querySelector('input').value;
*/

let value = document.querySelector('.input').value;
let button = document.querySelector('.button');
let reqUrl = "https://jsonplaceholder.typicode.com/photos?_limit=5";
let images = document.getElementById(imageContainer);

function useRequest(async) {

        const inputElement = document.querySelector('.input');
        const inputValue = inputElement.value;

        // Проверка на вхождение числа в диапазон от 1 до 10
        if (inputValue < 1 || inputValue > 10) {
            alert('Число вне диапазона от 1 до 10');
            return;
        } 

        // Формирование URL с использованием введенного числа
        const apiUrl = `https://jsonplaceholder.typicode.com/photos?_limit=${inputValue}`;

        // Создание объекта XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Настройка запроса
        xhr.open('GET', apiUrl, true);

        // Обработка события завершения запроса
        xhr.onload = function () {
            if (xhr.status === 200) {
                const images = JSON.parse(xhr.responseText);
                displayImages(images);
            } else {
                alert('Ошибка при загрузке изображений');
            }
        };

        // Отправка запроса
        xhr.send();
}


function displayImages(images) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';

    // Вывод изображений на экран
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.title;
        imageContainer.appendChild(imgElement);
    });
}

