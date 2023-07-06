import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../../../utils/globalUtil';

export const parseForuns = (html: HTMLElement[], navigation: any) => {
  try {
    const json = {
      tipo: 'foruns',
      forunsTurma: <any>[],
      forumCompartilhado: <any>[],
    };

    const parseRow = (linha: HTMLElement) => {
      const contents: HTMLElement[] = linha.querySelectorAll('td');
      const link = '' + contents[0].querySelector('a')?.attributes.onclick;
      const linkFinal = link?.substring(
        link.indexOf("'),{'") + 3,
        link.indexOf("'},'');}") + 2,
      );
      return {
        titulo: contents[0].querySelector('a')?.textContent.trim(),
        tipo: contents[1].textContent.trim(),
        topicos: contents[2].textContent.trim(),
        autor: contents[3].textContent.trim(),
        criacao: contents[4].textContent.trim(),
        link: linkFinal?.replace(/'/g, '"'),
      };
    };

    html[0].querySelectorAll('tbody > tr').forEach((linha: HTMLElement) => {
      json.forunsTurma.push(parseRow(linha));
    });

    html[1].querySelectorAll('tbody > tr').forEach((linha: HTMLElement) => {
      json.forumCompartilhado.push(parseRow(linha));
    });

    return json;
  } catch (e) {
    recordErrorFirebase(e, '-parseForuns');
    navigation.goBack();
  }
};
