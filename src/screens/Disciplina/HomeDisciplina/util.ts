import parse, { HTMLElement, Node } from "node-html-parser";

export const noticiaParse = (html: HTMLElement) => {
  const array: any = [];
  if (html) {
    html
      .querySelector("div.descricaoOperacao")
      ?.childNodes.map((child: Node) => {
        child.childNodes.map((child2: Node) => {
          if (child2.toString().includes('<a href="')) {
            const link = parse(child2.toString()).querySelector("a")?.attributes
              .href;
            array.push({
              tipo: "link",
              content: child2.textContent
                .trim()
                .replace(/\r/g, "")
                .replace(/&nbsp;/g, ""),
              link,
            });
          } else if (
            child2.innerText.length > 1 &&
            child2.innerText != "&nbsp;"
          ) {
            array.push({
              tipo: "text",
              content: child2.innerText
                .trim()
                .replace(/\n/g, "\t\t\t\t")
                .replace(/&nbsp;/g, ""),
            });
          } else if (
            child2.toString().includes('<img src="/shared/verImagem?') ||
            child2.toString().includes('<img src="data:image/')
          ) {
            const link = parse(child2.toString()).querySelector("img")
              ?.attributes.src;
            array.push({
              tipo: "image",
              content: link?.includes("https://")
                ? link
                : "https://sig.ifsudestemg.edu.br" + link,
            });
          }
        });
      });
  }
  return array;
};

export const parseHomeDisciplina = (html: HTMLElement) => {
  let homeDisci: any = [];
  let ind = 0;
  html.querySelectorAll("div.titulo").map((el: any) => {
    homeDisci.push({
      titulo: el.textContent.trim(),
      content: [],
    });
  });
  if (homeDisci.length === 0)
    homeDisci.push({
      titulo: "O professor ainda não postou nada!",
      content: [],
    });
  html.querySelectorAll("div[class*='dotopico']").map((el: any) => {
    el.childNodes.map((ele: any) => {
      if (!ele?.textContent.trim().includes("var elt")) {
        let tipo = "";
        let link = "";
        let name = "";
        if (
          String(ele.innerHTML).includes('<img src="/shared/verImagem?') ||
          String(ele.innerHTML).includes('<img src="data:image/')
        ) {
          if (ele.childNodes.length === 1) {
            tipo = "img";
            link = ele?.childNodes[0]?.attributes.src?.includes("https://")
              ? ele?.childNodes[0]?.attributes.src
              : "https://sig.ifsudestemg.edu.br" +
                ele?.childNodes[0]?.attributes.src;
            name = "imagem";
            homeDisci[ind].content.push({
              name,
              tipo,
              link,
            });
          } else {
            for (
              let i = 0;
              i < ele?.childNodes[0]?.childNodes[2]?.childNodes.length;
              i++
            ) {
              if (
                ele?.childNodes[0]?.childNodes[2]?.childNodes[i]?.attributes
                  ?.src !== undefined
              ) {
                tipo = "img";
                link = ele?.childNodes[0]?.childNodes[2]?.childNodes[
                  i
                ]?.attributes?.src?.includes("https://")
                  ? ele?.childNodes[0]?.childNodes[2]?.childNodes[i]?.attributes
                      ?.src
                  : "https://sig.ifsudestemg.edu.br" +
                    ele?.childNodes[0]?.childNodes[2]?.childNodes[i]?.attributes
                      ?.src;
                name = "imagem";
                homeDisci[ind].content.push({
                  name,
                  tipo,
                  link,
                });
              }
            }
          }
        } else if (String(ele.innerHTML).includes("iframe")) {
          name = ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
            .replace(/\n/g, "")
            .split("function")[0];
          tipo = "iframe";
          link = ele.getElementsByTagName("iframe")[0].attributes.src;
        } else if (
          String(ele.innerHTML).includes("href") &&
          ele.querySelector("a[target='_blank']") !== undefined &&
          ele.getElementsByTagName("a")[0].attributes.href !== "#"
        ) {
          tipo = "link";
          link = ele.getElementsByTagName("a")[0].attributes.href;
          name = ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
            .replace(/\n/g, "");
        } else if (
          String(ele.innerHTML).includes("href") &&
          ele.querySelector('a[id$="idEnviarMaterialTarefa"]')
        ) {
          tipo = "atividade";
          const onclick = ele.getElementsByTagName("a")[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'');}") + 2
          );
          name = ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
            .replace(/\n/g, "");
        } else if (
          String(ele.innerHTML).includes("href") &&
          ele.querySelector('a[id$="idMostrarForum"]')
        ) {
          tipo = "forum";
          const onclick = ele.getElementsByTagName("a")[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'');}") + 2
          );
          name = ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
            .replace(/\n/g, "");
        } else if (
          String(ele.innerHTML).includes("href") &&
          ele.querySelector('a[id$="idMostrarEnquete"]')
        ) {
          tipo = "enquete";
          const onclick = ele.getElementsByTagName("a")[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'');}") + 2
          );
          name = ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
            .replace(/\n/g, "");
        } else if (
          String(ele.innerHTML).includes(
            '<a href="#" onclick="if(typeof jsfcljs'
          )
        ) {
          tipo = "arquivo";
          const onclick = ele.getElementsByTagName("a")[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'_blank'") + 2
          );
          name = ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
            .replace(/\n/g, "");
        } else if (
          ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
        ) {
          name = ele?.textContent
            .trim()
            .split("new DnD")[0]
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, "")
            .replace(/\n/g, "");
        }
        if (name !== "" && tipo !== "img")
          homeDisci[ind].content.push({
            name,
            tipo,
            link,
          });
      }
    });
    ind++;
  });
  return homeDisci;
};
