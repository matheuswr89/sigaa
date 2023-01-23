import { HTMLElement } from "node-html-parser";

export const atestadoMatricula = (html: HTMLElement) => {
  const array = {
    tipo: "atestado",
    emissao: html
      .querySelector("div#relatorio-cabecalho > div#texto > span")
      ?.textContent.trim(),
    identificacao: <any>[],
    turmas: <any>[],
    atencao: html
      .querySelector("div#autenticacao > p")
      ?.textContent.trim()
      .replace(/\r/g, "")
      .replace(/\t/g, ""),
  };
  const idents = html.querySelectorAll("table#identificacao  tr");
  const tur = html.querySelectorAll("table#matriculas > tbody > tr");
  tur.map((td: any) => {
    const teste = td.querySelectorAll('td[valign="top"] span');
    let string = "";
    for (let tes of teste) {
      string +=
        "\n" +
        tes.textContent.trim().split("\t").join("").split("\n").join(" ");
    }
    array.turmas.push({
      cod: td.querySelector("td.codigo").textContent.trim(),
      disciplina: string,
      turma: td.querySelector("td.turma").textContent.trim(),
      status: td.querySelector("td.status").textContent.trim(),
      horario: td.querySelector("td.horario").textContent.trim(),
    });
  });
  idents.map((td: any) => {
    array.identificacao.push(
      td.querySelector("td").textContent.trim().split("\n").join("")
    );
    array.identificacao.push(
      td.querySelector("td > strong").textContent.trim()
    );
  });
  return array;
};
