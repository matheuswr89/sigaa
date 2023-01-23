import { HTMLElement } from "node-html-parser";

export const getAllturmas = (html: HTMLElement) => {
  const nameForm = html.querySelector("form")?.id;
  const javax = html.querySelector("input[id='javax.faces.ViewState']")
    ?.attributes.value;
  const table = html.querySelectorAll("form > table > tbody > tr");
  const allAnos = [];
  let kal = 0;
  for (let i = 0; i < table.length; i++) {
    if (table[i].childNodes.length === 3) {
      allAnos.push({
        nameForm,
        javax,
        periodo: table[i].querySelector("td")?.textContent.trim(),
        turmasPorPeriodo: <any>[],
      });
      kal++;
    } else if (table[i].childNodes.length === 13) {
      const disciplina: any = table[i].childNodes[1]?.textContent.trim();
      const link: any = String(table[i]?.childNodes[11]?.toString());
      allAnos[kal - 1].turmasPorPeriodo.push({
        disciplina,
        json: JSON.parse(
          link
            .substring(link.indexOf("'),{'") + 3, link.indexOf("'},'');}") + 2)
            .replace(/'/g, '"')
        ),
      });
    }
  }

  return allAnos;
};
