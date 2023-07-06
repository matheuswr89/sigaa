import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../../utils/globalUtil';

export const parseNotasMedio = (html: HTMLElement, navigation: any) => {
  try {
    let notasMedio: any = [];
    if (html.querySelector('table.listagem')) {
      const table = html.querySelectorAll('table.listagem > tbody > tr');
      for (let i = 0; i < table.length; i++) {
        const link: any = table[i].querySelectorAll('td')[2].querySelector('a')
          ?.attributes.onclick;
        notasMedio.push({
          ano: table[i].querySelectorAll('td')[0].textContent,
          situacao: table[i].querySelectorAll('td')[1].textContent,
          json: JSON.parse(
            link
              .substring(
                link.indexOf("'),{'") + 3,
                link.indexOf("'},'');}") + 2,
              )
              .replace(/'/g, '"'),
          ),
        });
      }
    }
    return notasMedio;
  } catch (e) {
    recordErrorFirebase(e, '-parseNotasMedio');
    navigation.goBack();
  }
};

export const parseNotas = (html: HTMLElement, navigation: any) => {
  try {
    const notas: any[] = [];
    const tabelaRelatorios = html?.querySelectorAll('table.tabelaRelatorio');

    tabelaRelatorios.forEach((tabelaRelatorio: any) => {
      const tables: any = {
        ano: tabelaRelatorio?.querySelector('caption').innerText.trim(),
        disciplinas: [],
      };

      const linhas = Array.from(
        tabelaRelatorio.querySelectorAll('tbody > tr.linha'),
      );
      linhas.forEach((linha: any) => {
        const recuperacao = linha.querySelectorAll('td')[3]?.textContent.trim();
        const unidade = linha.querySelectorAll('td')[2]?.textContent.trim();
        tables.disciplinas.push([
          linha.querySelectorAll('td')[1]?.textContent.trim(),
          unidade ? unidade : '--',
          recuperacao ? recuperacao : '--',
          linha.querySelectorAll('td')[4]?.textContent.trim(),
          linha.querySelectorAll('td')[6]?.textContent.trim(),
        ]);
      });

      notas.push(tables);
    });

    return notas;
  } catch (e) {
    recordErrorFirebase(e, '-parseNotas');
    navigation.goBack();
  }
};
