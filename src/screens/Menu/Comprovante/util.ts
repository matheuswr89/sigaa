import { HTMLElement } from "node-html-parser";
import { verifyIfExist } from "../Atestado/util";

export const parseUserDados = (html: HTMLElement) => {
  let tableDados: any;
  const dadosUser: any = [];
  if (html.querySelector("table[class='visualizacao bg-claro']")) {
    tableDados = html.querySelector("table[class='visualizacao bg-claro']");
    tableDados.querySelectorAll("tr").map((dados: any) => {
      const value = dados.querySelector("th").textContent.trim();
      const text = dados
        .querySelector("td[style='text-align: left;']")
        .textContent.trim();
      dadosUser.push(value + " " + text);
    });
  }
  return dadosUser;
};

export const parseComprovante = (html: HTMLElement) => {
  let tableDisciplinas: any;
  const dadosDisciplines: any = [];
  if (
    html.querySelector("table[class='listagem']") &&
    html.querySelector("table[class='formulario']")
  ) {
    tableDisciplinas = html.querySelector("table[class='listagem']");

    tableDisciplinas.querySelectorAll("tbody > tr").map((disci: any) => {
      const disicplinas = disci.querySelectorAll("td");
      for (let i = 0; i < disicplinas.length; i++) {
        const disciplina = disicplinas[i].textContent.trim();
        i += 1;
        const turma = disicplinas[i].textContent.trim();
        i += 1;
        const local = disicplinas[i].textContent.trim();
        i += 1;
        const stiuacao = disicplinas[i].textContent.trim();
        dadosDisciplines.push({
          disciplina,
          turma,
          local,
          stiuacao,
        });
      }
    });
  }
  return dadosDisciplines;
};

export const parseTableHorarios = (html: HTMLElement) => {
  const script = html.getElementsByTagName("script")[4].innerHTML.trim();
  const arrayScript = script.split("var elem = document.getElementById('");
  let arrayValoresHorarios: any[] = [];
  arrayScript.shift();
  for (let i of arrayScript) {
    arrayValoresHorarios.push({
      key: i.substring(0, i.indexOf("');")),
      valor: i.substring(i.indexOf("= '") + 3, i.indexOf("';")),
    });
  }

  let dadosHorarios: any = [];
  const hor = html.querySelectorAll("table.formulario > tbody > tr");
  hor.map((td: any) => {
    let arrayTD: any = [];
    td.querySelectorAll('td[align="center"]').map((contentTD: any) => {
      const pos = verifyIfExist(
        arrayValoresHorarios,
        contentTD.querySelector("span")?.attributes.id
      );
      if (pos !== -1) arrayTD.push(arrayValoresHorarios[pos].valor);
      else arrayTD.push(contentTD.textContent.trim());
    });
    dadosHorarios.push(arrayTD);
  });

  return dadosHorarios;
};
