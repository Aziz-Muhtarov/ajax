// ЗАДАНИЕ №1

// const parser = new DOMParser();

// const XMLObject = `
// <list>
//   <student>
//     <name lang="en">
//       <first>Ivan</first>
//       <second>Ivanov</second>
//     </name>
//     <age>35</age>
//     <prof>teacher</prof>
//   </student>
//   <student>
//     <name lang="ru">
//       <first>Петр</first>
//       <second>Петров</second>
//     </name>
//     <age>58</age>
//     <prof>driver</prof>
//   </student>
// </list>`


// const xmlDOM = parser.parseFromString(XMLObject, "text/xml");

// // console.log(xmlDOM);


// const listNode = xmlDOM.querySelector("list");
// const studentNode = listNode.querySelector("student");
// const nameNode = studentNode.querySelector("name");
// const firstNode = nameNode.querySelector("first");
// const secondNode = nameNode.querySelector("second");
// const ageNode = studentNode.querySelector("age");
// const profNode = studentNode.querySelector("prof");


// console.log('listNode', listNode);
// console.log('studentNode', studentNode);
// console.log('nameNode', nameNode);
// console.log('firstNode', firstNode);
// console.log('secondNode', secondNode);
// console.log('ageNode', ageNode);
// console.log('profNode', profNode);

// {
//     list: [
//       { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
//       { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
//     ]
//   }


// ЗАДАНИЕ №2


// const jsonString = 
// `{
//     "list": [
//      {
//       "name": "Petr",
//       "age": "20",
//       "prof": "mechanic"
//      },
//      {
//       "name": "Vova",
//       "age": "60",
//       "prof": "pilot"
//      }
//     ]
// }`

// // console.log('jsonString', jsonString);

// const data = JSON.parse(jsonString);
// console.log('data', data);

// const list = data.list;
// console.log('list', list);




// Ожидаемый вывод

// {
//     list: [
//       { name: 'Petr', age: 20, prof: 'mechanic' },
//       { name: 'Vova', age: 60, prof: 'pilot' },
//     ]
//   }



// ЗАДАНИЕ №3


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

// let value = document.querySelector('.input').value;
// let button = document.querySelector('.button');
// let reqUrl = "https://jsonplaceholder.typicode.com/photos?_limit=5";
// let images = document.getElementById(imageContainer);

// function useRequest(async) {

//         const inputElement = document.querySelector('.input');
//         const inputValue = inputElement.value;

//         // Проверка на вхождение числа в диапазон от 1 до 10
//         if (inputValue < 1 || inputValue > 10) {
//             alert('Число вне диапазона от 1 до 10');
//             return;
//         } 

//         // Формирование URL с использованием введенного числа
//         const apiUrl = `https://jsonplaceholder.typicode.com/photos?_limit=${inputValue}`;

//         // Создание объекта XMLHttpRequest
//         let xhr = new XMLHttpRequest();

//         // Настройка запроса
//         xhr.open('GET', apiUrl, true);

//         // Обработка события завершения запроса
//         xhr.onload = function () {
//             if (xhr.status === 200) {
//                 const images = JSON.parse(xhr.responseText);
//                 displayImages(images);
//             } else {
//                 alert('Ошибка при загрузке изображений');
//             }
//         };

//         // Отправка запроса
//         xhr.send();
// }


// function displayImages(images) {
//     const imageContainer = document.getElementById('imageContainer');
//     imageContainer.innerHTML = '';

//     // Вывод изображений на экран
//     images.forEach(image => {
//         const imgElement = document.createElement('img');
//         imgElement.src = image.url;
//         imgElement.alt = image.title;
//         imageContainer.appendChild(imgElement);
//     });
// }


// ЗАДАНИЕ №4

function makeRequest() {
    // Получаем значения из input
    const pageNumber = parseInt(document.getElementById('pageNum').value);
    const limit = parseInt(document.getElementById('limit').value);

    // Проверяем, что введены числа и они в диапазоне от 1 до 10
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 10 || isNaN(limit) || limit < 1 || limit > 10) {
      document.getElementById('imageContainer').innerHTML = "Номер страницы и/или лимит вне диапазона от 1 до 10";
      return;
    }

    // Формируем URL для запроса
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`;

    // Выполняем запрос
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Сохраняем результат в localStorage
        localStorage.setItem('lastRequestData', JSON.stringify(data));

        // Отображаем картинки на странице
        displayImages(data);
      })
      .catch(error => console.error('Error:', error));
  }

  // Функция для отображения картинок на странице
  function displayImages(data) {
    const resultDiv = document.getElementById('imageContainer');
    resultDiv.innerHTML = ''; // Очищаем предыдущий результат

    data.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.url;
      resultDiv.appendChild(img);
    });
  }

  // При загрузке страницы проверяем наличие предыдущих результатов в localStorage
  document.addEventListener('DOMContentLoaded', () => {
    const lastRequestData = localStorage.getItem('lastRequestData');
    if (lastRequestData) {
      const data = JSON.parse(lastRequestData);
      displayImages(data);
    }
  });