import { HTMLElement } from "node-html-parser";

export const atestadoMatricula = (html: HTMLElement) => {
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
  const array = {
    tipo: "atestado",
    emissao: html
      .querySelector("div#relatorio-cabecalho > div#texto > span")
      ?.textContent.trim(),
    identificacao: <any>[],
    turmas: <any>[],
    horarios: <any>[],
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
  const hor = html.querySelectorAll("table#horario > tbody > tr");
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
    array.horarios.push(arrayTD);
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

const verifyIfExist = (array: any, id: any) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].key === id) return i;
  }
  return -1;
};
