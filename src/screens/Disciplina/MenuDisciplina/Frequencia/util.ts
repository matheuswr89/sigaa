import parse from 'node-html-parser';
import { recordErrorFirebase } from '../../../../utils/globalUtil';

export const parseFrequencia = (html: any, navigation: any) => {
  try {
    const descr = html
      .querySelector('div.botoes-show')
      ?.innerHTML.replace(/<br>/g, '')
      .replace(/\t/g, '');
    const teste = parse(descr);
    let varialvel = '';
    for (let i = 0; i < teste.childNodes.length; i += 2) {
      const textContent = teste.childNodes[i].textContent.trim();
      const nextNode = teste.childNodes[i + 1];
      const nextNodeTextContent = nextNode?.textContent.trim();
      if (textContent && nextNodeTextContent) {
        varialvel += nextNodeTextContent + ' ' + textContent + '\n\n';
      }
    }
    let array = {
      tipo: 'frequencia',
      descricao: html
        .querySelector('div.descricaoOperacao')
        ?.textContent.trim()
        .replace('\n\n', ''),
      descricaoFreq: varialvel,
      frequencias: <any>[],
    };
    html.querySelectorAll('span > table > tbody > tr').forEach((linha: any) => {
      array.frequencias.push({
        data: linha.querySelectorAll('td')[0]?.textContent.trim(),
        situacao: linha.querySelectorAll('td')[1]?.textContent.trim(),
      });
    });
    return array;
  } catch (e) {
    recordErrorFirebase(e, '-parseFrequencia');
    navigation.goBack();
  }
};
