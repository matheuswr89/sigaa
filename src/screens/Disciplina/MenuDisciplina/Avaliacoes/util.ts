import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../../../utils/globalUtil';

export const parseAvaliacoes = (html: HTMLElement | null, navigation: any) => {
  try {
    const array = {
      avaliacoes: <any>[],
    };

    const linhas = html?.querySelectorAll('tr');
    linhas?.forEach((lin: any) => {
      const allCollums = lin.querySelectorAll('td');
      if (allCollums[2] !== undefined) {
        const avaliacao = {
          data: allCollums[0].textContent,
          hora: allCollums[1].textContent,
          descricao: allCollums[2].textContent,
        };
        array.avaliacoes.push(avaliacao);
      }
    });

    return array;
  } catch (e) {
    recordErrorFirebase(e, '-parseAvaliacoes');
    navigation.goBack();
  }
};
