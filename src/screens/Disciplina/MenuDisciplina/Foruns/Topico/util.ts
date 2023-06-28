import { HTMLElement } from "node-html-parser";

export const messageParse = (html: HTMLElement) => {
  return {
    tipo: "text",
    content: html
      .querySelector("td.conteudoMensagemForum")
      ?.innerHTML.trim()
      .replace(/style="([^"]*)"|<br>/gm, ""),
  };
};

export const parseComments = (html: HTMLElement[]) => {
  const array: any = [];
  html.map((comment: HTMLElement) => {
    const linhas = comment.querySelectorAll("tr");

    array.push({
      index: linhas[0].textContent.trim().replace(/\t/g, "").replace(/\n/g, ""),
      contents: linhas[1]?.innerHTML
        .trim()
        .replace(/style="([^"]*)"|<br>/gm, ""),
    });
  });
  return array;
};
