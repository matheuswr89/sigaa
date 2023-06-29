export const parseAvaliacoes = (html: any) => {
  let array = {
    avaliacoes: <any>[],
  };
  html.querySelectorAll("tr")?.map((lin: any) => {
    const allCollums = lin.querySelectorAll("td");
    if (allCollums[2] !== undefined) {
      array.avaliacoes.push({
        data: allCollums[0].textContent,
        hora: allCollums[1].textContent,
        descricao: allCollums[2].textContent,
      });
    }
  });
  return array;
};
