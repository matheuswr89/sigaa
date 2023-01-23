import { HTMLElement } from "node-html-parser";

export const parseForuns = (html: HTMLElement[]) => {
  let json = {
    tipo: "foruns",
    forunsTurma: <any>[],
    forumCompartilhado: <any>[],
  };

  html[0].querySelectorAll("tbody > tr").map((linha: HTMLElement) => {
    const contents: HTMLElement[] = linha.querySelectorAll("td");
    const link = "" + contents[0].querySelector("a")?.attributes.onclick;
    const linkFinal = link?.substring(
      link.indexOf("'),{'") + 3,
      link.indexOf("'},'');}") + 2
    );
    json.forunsTurma.push({
      titulo: contents[0].querySelector("a")?.textContent.trim(),
      tipo: contents[1].textContent.trim(),
      topicos: contents[2].textContent.trim(),
      autor: contents[3].textContent.trim(),
      criacao: contents[4].textContent.trim(),
      inicio: contents[5].textContent.trim(),
      fim: contents[6].textContent.trim(),
      link: linkFinal.replace(/'/g, '"'),
    });
  });
  html[1].querySelectorAll("tbody > tr").map((linha: HTMLElement) => {
    const contents: HTMLElement[] = linha.querySelectorAll("td");
    const link = "" + contents[0].querySelector("a")?.attributes.onclick;
    const linkFinal = link?.substring(
      link.indexOf("'),{'") + 3,
      link.indexOf("'},'');}") + 2
    );
    json.forumCompartilhado.push({
      titulo: contents[0].querySelector("a")?.textContent.trim(),
      tipo: contents[1].textContent.trim(),
      topicos: contents[2].textContent.trim(),
      autor: contents[3].textContent.trim(),
      criacao: contents[4].textContent.trim(),
      link: linkFinal.replace(/'/g, '"'),
    });
  });
  return json;
};
