import { HTMLElement } from 'node-html-parser';

export interface AtividadesInterface {
  data: string;
  descricao: string;
  dias: number | null;
  status: string | null;
  json: string | null;
  javax: string | undefined;
}

export interface DisciplinasInterface {
  id: string;
  nome: string;
  form_acessarTurmaVirtual: string;
  javax: string;
  turmaVirtual: string;
  horario: string;
}

export const parseAtividades = (html: HTMLElement) => {
  let atividades: AtividadesInterface[] = [];
  if (html.querySelector('div#avaliacao-portal > table')) {
    const tarefasCode = html.querySelectorAll(
      'div#avaliacao-portal > table',
    )[0];
    tarefasCode.querySelectorAll('tr[class]')?.map((tarefa: any) => {
      const javax = html.querySelector(
        'form#formAtividades > input[name="javax.faces.ViewState"]',
      )?.attributes.value;
      const data = tarefa?.childNodes[3].textContent
        .replace(/\r/g, '')
        .replace(/\t/g, '')
        .replace(/\n/g, '');
      const array = String(tarefa?.childNodes[5].textContent)
        .replace(/\r/g, '')
        .replace(/\t/g, '')
        .split('\n');
      let descricao = '';
      var arraySemVazios = array.filter(function (i) {
        return i;
      });
      descricao = arraySemVazios.join('\n');
      const dias = data.includes('(')
        ? parseInt(data?.split('(')[1].split(' ')[0])
        : null;
      let status = null;
      if (String(tarefa.childNodes[1]?.innerHTML).includes('img'))
        status = String(tarefa.childNodes[1]?.innerHTML).includes('prova_mes')
          ? 'prova_mes'
          : String(tarefa.childNodes[1]?.innerHTML).includes('prova_semana')
          ? 'prova_semana'
          : 'enviado';
      const json = String(tarefa.childNodes[5]?.innerHTML).includes(
        '<a id="formAtividades',
      )
        ? String(tarefa.childNodes[5]?.innerHTML).substring(
            String(tarefa.childNodes[5]?.innerHTML).indexOf("'),{'") + 3,
            String(tarefa.childNodes[5]?.innerHTML).indexOf("'},'');}") + 2,
          )
        : null;
      atividades.push({
        data,
        descricao,
        dias,
        status,
        json,
        javax,
      });
    });
  }
  return atividades;
};

export const parseDisciplinas = (html: HTMLElement) => {
  const disciplinas: DisciplinasInterface[] = [];
  const disciplinasCode = html.querySelectorAll('div#turmas-portal > table')[1];
  disciplinasCode?.querySelectorAll('tr')?.forEach((teste: any) => {
    teste?.querySelectorAll('td.descricao > form')?.forEach((atual: any) => {
      disciplinas.push({
        id: atual
          ?.querySelector("input[name='idTurma']")
          ?.getAttribute('value'),
        nome: atual?.querySelector('a')?.textContent,
        form_acessarTurmaVirtual: atual
          ?.querySelector('input')
          ?.getAttribute('value'),
        javax: atual
          ?.querySelector("input[name='javax.faces.ViewState']")
          ?.getAttribute('value'),
        turmaVirtual: atual?.querySelector('a')?.id,
        horario: teste?.querySelectorAll('td.info')[1]?.innerText?.trim(),
      });
    });
  });
  return disciplinas;
};
