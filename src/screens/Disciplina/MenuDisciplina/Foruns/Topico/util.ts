import parse, { HTMLElement, Node } from "node-html-parser";

export const messageParse = (html: HTMLElement) => {
  const array: any = [];
  html
    .querySelector("td.conteudoMensagemForum")
    ?.childNodes.map((child: Node) => {
      child.childNodes.map((child2: Node) => {
        child2.childNodes.map((child3: Node) => {
          if (child3.toString().includes('<a href="')) {
            const link = parse(child3.toString()).querySelector("a")?.attributes
              .href;
            array.push({
              tipo: "link",
              content: child3.textContent.trim().replace(/&nbsp;/g, "\n"),
              link,
            });
          } else if (
            child3.innerText.length > 1 &&
            child3.innerText != "&nbsp;"
          ) {
            array.push({
              tipo: "text",
              content: child3.textContent.trim(),
            });
          } else if (
            child3
              .toString()
              .includes('<img style="margin-left: 0px; margin-top: 0px;"') ||
            child3.toString().includes('<img src="data:image/')
          ) {
            const link = parse(child3.toString()).querySelector("img")
              ?.attributes.src;
            array.push({
              tipo: "image",
              content: link,
            });
          }
        });
      });
    });
  if (array.length === 0) {
    array.push({
      tipo: "text",
      content: html
        .querySelector("td.conteudoMensagemForum")
        ?.textContent.trim()
        .replace(/[\t\r]/g, ""),
    });
  }
  return array;
};

export const parseComments = (html: HTMLElement[]) => {
  const array: any = [];
  html.map((comment: HTMLElement) => {
    const linhas = comment.querySelectorAll("tr");
    const content: any = [];
    linhas[1].childNodes.map((child: Node) => {
      child.childNodes.map((child2: Node) => {
        if (child2.toString().includes('<a href="')) {
          const link = parse(child2.toString()).querySelector("a")?.attributes
            .href;
          content.push({
            tipo: "link",
            content: child2.textContent
              .trim()
              .replace(/\t/g, "")
              .replace(/\r/g, "")
              .replace("&nbsp;", ""),
            link,
          });
        } else if (
          child2.innerText.length > 1 &&
          child2.innerText != "&nbsp;"
        ) {
          content.push({
            tipo: "text",
            content: child2.textContent
              .trim()
              .replace(/\t/g, "")
              .replace(/\r/g, "")
              .replace("&nbsp;", ""),
          });
        } else if (
          child2
            .toString()
            .includes('<img style="margin-left: 0px; margin-top: 0px;"') ||
          child2.toString().includes('<img src="data:image/')
        ) {
          const link = parse(child2.toString()).querySelector("img")?.attributes
            .src;
          content.push({
            tipo: "image",
            content: link,
          });
        }
      });
    });
    array.push({
      index: linhas[0].textContent.trim().replace(/\t/g, "").replace(/\n/g, ""),
      contents: content,
    });
  });
  return array;
};
