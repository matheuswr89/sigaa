import parse, { HTMLElement } from "node-html-parser";

export const parseTarefas = (html: any) => {
  let array = {
    tipo: "tarefas",
    title1: "",
    title2: "",
    individual: <any>[],
    grupo: <any>[],
    vazio: "",
  };

  if (html.length === 0) {
    array.vazio = "Nenhuma tarefa foi encontrada!";
  } else if (html.length === 1) {
    array.individual = arrayTarefas(
      parse(html[0].innerHTML).querySelectorAll("table > tbody > tr")
    );
    array.title1 = "" + html[0].querySelector("legend")?.textContent.trim();
  } else {
    array.individual = arrayTarefas(
      parse(html[0].innerHTML).querySelectorAll("table > tbody > tr")
    );
    array.title1 = "" + html[0].querySelector("legend")?.textContent.trim();
    array.grupo = arrayTarefas(
      parse(html[1].innerHTML).querySelectorAll("table > tbody > tr")
    );
    array.title2 = "" + html[1].querySelector("legend")?.textContent.trim();
  }
  return array;
};

const arrayTarefas = (html: HTMLElement[]) => {
  let array = [];

  for (let i = 0; i < html.length; i++) {
    const descricao = html[i]
      .querySelectorAll("td")[1]
      .textContent.trim()
      .replace(/\t/g, "")
      .replace(/\r/g, "");
    const envio =
      "" +
      html[i].querySelectorAll("td")[6].querySelector("a")?.attributes.onclick;
    const envioFinal = envio.substring(
      envio.indexOf("'),{'") + 3,
      envio.indexOf("'},'')") + 2
    );
    const nota = html[i].querySelectorAll("td")[3].textContent.trim();
    const periodo = html[i]
      .querySelectorAll("td")[2]
      .textContent.trim()
      .replace(/\t/g, "")
      .replace(/\n/g, " ");
    i = i + 1;
    const descricao2 = html[i]
      .querySelectorAll("td")[0]
      .textContent.replace("Baixar arquivo", "")
      .replace(/\t/g, "")
      .replace(/\r/g, "")
      .replace(/\n/g, "");
    let baixarArquivo: string = "";
    if (html[i].querySelector("a")) {
      const allA = html[i].querySelectorAll("a");
      baixarArquivo =
        "https://sig.ifsudestemg.edu.br" +
        allA[allA.length - 1]?.attributes.href;
    }

    array.push({
      descricao,
      descricao2,
      baixarArquivo,
      nota,
      periodo,
      json: envioFinal,
    });
  }
  return array;
};
