import { HTMLElement } from 'node-html-parser';

export const parseGrupo = (html: HTMLElement | null) => {
  let array: any = {};

  if (html) {
    const rows = Array.from(
      html.querySelectorAll('table.formAva > tbody > tr'),
    );

    array = {
      tipo: 'grupo',
      titulo: rows[0]?.textContent.trim().replace(/\t|\n/g, ''),
      num: rows[1]?.textContent.trim().replace(/\t|\n/g, ''),
      alunos: [],
    };

    const participantRows = Array.from(
      html.querySelectorAll('table.participantes tr'),
    );

    participantRows.forEach((linha: any) => {
      const coluna = Array.from(linha.querySelectorAll("td[valign='top']"));
      coluna.forEach((aluno: any) => {
        array.alunos.push({
          descricao: aluno?.textContent.trim().replace(/\r|\t/g, ''),
        });
      });
    });
  }

  return array;
};
