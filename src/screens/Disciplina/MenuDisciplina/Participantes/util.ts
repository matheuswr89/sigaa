import { recordErrorFirebase } from '../../../../utils/globalUtil';

export const parseParticipantes = (html: any, navigation: any) => {
  try {
    let array = {
      tipo: 'participantes',
      professores: <any>[],
      alunos: <any>[],
    };

    const professores = html.querySelectorAll('table.participantes')[0];
    const alunos = html.querySelectorAll('table.participantes')[1];

    if (professores) {
      const professoresLinhas = professores.querySelectorAll('tr');
      professoresLinhas.forEach((linha: any) => {
        const coluna = linha.querySelectorAll('td');
        array.professores.push({
          descricao: coluna[1]?.textContent.trim().split('\t').join(''),
        });
      });
    }

    if (alunos) {
      const alunosLinhas = alunos.querySelectorAll('tr');
      alunosLinhas.forEach((linha: any) => {
        const coluna = linha.querySelectorAll("td[valign='top']");
        coluna.forEach((aluno: any) => {
          array.alunos.push({
            descricao: aluno?.textContent
              .trim()
              .replace(/\r/g, '')
              .replace(/\t/g, ''),
          });
        });
      });
    }

    return array;
  } catch (e) {
    recordErrorFirebase(e, '-parseParticipantes');
    navigation.goBack();
  }
};
