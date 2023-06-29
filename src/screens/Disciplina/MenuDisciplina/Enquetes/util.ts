import { HTMLElement } from "node-html-parser";

export const parseEnquetes = (html: any) => {
  let array = {
    tipo: "enquete",
    enquetes: <any>[],
    form: "",
    "javax.faces.ViewState": "",
  };
  html.querySelectorAll("tr")?.map((lin: any) => {
    const allCollums = lin.querySelectorAll("td");
    if (allCollums[2] !== undefined) {
      const link = allCollums[5].innerHTML;
      array.enquetes.push({
        pergunta: allCollums[0].textContent,
        created_at: allCollums[2].textContent,
        prazo: allCollums[3].textContent,
        status: allCollums[4].innerHTML.includes("Encerrada")
          ? "Encerrada"
          : "Aberta",
        json: JSON.parse(
          link
            .substring(link.indexOf("'),{'") + 3, link.indexOf("'},") + 2)
            .replace(/'/g, '"')
        ),
      });
    }
  });
  return array;
};

export const parseResultEnquete = (html: HTMLElement | null) => {
  const result: any[] = [];
  html?.querySelectorAll("tr").map((lin) => {
    const allTD = lin.querySelectorAll("td");
    if (allTD[2] !== undefined) {
      result.push({
        string: `${allTD[0].textContent} - ${allTD[2].textContent} (${allTD[1].textContent} Votos)`,
      });
    }
  });
  return result;
};
