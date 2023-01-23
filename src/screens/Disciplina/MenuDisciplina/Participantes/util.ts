export const parseParticipantes = (html: any) => {
  let array = {
    tipo: "participantes",
    professores: <any>[],
    alunos: <any>[],
  };
  html
    .querySelectorAll("table.participantes")[0]
    ?.querySelectorAll("tr")
    .map((linha: any) => {
      const coluna = linha.querySelectorAll("td");

      array.professores.push({
        descricao: coluna[1]?.textContent.trim().split("\t").join(""),
      });
    });

  html
    .querySelectorAll("table.participantes")[1]
    ?.querySelectorAll("tr")
    .map((linha: any) => {
      const coluna = linha.querySelectorAll("td[valign='top']");
      coluna.map((aluno: any) => {
        array.alunos.push({
          descricao: aluno?.textContent
            .trim()
            .replace(/\r/g, "")
            .replace(/\t/g, ""),
        });
      });
    });
  return array;
};
