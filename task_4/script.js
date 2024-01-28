
function submitForm() {
  let number1 = document.getElementById('widthInput').value;
  let number2 = document.getElementById('heightInput').value;

  // Проверяем, являются ли введенные значения числами
  if (isNaN(number1) || isNaN(number2)) {
      document.getElementById('result').innerText = 'Одно из чисел не является числом';
      return;
  }

  // Проверяем, попадают ли числа в диапазон от 100 до 300
  if ((number1 < 100 || number1 > 300) || (number2 < 100 || number2 > 300)) {
      document.getElementById('result').innerText = 'Одно из чисел вне диапазона от 100 до 300';
      return;
  }

  // Если числа в диапазоне, делаем запрос с использованием fetch
  var imageUrl = `https://dummyimage.com/${number1}x${number2}/`;
  
  fetch(imageUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Ошибка HTTP: ${response.status}`);
          }
          return response.blob();
      })
      .then(blob => {
          // В данном примере просто выводим ссылку на изображение
          document.getElementById('imageContainer').innerHTML = `<img src="${URL.createObjectURL(blob)}">`;
      })
      .catch(error => {
          console.error('Ошибка fetch:', error);
          document.getElementById('imageContainer').innerText = 'Ошибка при загрузке изображения';
      });
}