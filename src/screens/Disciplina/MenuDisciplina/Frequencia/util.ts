import parse from "node-html-parser";

export const parseFrequencia = (html: any) => {
  const descr = html
    .querySelector("div.botoes-show")
    ?.innerHTML.replace(/<br>/g, "")
    .replace(/\t/g, "");
  const teste = parse(descr);
  let varialvel = "";
  for (let i = 0; i < teste.childNodes.length; i++) {
    if (teste.childNodes[i].textContent.trim()) {
      varialvel +=
        teste.childNodes[i].textContent.trim() +
        " " +
        teste.childNodes[i + 1]?.textContent.trim() +
        "\n\n";
      i += 1;
    }
  }
  let array = {
    tipo: "frequencia",
    descricao: html
      .querySelector("div.descricaoOperacao")
      ?.textContent.trim()
      .replace("\n\n", ""),
    descricaoFreq: varialvel,
    frequencias: <any>[],
  };
  html.querySelectorAll("span > table > tbody > tr").map((linha: any) => {
    array.frequencias.push({
      data: linha.querySelectorAll("td")[0]?.textContent.trim(),
      situacao: linha.querySelectorAll("td")[1]?.textContent.trim(),
    });
  });
  return array;
};
