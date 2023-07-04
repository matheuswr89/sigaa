import { HTMLElement } from 'node-html-parser';
import { verifyIfExist } from '../Atestado/util';

export const parseUserDados = (html: HTMLElement) => {
  const dadosUser: any[] = [];
  const tableDados = html.querySelector('table.visualizacao.bg-claro');

  if (tableDados) {
    const rows = Array.from(tableDados.querySelectorAll('tr'));
    rows.forEach(dados => {
      const value = dados.querySelector('th')?.textContent.trim();
      const text = dados
        .querySelector("td[style='text-align: left;']")
        ?.textContent.trim();
      dadosUser.push(`${value} ${text}`);
    });
  }

  return dadosUser;
};

export const parseComprovante = (html: HTMLElement) => {
  const dadosDisciplines: any[] = [];
  const tableDisciplinas = html.querySelector('table.listagem');
  const tableFormulario = html.querySelector('table.formulario');

  if (tableDisciplinas && tableFormulario) {
    const rows = Array.from(tableDisciplinas.querySelectorAll('tbody > tr'));
    rows.forEach(row => {
      const cells = Array.from(row.querySelectorAll('td'));
      for (let i = 0; i < cells.length; i += 4) {
        const disciplina = cells[i].textContent.trim();
        const turma = cells[i + 1].textContent.trim();
        const local = cells[i + 2].textContent.trim();
        const situacao = cells[i + 3].textContent.trim();
        dadosDisciplines.push({
          disciplina,
          turma,
          local,
          situacao,
        });
      }
    });
  }

  return dadosDisciplines;
};

export const parseTableHorarios = (html: HTMLElement) => {
  const script = html?.getElementsByTagName('script')[4].innerHTML.trim();
  const arrayScript = script?.split("var elem = document.getElementById('");
  const arrayValoresHorarios = arrayScript?.slice(1).map(i => ({
    key: i.substring(0, i.indexOf("');")),
    valor: i.substring(i.indexOf("= '") + 3, i.indexOf("';")),
  }));

  const dadosHorarios = Array.from(
    html?.querySelectorAll('table.formulario > tbody > tr'),
  ).map((td: any) => {
    const arrayTD = Array.from(td?.querySelectorAll('td[align="center"]')).map(
      (contentTD: any) => {
        const pos = verifyIfExist(
          arrayValoresHorarios,
          contentTD.querySelector('span')?.attributes.id,
        );
        return pos !== -1
          ? arrayValoresHorarios[pos].valor
          : contentTD.textContent.trim();
      },
    );
    return arrayTD;
  });

  return dadosHorarios;
};
