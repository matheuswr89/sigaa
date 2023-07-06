import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../../../utils/globalUtil';

export const parseEnquetes = (html: any, navigation: any) => {
  try {
    let array = {
      tipo: 'enquete',
      enquetes: <any>[],
      form: '',
      'javax.faces.ViewState': '',
    };

    const linhas = html.querySelectorAll('tr');
    linhas.forEach((lin: any) => {
      const allCollums = lin.querySelectorAll('td');
      if (allCollums[2] !== undefined) {
        const link = allCollums[5].innerHTML;
        const status = allCollums[4].innerHTML.includes('Encerrada')
          ? 'Encerrada'
          : 'Aberta';
        const json = JSON.parse(
          link
            .substring(link.indexOf("'),{'") + 3, link.indexOf("'},") + 2)
            .replace(/'/g, '"'),
        );
        array.enquetes.push({
          pergunta: allCollums[0].textContent,
          created_at: allCollums[2].textContent,
          prazo: allCollums[3].textContent,
          status,
          json,
        });
      }
    });

    return array;
  } catch (e) {
    recordErrorFirebase(e, '-parseEnquetes');
    navigation.goBack();
  }
};

export const parseResultEnquete = (html: HTMLElement | null) => {
  const result: any[] = [];

  const linhas = html?.querySelectorAll('tr');
  linhas?.forEach(lin => {
    const allTD = lin.querySelectorAll('td');
    if (allTD[2] !== undefined) {
      const string = `${allTD[0].textContent} - ${allTD[2].textContent} (${allTD[1].textContent} Votos)`;
      result.push({ string });
    }
  });

  return result;
};
