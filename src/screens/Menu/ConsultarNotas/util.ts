import { HTMLElement } from "node-html-parser";

export const parseNotasMedio = (html: HTMLElement) => {
  let notasMedio: any = [];
  if (html.querySelector("table.listagem")) {
    const table = html.querySelectorAll("table.listagem > tbody > tr");
    for (let i = 0; i < table.length; i++) {
      const link: any = table[i].querySelectorAll("td")[2].querySelector("a")
        ?.attributes.onclick;
      notasMedio.push({
        ano: table[i].querySelectorAll("td")[0].textContent,
        situacao: table[i].querySelectorAll("td")[1].textContent,
        json: JSON.parse(
          link
            .substring(link.indexOf("'),{'") + 3, link.indexOf("'},'');}") + 2)
            .replace(/'/g, '"')
        ),
      });
    }
  }
  return notasMedio;
};

export const parseNotas = (html: HTMLElement) => {
  let notas: any = [];
  if (html.querySelectorAll("table.tabelaRelatorio")) {
    html
      .querySelectorAll("table.tabelaRelatorio")
      ?.map((tabelaRelatorio: any) => {
        let tables: any = {
          ano: tabelaRelatorio.querySelector("caption").innerText.trim(),
          disciplinas: [],
        };
        tabelaRelatorio
          .querySelectorAll("tbody > tr.linha")
          ?.map((linha: any) => {
            let recuperacao = linha
              .querySelectorAll("td")[3]
              ?.textContent.trim();
            let unidade = linha.querySelectorAll("td")[2]?.textContent.trim();
            tables.disciplinas.push([
              linha.querySelectorAll("td")[1]?.textContent.trim(),
              unidade ? unidade : "--",
              recuperacao ? recuperacao : "--",
              linha.querySelectorAll("td")[4]?.textContent.trim(),
              linha.querySelectorAll("td")[6]?.textContent.trim(),
            ]);
          });
        notas.push(tables);
      });
  }
  return notas;
};
