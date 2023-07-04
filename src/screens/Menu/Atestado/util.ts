import { HTMLElement } from 'node-html-parser';

export const atestadoMatricula = (html: HTMLElement) => {
  const script = html?.getElementsByTagName('script')[4].innerHTML.trim();
  const arrayScript = script
    .split("var elem = document.getElementById('")
    .slice(1);
  const arrayValoresHorarios = arrayScript.map(item => {
    const key = item.substring(0, item.indexOf("');"));
    const valor = item.substring(item.indexOf("= '") + 3, item.indexOf("';"));
    return { key, valor };
  });

  const array = {
    tipo: 'atestado',
    emissao: html
      ?.querySelector('div#relatorio-cabecalho > div#texto > span')
      ?.textContent.trim(),
    identificacao: <any>[],
    turmas: <any>[],
    horarios: <any>[],
    atencao: html
      ?.querySelector('div#autenticacao > p')
      ?.textContent.trim()
      .replace(/\r|\t/g, ''),
  };

  const idents = html?.querySelectorAll('table#identificacao tr');
  const tur = html?.querySelectorAll('table#matriculas > tbody > tr');

  tur.forEach(td => {
    const teste = Array.from(td.querySelectorAll('td[valign="top"] span'));
    const disciplina = teste
      .map(tes =>
        tes.textContent.trim().split('\t').join('').split('\n').join(' '),
      )
      .join('\n');
    const turma: any = td.querySelector('td.turma')?.textContent.trim();
    const cod: any = td.querySelector('td.codigo')?.textContent.trim();
    const status: any = td.querySelector('td.status')?.textContent.trim();
    const horario: any = td.querySelector('td.horario')?.textContent.trim();

    array.turmas.push({ cod, disciplina, turma, status, horario });
  });

  const hor = html?.querySelectorAll('table#horario > tbody > tr');
  hor.forEach(td => {
    const arrayTD = Array.from(td.querySelectorAll('td[align="center"]')).map(
      contentTD => {
        const id = contentTD.querySelector('span')?.attributes.id;
        const pos = arrayValoresHorarios.findIndex(item => item.key === id);
        return pos !== -1
          ? arrayValoresHorarios[pos].valor
          : contentTD.textContent.trim();
      },
    );

    array.horarios.push(arrayTD);
  });

  idents.forEach(td => {
    array.identificacao.push(
      td.querySelector('td')?.textContent.trim().split('\n').join(''),
    );
    array.identificacao.push(
      td.querySelector('td > strong')?.textContent.trim(),
    );
  });

  return array;
};

export const verifyIfExist = (array: any, id: any) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].key === id) return i;
  }
  return -1;
};
