import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../utils/globalUtil';

export const parseVinculos = (html: HTMLElement, navigation: any) => {
  try {
    const tables = html?.querySelectorAll('.tabela-selecao-vinculo');
    const array: any = [];
    tables.forEach((t: any) => {
      const line = t.querySelectorAll('tbody > tr');
      line.forEach((p: any) => {
        array.push({
          matricula: p?.querySelectorAll('td')[2]?.textContent?.trim(),
          tipo: p?.querySelectorAll('td')[1]?.textContent?.trim(),
          curso: p?.querySelectorAll('td')[3]?.textContent?.trim(),
          link: p?.querySelectorAll('td')[3]?.querySelector('a')?.attributes
            .href,
        });
      });
    });
    return array;
  } catch (e) {
    recordErrorFirebase(e, '-parseVinculos');
    navigation.goBack();
  }
};
