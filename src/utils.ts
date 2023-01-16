import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import parse, {HTMLElement, Node} from 'node-html-parser';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useChannelId} from './App';

export const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/verTelaLogin.do',
  'sec-ch-ua':
    '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63',
};

export const headers2 = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  cookie:
    '_ga=GA1.3.654998053.1648578671; _gid=GA1.3.1932525244.1659216266; JSESSIONID=248CD73D6ECD8BC569B87EAE889510DE.node11; _gat=1',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
  'sec-ch-ua':
    '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest',
};

export const headers3 = {
  ':authority': 'sig.ifsudestemg.edu.br',
  ':method': 'POST',
  ':path': '/sigaa/ava/index.jsf',
  ':scheme': 'https',
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded',
  cookie:
    '_ga=GA1.3.654998053.1648578671; JSESSIONID=A27FD33212216E2952731BE71864E102.node13; _gid=GA1.3.2062963088.1661459046; _gat=1',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
  'sec-ch-ua':
    '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63',
  'x-requested-with': 'XMLHttpRequest',
};

export const headers4 = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded',
  cookie:
    '_ga=GA1.3.654998053.1648578671; _gid=GA1.3.1932525244.1659216266; JSESSIONID=82E0D132489BAF1DCE2895A767004186.node10; _gat=1',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
  'sec-ch-ua':
    '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63',
};

export const headers5 = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded',
  cookie:
    '_ga=GA1.3.654998053.1648578671; _gid=GA1.3.1932525244.1659216266; JSESSIONID=2B8FFE3A13F639BF393E3B67BD144F9D.node8',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
  'sec-ch-ua':
    '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63',
};

export const headerDownload = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded',
  cookie:
    '_ga=GA1.3.654998053.1648578671; _gid=GA1.3.1380300560.1660964308; JSESSIONID=364CD9CEAE9A5E469D2DB62E511B207F.node8; _gat=1',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
  'sec-ch-ua':
    '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54',
};

export const headerMedio = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded',
  cookie:
    '_ga=GA1.3.654998053.1648578671; _gid=GA1.3.1932525244.1659216266; JSESSIONID=525FEEB8F0A43737D3B4F53AD6936203.node12',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
  'sec-ch-ua':
    '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47',
};
export const headerTarefa = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-length': '180',
  'content-type': 'application/x-www-form-urlencoded',
  cookie:
    '_ga=GA1.3.585269607.1662672823; _gid=GA1.3.776313219.1662672823; JSESSIONID=905E1510D7AB2D8348E3BF7042F54EA2.node11',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf',
  'sec-ch-ua':
    '"Microsoft Edge";v="105", " Not;A Brand";v="99", "Chromium";v="105"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.27',
};

export const headerTopico = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-length': '67',
  'content-type': 'application/x-www-form-urlencoded',
  cookie:
    '_ga=GA1.3.585269607.1662672823; _gid=GA1.3.776313219.1662672823; JSESSIONID=6D7C6D29E066A9E38294305BF06F0B0A.node7; _gat=1',
  origin: 'https://sig.ifsudestemg.edu.br',
  referer: 'https://sig.ifsudestemg.edu.br/sigaa/ava/ForumTurma/lista.jsf',
  'sec-ch-ua':
    '"Microsoft Edge";v="105", " Not;A Brand";v="99", "Chromium";v="105"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.27',
};
export const formBody = (payload: any) =>
  Object.keys(payload)
    .map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]),
    )
    .join('&');

