import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../utils/globalUtil';

export const getAllturmas = (html: HTMLElement, navigation: any) => {
  try {
    const nameForm = html?.querySelector('form')?.id;
    const javax = html
      ?.querySelector("input[id='javax.faces.ViewState']")
      ?.getAttribute('value');
    const table = html.querySelectorAll('form > table > tbody > tr');
    const allAnos = [];

    let turmasPorPeriodo: any[] = [];

    for (let i = 0; i < table.length; i++) {
      const childNodes = table[i].childNodes;
      const childNodesLength = childNodes.length;

      if (childNodesLength === 3) {
        const periodo = childNodes[1]?.textContent.trim();
        turmasPorPeriodo = [];
        allAnos.push({
          nameForm,
          javax,
          periodo,
          turmasPorPeriodo,
        });
      } else if (childNodesLength === 13) {
        const disciplina = childNodes[1]?.textContent.trim();
        const link = String(childNodes[11]?.toString());
        const json = JSON.parse(
          link
            .substring(link.indexOf("'),{'") + 3, link.indexOf("'},'');}") + 2)
            .replace(/'/g, '"'),
        );

        turmasPorPeriodo.push({
          disciplina,
          json,
        });
      }
    }

    return allAnos;
  } catch (e) {
    recordErrorFirebase(e, '-getAllturmas');
    navigation.goBack();
  }
};
