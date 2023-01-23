import { HTMLElement } from "node-html-parser";

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
  const tableHorarios: any = html.querySelector("table[class='formulario']");
  const script = html.getElementsByTagName("script")[4].innerHTML;
  let dadosHorarios: any = [];
  tableHorarios
    .querySelectorAll('tr[style="font-size: 9px;"]')
    .map((linha: any) => {
      const horarios = linha.querySelectorAll("td");
      for (let i = 0; i < horarios.length; i++) {
        let id = "";
        const horario = horarios[i].textContent.trim();
        i += 1;
        let segunda = "---";
        id = horarios[i].querySelector("span")?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          segunda = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length
            )
            .split("=")[1]
            .replace(/'/g, "");
        }
        i += 1;
        let terca = "---";
        id = horarios[i].querySelector("span")?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          terca = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length
            )
            .split("=")[1]
            .replace(/'/g, "");
        }
        i += 1;
        let quarta = "---";
        id = horarios[i].querySelector("span")?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          quarta = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length
            )
            .split("=")[1]
            .replace(/'/g, "");
        }
        i += 1;
        let quinta = "---";
        id = horarios[i].querySelector("span")?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          quinta = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length
            )
            .split("=")[1]
            .replace(/'/g, "");
        }
        i += 1;
        let sexta = "---";
        id = horarios[i].querySelector("span")?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          sexta = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length
            )
            .split("=")[1]
            .replace(/'/g, "");
        }
        i += 1;
        let sabado = "---";
        id = horarios[i].querySelector("span")?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          sabado = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length
            )
            .split("=")[1]
            .replace(/'/g, "");
        }
        dadosHorarios.push({
          horario,
          segunda,
          terca,
          quarta,
          quinta,
          sexta,
          sabado,
        });
      }
    });
  return dadosHorarios;
};
