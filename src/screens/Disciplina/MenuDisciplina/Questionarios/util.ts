export const parseQuestionarios = (html: any) => {
  let array = {
    questionarios: <any>[],
  };
  html.querySelectorAll("tr")?.map((lin: any) => {
    const allCollums = lin.querySelectorAll("td");
    if (allCollums[2] !== undefined) {
      array.questionarios.push({
        titulo: allCollums[0].textContent,
        inicio: allCollums[1].textContent,
        fim: allCollums[2].textContent,
      });
    }
  });
  return array;
};
