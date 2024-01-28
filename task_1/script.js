// ЗАДАНИЕ №1

const parser = new DOMParser();

const XMLObject = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`


  const xmlDOM = parser.parseFromString(XMLObject, "text/xml");
  const listNode = xmlDOM.querySelector("list");
  const studentNodes = listNode.querySelectorAll("student");

  
  const result = {
    list: Array.from(studentNodes).map(studentNode => {
      const nameNode = studentNode.querySelector("name");
      const firstNode = nameNode.querySelector("first");
      const secondNode = nameNode.querySelector("second");
      const ageNode = studentNode.querySelector("age");
      const profNode = studentNode.querySelector("prof");
      const langAttribute = nameNode.getAttribute("lang");
  
      return {
        name: `${firstNode.textContent} ${secondNode.textContent}`,
        age: Number(ageNode.textContent),
        prof: profNode.textContent,
        lang: langAttribute,
      };
    }),
  };

console.log(result);