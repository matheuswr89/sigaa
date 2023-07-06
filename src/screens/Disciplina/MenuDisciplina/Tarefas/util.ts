import parse, { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../../../utils/globalUtil';

export const parseTarefas = (html: any, navigation: any) => {
  try {
    const array = {
      tipo: 'tarefas',
      title1: '',
      title2: '',
      individual: <any>[],
      grupo: <any>[],
      vazio: '',
    };

    if (html.length === 0) {
      array.vazio = 'Nenhuma tarefa foi encontrada!';
    } else {
      array.individual = arrayTarefas(
        parse(html[0].innerHTML).querySelectorAll('table > tbody > tr'),
      );
      array.title1 = '' + html[0].querySelector('legend')?.textContent.trim();

      if (html.length === 2) {
        array.grupo = arrayTarefas(
          parse(html[1].innerHTML).querySelectorAll('table > tbody > tr'),
        );
        array.title2 = '' + html[1].querySelector('legend')?.textContent.trim();
      }
    }

    return array;
  } catch (e) {
    recordErrorFirebase(e, '-parseTarefas');
    navigation.goBack();
  }
};

const arrayTarefas = (html: HTMLElement[]) => {
  const array = [];

  for (let i = 0; i < html.length; i += 2) {
    const descricao = html[i]
      .querySelectorAll('td')[1]
      .textContent.trim()
      .replace(/\t/g, '')
      .replace(/\r/g, '');

    const envio =
      '' +
      html[i].querySelectorAll('td')[6].querySelector('a')?.attributes.onclick;
    const envioFinal = envio.substring(
      envio.indexOf("'),{'") + 3,
      envio.indexOf("'},'')") + 2,
    );

    const nota = html[i].querySelectorAll('td')[3].textContent.trim();
    const periodo = html[i]
      .querySelectorAll('td')[2]
      .textContent.trim()
      .replace(/\t/g, '')
      .replace(/\n/g, ' ');

    const descricao2 = html[i + 1]
      .querySelectorAll('td')[0]
      .textContent.replace('Baixar arquivo', '')
      .replace(/\t/g, '')
      .replace(/\r/g, '')
      .replace(/\n/g, '');

    let baixarArquivo: string = '';
    if (html[i + 1].querySelector('a')) {
      const allA = html[i + 1].querySelectorAll('a');
      baixarArquivo =
        'https://sig.ifsudestemg.edu.br' +
        allA[allA.length - 1]?.attributes.href;
    }

    array.push({
      descricao,
      descricao2,
      baixarArquivo,
      nota,
      periodo,
      json: envioFinal,
    });
  }

  return array;
};
