import { isNumber, recordErrorFirebase } from '../../../../utils/globalUtil';

export const notasDisciplinas = (
  html: any,
  tipoAluno: any,
  navigation: any,
) => {
  try {
    let notas: any = [];
    const allTd = html.querySelectorAll('div.notas > table > tbody > tr > td');
    let array = {
      tipo: 'nota',
      dataAtual: html.querySelector('span.dataAtual').textContent.trim(),
      materia: html.querySelector('div#relatorio > h3').textContent.trim(),
      avaliacoes: <any>[],
      notas: <any>[],
      situacao: allTd[allTd.length - 1].textContent.trim(),
      tipoNota: '',
    };

    html.querySelectorAll('div.notas > table').map((linha: any) => {
      if (tipoAluno === 'medio') {
        const inputValues = linha.querySelectorAll('tr#trAval');
        if (inputValues.length > 0) {
          for (let i = 0; i < inputValues.length; i++) {
            for (let j = 0; j < inputValues[i]?.childNodes.length; j++) {
              if (inputValues[i]?.childNodes[j].attributes?.value) {
                const input = inputValues[i].childNodes[j].attributes.value;
                notas.push(input);
              } else if (inputValues[i]?.childNodes[j]?.id === 'unid') {
                const input = inputValues[i].childNodes[j].textContent.trim();
                notas.push(input);
              }
            }
          }
          array.tipoNota = 'input';
        } else {
          const linhas = linha.querySelectorAll('th');
          for (let i = 2; i < linhas.length; i++) {
            notas.push(linhas[i].textContent.trim());
          }
          array.tipoNota = 'th';
        }
      } else {
        const inputValues = linha.querySelectorAll('tr#trAval > input');
        for (let i = 0; i < inputValues.length; i++) {
          const input = inputValues[i].attributes.value;
          notas.push(input);
        }
      }
    });
    if (tipoAluno === 'medio' && array.tipoNota === 'input') {
      let kal = 0;
      let isnumber = 0;
      if (
        !isNumber(notas[0]) &&
        !isNumber(notas[1]) &&
        isNumber(notas[2]) &&
        isNumber(notas[3])
      ) {
        for (let i = 0; i < notas.length; i++) {
          if (!notas[i].includes('Nota')) {
            let avaliacao, descricao, valor, peso;
            avaliacao = notas[i];
            i += 1;
            descricao = notas[i];
            i += 1;
            valor = notas[i];
            i += 1;
            peso = notas[i];
            array.avaliacoes.push({
              avaliacao,
              descricao,
              valor,
              peso,
            });
          } else if (notas[i].includes('Nota')) {
            array.avaliacoes.push({
              avaliacao: kal === 0 ? 'Nota B' : 'Nota R',
              descricao: kal === 0 ? 'Nota no bimestre' : 'Nota de recuperação',
              valor: '10',
              peso: '1',
            });
            kal++;
          }
          if (kal === 2) kal = 0;
        }
      } else {
        for (let i = 0; i < notas.length; i++) {
          if (!notas[i].includes('Nota')) {
            let avaliacao, descricao, valor, peso;
            avaliacao = notas[i];
            i += 1;
            isnumber++;
            descricao = notas[i];
            i += 1;
            isnumber++;
            valor = notas[i];
            isnumber++;
            if (isNumber(notas[isnumber])) {
              i += 1;
              peso = notas[isnumber];
            } else {
              peso = 1;
            }
            array.avaliacoes.push({
              avaliacao,
              descricao,
              valor,
              peso,
            });
          } else if (notas[i].includes('Nota')) {
            array.avaliacoes.push({
              avaliacao: kal === 0 ? 'Nota B' : 'Nota R',
              descricao: kal === 0 ? 'Nota no bimestre' : 'Nota de recuperação',
              valor: '10',
              peso: '1',
            });
            kal++;
          }
          if (kal === 2) kal = 0;
        }
      }

      if (array.avaliacoes[array.avaliacoes.length - 1]) {
        array.avaliacoes[array.avaliacoes.length - 1].avaliacao = 'PF';
        array.avaliacoes[array.avaliacoes.length - 1].descricao = 'Prova final';
      }
    } else if (tipoAluno === 'medio' && array.tipoNota === 'th') {
      for (let i = 0; i < notas.length; i++) {
        const avaliacao: any = notas[i];
        let descricao: any = 'Nota no bimestre';
        let valor: any = 10;
        let peso: any = 1;
        if (avaliacao.includes('REC')) descricao = 'Nota de recuperação';
        if (
          !avaliacao.includes('Faltas') &&
          !avaliacao.includes('Sit.') &&
          !avaliacao.includes('Resultado')
        ) {
          array.avaliacoes.push({
            avaliacao,
            descricao,
            valor,
            peso,
          });
        }
      }
    } else {
      for (let i = 0; i < notas.length; i++) {
        const avaliacao: any = notas[i];
        i += 1;
        const descricao: any = notas[i];
        i += 1;
        const valor: any = notas[i];
        i += 1;
        const peso: any = notas[i];
        array.avaliacoes.push({
          avaliacao,
          descricao,
          valor,
          peso,
        });
      }
      array.avaliacoes.push({
        avaliacao: 'Nota',
        descricao: 'Nota final',
        valor: '10',
        peso: '1',
      });
      array.avaliacoes.push({
        avaliacao: 'Reposição',
        descricao: 'Recuperação Final',
        valor: '10',
        peso: '1',
      });
    }
    for (let i = 2; i < allTd.length - 1; i++) {
      if (i !== allTd.length - 1) array.notas.push(allTd[i].innerHTML.trim());
    }
    return array;
  } catch (e) {
    recordErrorFirebase(e, '-notasDisciplinas');
    navigation.goBack();
  }
};
