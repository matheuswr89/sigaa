export const parseAcademico = (html: any) => {
  const array = [];

  for (let i = 0; i < html.length; i++) {
    const acronymElements = html[i]?.querySelectorAll('acronym');
    if (acronymElements.length >= 2) {
      array.push({
        indice: acronymElements[0].getAttribute('title'),
        valor: html[i].querySelectorAll('td')[1]?.textContent,
      });
      array.push({
        indice: acronymElements[1].getAttribute('title'),
        valor: html[i].querySelectorAll('td')[3]?.textContent,
      });
    }
  }

  return array;
};

export const parseIntegral = (html: any) => {
  const array = [];

  for (let i = 0; i < html.length; i++) {
    const tdElements = html[i]?.querySelectorAll('td');
    array.push({
      name: tdElements[0]?.textContent.trim(),
      valor: tdElements[1]?.textContent.trim(),
    });
  }

  return array;
};