export const formBodyJson = (payload: any) =>
  Object.keys(payload)
    .map(key => key + '=' + payload[key])
    .join('&');

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return ({key, value}: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const menuDisicplina = ({
  menuCode,
  javax,
  menuCode1,
  tipoAluno,
}: any) => {
  return [
    {
      id: 12938,
      name: menuCode[0]
        ?.querySelectorAll('td.rich-panelbar-content > a')[3]
        ?.textContent.trim(),
      formMenu: 'formMenu',
      formMenu0: menuCode1,
      formMenu1: menuCode[0]?.id,
      javax: javax,
      formMenu2: menuCode[0]
        ?.querySelectorAll('td.rich-panelbar-content > a')[3]
        ?.rawAttrs.substring(
          menuCode[0]
            ?.querySelectorAll('td.rich-panelbar-content > a')[3]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[0]
            ?.querySelectorAll('td.rich-panelbar-content > a')[3]
            ?.rawAttrs.indexOf("'},"),
        ),
    },
    {
      id: 12945,
      name: menuCode[0]
        ?.querySelectorAll('td.rich-panelbar-content > a')
        [tipoAluno === 'medio' ? 4 : 5]?.textContent.trim(),
      formMenu: 'formMenu',
      formMenu0: menuCode1,
      formMenu1: menuCode[0]?.id,
      javax: javax,
      formMenu2: menuCode[0]
        ?.querySelectorAll('td.rich-panelbar-content > a')
        [tipoAluno === 'medio' ? 4 : 5]?.rawAttrs.substring(
          menuCode[0]
            ?.querySelectorAll('td.rich-panelbar-content > a')
            [tipoAluno === 'medio' ? 4 : 5]?.rawAttrs.indexOf("':'") + 3,
          menuCode[0]
            ?.querySelectorAll('td.rich-panelbar-content > a')
            [tipoAluno === 'medio' ? 4 : 5]?.rawAttrs.indexOf("'},"),
        ),
    },
    {
      id: 12940,
      name: menuCode[1]
        ?.querySelectorAll('td.rich-panelbar-content > a')[0]
        ?.textContent.trim(),
      formMenu: 'formMenu',
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[1]
        ?.querySelectorAll('td.rich-panelbar-content > a')[0]
        ?.rawAttrs.substring(
          menuCode[1]
            ?.querySelectorAll('td.rich-panelbar-content > a')[0]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[1]
            ?.querySelectorAll('td.rich-panelbar-content > a')[0]
            ?.rawAttrs.indexOf("'},"),
        ),
    },
    {
      id: 12990,
      name: menuCode[1]
        ?.querySelectorAll('td.rich-panelbar-content > a')[1]
        ?.textContent.trim(),
      formMenu: 'formMenu',
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[1]
        ?.querySelectorAll('td.rich-panelbar-content > a')[1]
        ?.rawAttrs.substring(
          menuCode[1]
            ?.querySelectorAll('td.rich-panelbar-content > a')[1]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[1]
            ?.querySelectorAll('td.rich-panelbar-content > a')[1]
            ?.rawAttrs.indexOf("'},"),
        ),
    },
    {
      id: 12941,
      name: menuCode[1]
        ?.querySelectorAll('td.rich-panelbar-content > a')[2]
        ?.textContent.trim(),
      formMenu: 'formMenu',
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[1]
        ?.querySelectorAll('td.rich-panelbar-content > a')[2]
        ?.rawAttrs.substring(
          menuCode[1]
            ?.querySelectorAll('td.rich-panelbar-content > a')[2]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[1]
            ?.querySelectorAll('td.rich-panelbar-content > a')[2]
            ?.rawAttrs.indexOf("'},"),
        ),
    },
    {
      id: 12942,
      name: menuCode[3]
        ?.querySelectorAll('td.rich-panelbar-content > a')[2]
        ?.textContent.trim(),
      formMenu: 'formMenu',
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[3]
        ?.querySelectorAll('td.rich-panelbar-content > a')[2]
        ?.rawAttrs.substring(
          menuCode[3]
            ?.querySelectorAll('td.rich-panelbar-content > a')[2]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[3]
            ?.querySelectorAll('td.rich-panelbar-content > a')[2]
            ?.rawAttrs.indexOf("'},"),
        ),
    },
  ];
};

export const mapafrequencia = (html: any) => {
  const descr = html
    .querySelector('div.botoes-show')
    ?.innerHTML.replace(/<br>/g, '')
    .replace(/\t/g, '');
  const teste = parse(descr);
  let varialvel = '';
  for (let i = 0; i < teste.childNodes.length; i++) {
    if (teste.childNodes[i].textContent.trim()) {
      varialvel +=
        teste.childNodes[i].textContent.trim() +
        ' ' +
        teste.childNodes[i + 1]?.textContent.trim() +
        '\n\n';
      i += 1;
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
  html.querySelectorAll('span > table > tbody > tr').map((linha: any) => {
    array.frequencias.push({
      data: linha.querySelectorAll('td')[0]?.textContent.trim(),
      situacao: linha.querySelectorAll('td')[1]?.textContent.trim(),
    });
  });
  return array;
};

export const participantes = (html: any, tipoAluno: any) => {
  let array = {
    tipo: 'participantes',
    professores: <any>[],
    alunos: <any>[],
  };
  html
    .querySelectorAll('table.participantes')[0]
    ?.querySelectorAll('tr')
    .map((linha: any) => {
      const coluna = linha.querySelectorAll('td');

      array.professores.push({
        descricao: coluna[1]?.textContent.trim().split('\t').join(''),
      });
    });

  html
    .querySelectorAll('table.participantes')[1]
    ?.querySelectorAll('tr')
    .map((linha: any) => {
      const coluna = linha.querySelectorAll("td[valign='top']");
      coluna.map((aluno: any) => {
        array.alunos.push({
          descricao: aluno?.textContent
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, ''),
        });
      });
    });
  return array;
};

export const atestadoMatricula = (html: any) => {
  const array = {
    tipo: 'atestado',
    emissao: html
      .querySelector('div#relatorio-cabecalho > div#texto > span')
      ?.textContent.trim(),
    identificacao: <any>[],
    turmas: <any>[],
    atencao: html
      .querySelector('div#autenticacao > p')
      ?.textContent.trim()
      .replace(/\r/g, '')
      .replace(/\t/g, ''),
  };
  const idents = html.querySelectorAll('table#identificacao  tr');
  const tur = html.querySelectorAll('table#matriculas > tbody > tr');
  tur.map((td: any) => {
    const teste = td.querySelectorAll('td[valign="top"] span');
    let string = '';
    for (let tes of teste) {
      string +=
        '\n' +
        tes.textContent.trim().split('\t').join('').split('\n').join(' ');
    }
    array.turmas.push({
      cod: td.querySelector('td.codigo').textContent.trim(),
      disciplina: string,
      turma: td.querySelector('td.turma').textContent.trim(),
      status: td.querySelector('td.status').textContent.trim(),
      horario: td.querySelector('td.horario').textContent.trim(),
    });
  });
  idents.map((td: any) => {
    array.identificacao.push(
      td.querySelector('td').textContent.trim().split('\n').join(''),
    );
    array.identificacao.push(
      td.querySelector('td > strong').textContent.trim(),
    );
  });
  return array;
};

export const notasDisciplinas = (html: any, tipoAluno: any) => {
  let notas: any = [];
  const allTd = html.querySelectorAll('div.notas > table > tbody > tr > td');
  let array = {
    tipo: 'nota',
    dataAtual: html.querySelector('span.dataAtual').textContent.trim(),
    materia: html.querySelector('div#relatorio > h3').textContent.trim(),
    avaliacoes: <any>[],
    notas: <any>[],
    situacao: allTd[allTd.length - 1].textContent.trim(),
    tipoNota: '',
  };

  html.querySelectorAll('div.notas > table').map((linha: any) => {
    if (tipoAluno === 'medio') {
      const inputValues = linha.querySelectorAll('tr#trAval');
      if (inputValues.length > 0) {
        for (let i = 0; i < inputValues.length; i++) {
          for (let j = 0; j < inputValues[i]?.childNodes.length; j++) {
            if (inputValues[i]?.childNodes[j].attributes?.value) {
              const input = inputValues[i].childNodes[j].attributes.value;
              notas.push(input);
            } else if (inputValues[i]?.childNodes[j]?.id === 'unid') {
              const input = inputValues[i].childNodes[j].textContent.trim();
              notas.push(input);
            }
          }
        }
        array.tipoNota = 'input';
      } else {
        const linhas = linha.querySelectorAll('th');
        for (let i = 2; i < linhas.length; i++) {
          notas.push(linhas[i].textContent.trim());
        }
        array.tipoNota = 'th';
      }
    } else {
      const inputValues = linha.querySelectorAll('tr#trAval > input');
      for (let i = 0; i < inputValues.length; i++) {
        const input = inputValues[i].attributes.value;
        notas.push(input);
      }
    }
  });
  if (tipoAluno === 'medio' && array.tipoNota === 'input') {
    let kal = 0;
    let isnumber = 0;
    if (
      !isNumber(notas[0]) &&
      !isNumber(notas[1]) &&
      isNumber(notas[2]) &&
      isNumber(notas[3])
    ) {
      for (let i = 0; i < notas.length; i++) {
        if (!notas[i].includes('Nota')) {
          let avaliacao, descricao, valor, peso;
          avaliacao = notas[i];
          i += 1;
          descricao = notas[i];
          i += 1;
          valor = notas[i];
          i += 1;
          peso = notas[i];
          array.avaliacoes.push({
            avaliacao,
            descricao,
            valor,
            peso,
          });
        } else if (notas[i].includes('Nota')) {
          array.avaliacoes.push({
            avaliacao: kal === 0 ? 'Nota B' : 'Nota R',
            descricao: kal === 0 ? 'Nota no bimestre' : 'Nota de recuperação',
            valor: '10',
            peso: '1',
          });
          kal++;
        }
        if (kal === 2) kal = 0;
      }
    } else {
      for (let i = 0; i < notas.length; i++) {
        if (!notas[i].includes('Nota')) {
          let avaliacao, descricao, valor, peso;
          avaliacao = notas[i];
          i += 1;
          isnumber++;
          descricao = notas[i];
          i += 1;
          isnumber++;
          valor = notas[i];
          isnumber++;
          if (isNumber(notas[isnumber])) {
            i += 1;
            peso = notas[isnumber];
          } else {
            peso = 1;
          }
          array.avaliacoes.push({
            avaliacao,
            descricao,
            valor,
            peso,
          });
        } else if (notas[i].includes('Nota')) {
          array.avaliacoes.push({
            avaliacao: kal === 0 ? 'Nota B' : 'Nota R',
            descricao: kal === 0 ? 'Nota no bimestre' : 'Nota de recuperação',
            valor: '10',
            peso: '1',
          });
          kal++;
        }
        if (kal === 2) kal = 0;
      }
    }

    if (array.avaliacoes[array.avaliacoes.length - 1]) {
      array.avaliacoes[array.avaliacoes.length - 1].avaliacao = 'PF';
      array.avaliacoes[array.avaliacoes.length - 1].descricao = 'Prova final';
    }
  } else if (tipoAluno === 'medio' && array.tipoNota === 'th') {
    for (let i = 0; i < notas.length; i++) {
      const avaliacao: any = notas[i];
      let descricao: any = 'Nota no bimestre';
      let valor: any = 10;
      let peso: any = 1;
      if (avaliacao.includes('REC')) descricao = 'Nota de recuperação';
      if (
        !avaliacao.includes('Faltas') &&
        !avaliacao.includes('Sit.') &&
        !avaliacao.includes('Resultado')
      ) {
        array.avaliacoes.push({
          avaliacao,
          descricao,
          valor,
          peso,
        });
      }
    }
  } else {
    for (let i = 0; i < notas.length; i++) {
      const avaliacao: any = notas[i];
      i += 1;
      const descricao: any = notas[i];
      i += 1;
      const valor: any = notas[i];
      i += 1;
      const peso: any = notas[i];
      array.avaliacoes.push({
        avaliacao,
        descricao,
        valor,
        peso,
      });
    }
    array.avaliacoes.push({
      avaliacao: 'Nota',
      descricao: 'Nota final',
      valor: '10',
      peso: '1',
    });
    array.avaliacoes.push({
      avaliacao: 'Reposição',
      descricao: 'Recuperação Final',
      valor: '10',
      peso: '1',
    });
  }
  for (let i = 2; i < allTd.length - 1; i++) {
    if (i !== allTd.length - 1) array.notas.push(allTd[i].innerHTML.trim());
  }
  return array;
};

export const getAllturmas = (html: HTMLElement) => {
  const nameForm = html.querySelector('form')?.id;
  const javax = html.querySelector("input[id='javax.faces.ViewState']")
    ?.attributes.value;
  const table = html.querySelectorAll('form > table > tbody > tr');
  const allAnos = [];
  let kal = 0;
  for (let i = 0; i < table.length; i++) {
    if (table[i].childNodes.length === 3) {
      allAnos.push({
        nameForm,
        javax,
        periodo: table[i].querySelector('td')?.textContent.trim(),
        turmasPorPeriodo: <any>[],
      });
      kal++;
    } else if (table[i].childNodes.length === 13) {
      const disciplina: any = table[i].childNodes[1]?.textContent.trim();
      const link: any = String(table[i]?.childNodes[11]?.toString());
      allAnos[kal - 1].turmasPorPeriodo.push({
        disciplina,
        json: JSON.parse(
          link
            .substring(link.indexOf("'),{'") + 3, link.indexOf("'},'');}") + 2)
            .replace(/'/g, '"'),
        ),
      });
    }
  }

  return allAnos;
};

export const formataTurma = (array: any) => {
  const turmas = array.turmas;
  let arrayJusto = [];
  for (let i = 0; i < turmas.length; i++) {
    const teste = turmas[i];
    i += 1;
    const teste2 = turmas[i];
    i += 1;
    const teste3 = turmas[i];
    arrayJusto.push({
      nome: teste,
      horario: teste2,
      json: teste3,
    });
  }
  return {
    periodo: array.periodo,
    turmas: arrayJusto,
  };
};

export const menuDisicplinaDrop = ({javaxMenuDrop}: any) => {
  return [
    {
      id: 1,
      name: 'Participantes',
      requests: {
        formMenuDrop: 'formMenuDrop',
        'javax.faces.ViewState': javaxMenuDrop,
        'formMenuDrop:menuParticipantes:hidden':
          'formMenuDrop:menuParticipantes',
      },
    },
    {
      id: 4,
      name: 'Fóruns',
      requests: {
        formMenuDrop: 'formMenuDrop',
        'javax.faces.ViewState': javaxMenuDrop,
        'formMenuDrop:menuAcessarForuns:hidden':
          'formMenuDrop:menuAcessarForuns',
      },
    },
    {
      id: 2,
      name: 'Frequência',
      requests: {
        formMenuDrop: 'formMenuDrop',
        'javax.faces.ViewState': javaxMenuDrop,
        'formMenuDrop:menuFrequencia:hidden': 'formMenuDrop:menuFrequencia',
      },
    },
    {
      id: 6,
      name: 'Ver Grupo',
      requests: {
        formMenuDrop: 'formMenuDrop',
        'javax.faces.ViewState': javaxMenuDrop,
        'formMenuDrop:menuVerGrupo:hidden': 'formMenuDrop:menuVerGrupo',
      },
    },
    {
      id: 3,
      name: 'Ver notas',
      requests: {
        formMenuDrop: 'formMenuDrop',
        'javax.faces.ViewState': javaxMenuDrop,
        'formMenuDrop:menuVerNotas:hidden': 'formMenuDrop:menuVerNotas',
      },
    },
    {
      id: 5,
      name: 'Tarefas',
      requests: {
        formMenuDrop: 'formMenuDrop',
        'javax.faces.ViewState': javaxMenuDrop,
        'formMenuDrop:menuTarefas:hidden': 'formMenuDrop:menuTarefas',
      },
    },
  ];
};

export const parseTarefas = (html: any, tipoAluno: string) => {
  let array = {
    tipo: 'tarefas',
    title1: '',
    title2: '',
    individual: <any>[],
    grupo: <any>[],
    vazio: '',
  };

  if (html.length === 0) {
    array.vazio = 'Nenhuma tarefa foi encontrada!';
  } else if (html.length === 1) {
    array.individual = arrayTarefas(
      parse(html[0].innerHTML).querySelectorAll('table > tbody > tr'),
    );
    array.title1 = '' + html[0].querySelector('legend')?.textContent.trim();
  } else {
    array.individual = arrayTarefas(
      parse(html[0].innerHTML).querySelectorAll('table > tbody > tr'),
    );
    array.title1 = '' + html[0].querySelector('legend')?.textContent.trim();
    array.grupo = arrayTarefas(
      parse(html[1].innerHTML).querySelectorAll('table > tbody > tr'),
    );
    array.title2 = '' + html[1].querySelector('legend')?.textContent.trim();
  }
  return array;
};

const arrayTarefas = (html: HTMLElement[]) => {
  let array = [];

  for (let i = 0; i < html.length; i++) {
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
    i = i + 1;
    const descricao2 = html[i]
      .querySelectorAll('td')[0]
      .textContent.replace('Baixar arquivo', '')
      .replace(/\t/g, '')
      .replace(/\r/g, '')
      .replace(/\n/g, '');
    let baixarArquivo: string = '';
    if (html[i].querySelector('a')) {
      const allA = html[i].querySelectorAll('a');
      console.log(allA[allA.length - 1]?.attributes.href);
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
export interface Atividades {
  data: string;
  descricao: string;
  dias: number | null;
  status: string | null;
  json: string | null;
  javax: string | undefined;
}
export const parseAtividades = (html: HTMLElement) => {
  let atividades: Atividades[] = [];
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
export interface DisciplinasInterface {
  id: string;
  nome: string;
  form_acessarTurmaVirtual: string;
  javax: string;
  turmaVirtual: string;
  horario: string;
}
export const parseDisciplinas = (html: HTMLElement) => {
  let disciplinas: DisciplinasInterface[] = [];
  if (html.querySelector('div#turmas-portal > table')) {
    const disciplinasCode = html.querySelectorAll(
      'div#turmas-portal > table',
    )[1];
    disciplinasCode.querySelectorAll('tr')?.map((teste: any) => {
      teste.querySelectorAll('td.descricao > form')?.map((atual: any) => {
        disciplinas.push({
          id: atual.querySelector("input[name='idTurma']")?._attrs.value,
          nome: atual.querySelector('a')?.textContent,
          form_acessarTurmaVirtual: atual.querySelector('input')?._attrs.value,
          javax: atual.querySelector("input[name='javax.faces.ViewState']")
            ?._attrs.value,
          turmaVirtual: atual.querySelector('a')?.id,
          horario: teste.querySelectorAll('td.info')[1]?.innerText.trim(),
        });
      });
    });
  }
  return disciplinas;
};

export const parseNotas = (html: HTMLElement) => {
  let notas: any = [];
  if (html.querySelectorAll('table.tabelaRelatorio')) {
    html
      .querySelectorAll('table.tabelaRelatorio')
      ?.map((tabelaRelatorio: any) => {
        let tables: any = {
          ano: tabelaRelatorio.querySelector('caption').innerText.trim(),
          disciplinas: [],
        };
        tabelaRelatorio
          .querySelectorAll('tbody > tr.linha')
          ?.map((linha: any) => {
            let recuperacao = linha
              .querySelectorAll('td')[3]
              ?.textContent.trim();
            let unidade = linha.querySelectorAll('td')[2]?.textContent.trim();
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
  }
  return notas;
};

export const parseNotasMedio = (html: HTMLElement) => {
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
            .substring(link.indexOf("'),{'") + 3, link.indexOf("'},'');}") + 2)
            .replace(/'/g, '"'),
        ),
      });
    }
  }
  return notasMedio;
};

export const parseTableHorarios = (
  tableHorarios: HTMLElement,
  script: string,
) => {
  let dadosHorarios: any = [];
  tableHorarios
    .querySelectorAll('tr[style="font-size: 9px;"]')
    .map((linha: any) => {
      const horarios = linha.querySelectorAll('td');
      for (let i = 0; i < horarios.length; i++) {
        let id = '';
        const horario = horarios[i].textContent.trim();
        i += 1;
        let segunda = '---';
        id = horarios[i].querySelector('span')?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          segunda = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length,
            )
            .split('=')[1]
            .replace(/'/g, '');
        }
        i += 1;
        let terca = '---';
        id = horarios[i].querySelector('span')?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          terca = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length,
            )
            .split('=')[1]
            .replace(/'/g, '');
        }
        i += 1;
        let quarta = '---';
        id = horarios[i].querySelector('span')?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          quarta = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length,
            )
            .split('=')[1]
            .replace(/'/g, '');
        }
        i += 1;
        let quinta = '---';
        id = horarios[i].querySelector('span')?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          quinta = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length,
            )
            .split('=')[1]
            .replace(/'/g, '');
        }
        i += 1;
        let sexta = '---';
        id = horarios[i].querySelector('span')?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          sexta = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length,
            )
            .split('=')[1]
            .replace(/'/g, '');
        }
        i += 1;
        let sabado = '---';
        id = horarios[i].querySelector('span')?.rawAttrs.split('"')[1];
        if (script.indexOf(id) > 0) {
          sabado = script
            .substring(
              script.indexOf(id) + id.length + 59,
              script.indexOf(id) + id.length,
            )
            .split('=')[1]
            .replace(/'/g, '');
        }
        dadosHorarios.push({
          horario,
          segunda,
          terca,
          quarta,
          quinta,
          sexta,
          sabado,
        });
      }
    });
  return dadosHorarios;
};

export const parseHomeDisciplina = (html: HTMLElement) => {
  let homeDisci: any = [];
  let ind = 0;
  html.querySelectorAll('div.titulo').map((el: any) => {
    homeDisci.push({
      titulo: el.textContent.trim(),
      content: [],
    });
  });
  if (homeDisci.length === 0)
    homeDisci.push({
      titulo: 'O professor ainda não postou nada!',
      content: [],
    });
  html.querySelectorAll("div[class*='dotopico']").map((el: any) => {
    el.childNodes.map((ele: any) => {
      if (!ele?.textContent.trim().includes('var elt')) {
        let tipo = '';
        let link = '';
        let name = '';
        if (
          String(ele.innerHTML).includes('<img src="/shared/verImagem?') ||
          String(ele.innerHTML).includes('<img src="data:image/')
        ) {
          if (ele.childNodes.length === 1) {
            tipo = 'img';
            link = ele?.childNodes[0]?.attributes.src?.includes('https://')
              ? ele?.childNodes[0]?.attributes.src
              : 'https://sig.ifsudestemg.edu.br' +
                ele?.childNodes[0]?.attributes.src;
            name = 'imagem';
            homeDisci[ind].content.push({
              name,
              tipo,
              link,
            });
          } else {
            for (
              let i = 0;
              i < ele?.childNodes[0]?.childNodes[2]?.childNodes.length;
              i++
            ) {
              if (
                ele?.childNodes[0]?.childNodes[2]?.childNodes[i]?.attributes
                  ?.src !== undefined
              ) {
                tipo = 'img';
                link = ele?.childNodes[0]?.childNodes[2]?.childNodes[
                  i
                ]?.attributes?.src?.includes('https://')
                  ? ele?.childNodes[0]?.childNodes[2]?.childNodes[i]?.attributes
                      ?.src
                  : 'https://sig.ifsudestemg.edu.br' +
                    ele?.childNodes[0]?.childNodes[2]?.childNodes[i]?.attributes
                      ?.src;
                name = 'imagem';
                homeDisci[ind].content.push({
                  name,
                  tipo,
                  link,
                });
              }
            }
          }
        } else if (String(ele.innerHTML).includes('iframe')) {
          name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '')
            .split('function')[0];
          tipo = 'iframe';
          link = ele.getElementsByTagName('iframe')[0].attributes.src;
        } else if (
          String(ele.innerHTML).includes('href') &&
          ele.querySelector("a[target='_blank']") !== undefined &&
          ele.getElementsByTagName('a')[0].attributes.href !== '#'
        ) {
          tipo = 'link';
          link = ele.getElementsByTagName('a')[0].attributes.href;
          name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '');
        } else if (
          String(ele.innerHTML).includes('href') &&
          ele.querySelector('a[id$="idEnviarMaterialTarefa"]')
        ) {
          tipo = 'atividade';
          const onclick = ele.getElementsByTagName('a')[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'');}") + 2,
          );
          name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '');
        } else if (
          String(ele.innerHTML).includes('href') &&
          ele.querySelector('a[id$="idMostrarForum"]')
        ) {
          tipo = 'forum';
          const onclick = ele.getElementsByTagName('a')[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'');}") + 2,
          );
          name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '');
        } else if (
          String(ele.innerHTML).includes('href') &&
          ele.querySelector('a[id$="idMostrarEnquete"]')
        ) {
          tipo = 'enquete';
          const onclick = ele.getElementsByTagName('a')[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'');}") + 2,
          );
          name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '');
        } else if (
          String(ele.innerHTML).includes(
            '<a href="#" onclick="if(typeof jsfcljs',
          )
        ) {
          tipo = 'arquivo';
          const onclick = ele.getElementsByTagName('a')[0].attributes.onclick;
          link = onclick.substring(
            onclick.indexOf("'),{'") + 3,
            onclick.indexOf("'},'_blank'") + 2,
          );
          name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '');
        } else if (
          ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
        ) {
          name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '');
        }
        if (name !== '' && tipo !== 'img')
          homeDisci[ind].content.push({
            name,
            tipo,
            link,
          });
      }
    });
    ind++;
  });
  return homeDisci;
};

