import { HTMLElement } from "node-html-parser";

export const parseForumTopicos = (html: HTMLElement) => {
  let topicos: any = [];
  html
    .querySelectorAll("table.listing > tbody > tr")
    .map((linha: HTMLElement) => {
      const link = linha.querySelectorAll("td")[0].querySelector("a")
        ?.attributes.onclick;
      const linkFinal = link?.substring(
        link.indexOf("'),{'") + 3,
        link.indexOf("'},'');}") + 2
      );
      topicos.push({
        titulo: linha.querySelectorAll("td")[0].textContent.trim(),
        autor: linha.querySelectorAll("td")[1].textContent.trim(),
        respostas: linha.querySelectorAll("td")[2].textContent.trim(),
        ultimaMensagem: linha.querySelectorAll("td")[3].textContent.trim(),
        link: linkFinal,
      });
    });
  return topicos;
};
