import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../../../../utils/globalUtil';

export const parseForumTopicos = (html: HTMLElement, navigation: any) => {
  try {
    const topicos: any[] = [];

    html
      .querySelectorAll('table.listing > tbody > tr')
      .forEach((linha: HTMLElement) => {
        const link = linha.querySelectorAll('td')[0].querySelector('a')
          ?.attributes.onclick;
        const linkFinal = link?.substring(
          link.indexOf("'),{'") + 3,
          link.indexOf("'},'');}") + 2,
        );
        topicos.push({
          titulo: linha.querySelectorAll('td')[0].textContent.trim(),
          autor: linha.querySelectorAll('td')[1].textContent.trim(),
          respostas: linha.querySelectorAll('td')[2].textContent.trim(),
          ultimaMensagem: linha.querySelectorAll('td')[3].textContent.trim(),
          link: linkFinal,
        });
      });

    return topicos;
  } catch (e) {
    recordErrorFirebase(e, '-parseForumTopicos');
    navigation.goBack();
  }
};
