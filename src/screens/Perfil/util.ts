export const parseAcademico = (html: any) => {
  let array = [];
  for (let i = 0; i < html.length; i++) {
    if (html[i].querySelectorAll("acronym")[0]?.attributes.title) {
      array.push({
        indice: html[i].querySelectorAll("acronym")[0]?.attributes.title,
        valor: html[i].querySelectorAll("td")[1]?.textContent,
      });
      array.push({
        indice: html[i].querySelectorAll("acronym")[1]?.attributes.title,
        valor: html[i].querySelectorAll("td")[3]?.textContent,
      });
    }
  }
  return array;
};

export const parseIntegral = (html: any) => {
  let array = [];
  for (let i = 0; i < html.length; i++) {
    array.push({
      name: html[i].querySelectorAll("td")[0]?.textContent.trim(),
      valor: html[i].querySelectorAll("td")[1]?.textContent.trim(),
    });
  }
  return array;
};
