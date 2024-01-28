
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