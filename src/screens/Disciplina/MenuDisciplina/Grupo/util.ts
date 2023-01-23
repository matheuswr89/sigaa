import { HTMLElement } from "node-html-parser";

export const parseGrupo = (html: HTMLElement | null) => {
  let array: any = {};
  if (html) {
    array = {
      tipo: "grupo",
      titulo: html
        .querySelectorAll("table.formAva > tbody > tr")[0]
        .textContent.trim()
        .replace(/\t/g, "")
        .replace(/\n/g, ""),
      num: html
        .querySelectorAll("table.formAva > tbody > tr")[1]
        .textContent.trim()
        .replace(/\t/g, "")
        .replace(/\n/g, ""),
      alunos: <any>[],
    };

    html
      .querySelectorAll("table.participantes")[0]
      ?.querySelectorAll("tr")
      .map((linha: any) => {
        const coluna = linha.querySelectorAll("td[valign='top']");
        coluna.map((aluno: any) => {
          array.alunos.push({
            descricao: aluno?.textContent
              .trim()
              .replace(/\r/g, "")
              .replace(/\t/g, ""),
          });
        });
      });
  }
  return array;
};