export const parseForuns = (html: HTMLElement[]) => {
  let json = {
    tipo: 'foruns',
    forunsTurma: <any>[],
    forumCompartilhado: <any>[],
  };

  html[0].querySelectorAll('tbody > tr').map((linha: HTMLElement) => {
    const contents: HTMLElement[] = linha.querySelectorAll('td');
    const link = '' + contents[0].querySelector('a')?.attributes.onclick;
    const linkFinal = link?.substring(
      link.indexOf("'),{'") + 3,
      link.indexOf("'},'');}") + 2,
    );
    json.forunsTurma.push({
      titulo: contents[0].querySelector('a')?.textContent.trim(),
      tipo: contents[1].textContent.trim(),
      topicos: contents[2].textContent.trim(),
      autor: contents[3].textContent.trim(),
      criacao: contents[4].textContent.trim(),
      inicio: contents[5].textContent.trim(),
      fim: contents[6].textContent.trim(),
      link: linkFinal.replace(/'/g, '"'),
    });
  });
  html[1].querySelectorAll('tbody > tr').map((linha: HTMLElement) => {
    const contents: HTMLElement[] = linha.querySelectorAll('td');
    const link = '' + contents[0].querySelector('a')?.attributes.onclick;
    const linkFinal = link?.substring(
      link.indexOf("'),{'") + 3,
      link.indexOf("'},'');}") + 2,
    );
    json.forumCompartilhado.push({
      titulo: contents[0].querySelector('a')?.textContent.trim(),
      tipo: contents[1].textContent.trim(),
      topicos: contents[2].textContent.trim(),
      autor: contents[3].textContent.trim(),
      criacao: contents[4].textContent.trim(),
      link: linkFinal.replace(/'/g, '"'),
    });
  });
  return json;
};

export const parseForumTopicos = (html: HTMLElement) => {
  let topicos: any = [];
  html
    .querySelectorAll('table.listing > tbody > tr')
    .map((linha: HTMLElement) => {
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
};

export const messageParse = (html: HTMLElement) => {
  const array: any = [];

  html
    .querySelector('td.conteudoMensagemForum')
    ?.childNodes.map((child: Node) => {
      child.childNodes.map((child2: Node) => {
        child2.childNodes.map((child3: Node) => {
          if (child3.toString().includes('<a href="')) {
            const link = parse(child3.toString()).querySelector('a')?.attributes
              .href;
            array.push({
              tipo: 'link',
              content: child3.textContent.trim().replace(/&nbsp;/g, '\n'),
              link,
            });
          } else if (
            child3.innerText.length > 1 &&
            child3.innerText != '&nbsp;'
          ) {
            array.push({
              tipo: 'text',
              content: child3.textContent.trim(),
            });
          } else if (
            child3
              .toString()
              .includes('<img style="margin-left: 0px; margin-top: 0px;"') ||
            child3.toString().includes('<img src="data:image/')
          ) {
            const link = parse(child3.toString()).querySelector('img')
              ?.attributes.src;
            array.push({
              tipo: 'image',
              content: link,
            });
          }
        });
      });
    });

  return array;
};

export const parseComments = (html: HTMLElement[]) => {
  const array: any = [];
  html.map((comment: HTMLElement) => {
    const linhas = comment.querySelectorAll('tr');
    const content: any = [];
    linhas[1].childNodes.map((child: Node) => {
      child.childNodes.map((child2: Node) => {
        if (child2.toString().includes('<a href="')) {
          const link = parse(child2.toString()).querySelector('a')?.attributes
            .href;
          content.push({
            tipo: 'link',
            content: child2.textContent
              .trim()
              .replace(/\t/g, '')
              .replace(/\r/g, '')
              .replace('&nbsp;', ''),
            link,
          });
        } else if (
          child2.innerText.length > 1 &&
          child2.innerText != '&nbsp;'
        ) {
          content.push({
            tipo: 'text',
            content: child2.textContent
              .trim()
              .replace(/\t/g, '')
              .replace(/\r/g, '')
              .replace('&nbsp;', ''),
          });
        } else if (
          child2
            .toString()
            .includes('<img style="margin-left: 0px; margin-top: 0px;"') ||
          child2.toString().includes('<img src="data:image/')
        ) {
          const link = parse(child2.toString()).querySelector('img')?.attributes
            .src;
          content.push({
            tipo: 'image',
            content: link,
          });
        }
      });
    });
    array.push({
      index: linhas[0].textContent.trim().replace(/\t/g, '').replace(/\n/g, ''),
      contents: content,
    });
  });
  return array;
};

export const noticiaParse = (html: HTMLElement | null) => {
  const array: any = [];
  if (html) {
    html
      .querySelector('div.descricaoOperacao')
      ?.childNodes.map((child: Node) => {
        child.childNodes.map((child2: Node) => {
          if (child2.toString().includes('<a href="')) {
            const link = parse(child2.toString()).querySelector('a')?.attributes
              .href;
            array.push({
              tipo: 'link',
              content: child2.textContent
                .trim()
                .replace(/\r/g, '')
                .replace(/&nbsp;/g, ''),
              link,
            });
          } else if (
            child2.innerText.length > 1 &&
            child2.innerText != '&nbsp;'
          ) {
            array.push({
              tipo: 'text',
              content: child2.innerText
                .trim()
                .replace(/\n/g, '\t\t\t\t')
                .replace(/&nbsp;/g, ''),
            });
          } else if (
            child2.toString().includes('<img src="/shared/verImagem?') ||
            child2.toString().includes('<img src="data:image/')
          ) {
            const link = parse(child2.toString()).querySelector('img')
              ?.attributes.src;
            array.push({
              tipo: 'image',
              content: link?.includes('https://')
                ? link
                : 'https://sig.ifsudestemg.edu.br' + link,
            });
          }
        });
      });
  }
  return array;
};

function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && (isFinite(n) || Number.isInteger(n));
}

export const parseGrupo = (html: HTMLElement) => {
  let array = {
    tipo: 'grupo',
    titulo: html
      .querySelectorAll('table.formAva > tbody > tr')[0]
      .textContent.trim()
      .replace(/\t/g, '')
      .replace(/\n/g, ''),
    num: html
      .querySelectorAll('table.formAva > tbody > tr')[1]
      .textContent.trim()
      .replace(/\t/g, '')
      .replace(/\n/g, ''),
    alunos: <any>[],
  };

  html
    .querySelectorAll('table.participantes')[0]
    ?.querySelectorAll('tr')
    .map((linha: any) => {
      const coluna = linha.querySelectorAll("td[valign='top']");
      coluna.map((aluno: any) => {
        array.alunos.push({
          descricao: aluno?.textContent
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, ''),
        });
      });
    });
  return array;
};

export async function set() {
  await AsyncStorage.setItem('back', 'true');
}

export async function onDisplayNotification(
  name: string,
  path: string,
  mimetype: string,
  terminate: boolean = false,
) {
  await notifee.requestPermission();
  await notifee.displayNotification({
    title: `Arquivo ${name} baixado!`,
    id: 'notif',
    body: `Localização do arquivo: ${path}`,
    android: {
      channelId: await useChannelId(),
      smallIcon: 'ic_stat_name',
      importance: AndroidImportance.HIGH,
      groupSummary: true,
      groupId: '123',
      actions: [
        {
          title: 'Abrir',
          pressAction: {
            id: 'abrir',
          },
        },
      ],
    },
  });
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction}: any = detail;
    if (type === EventType.ACTION_PRESS && pressAction.id === 'abrir') {
      ReactNativeBlobUtil.android.actionViewIntent(
        `/storage/emulated/0/Android/media/com.sigaa/SIGAA/${name}`,
        mimetype,
      );
      await notifee.cancelNotification(notification.id);
    }
  });
}
