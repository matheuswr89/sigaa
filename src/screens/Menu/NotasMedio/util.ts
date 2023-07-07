import { HTMLElement, Node } from 'node-html-parser';
import { recordErrorFirebase } from '../../../utils/globalUtil';

export const parseDados = (html: HTMLElement, navigation: any) => {
  try {
    let dados: any[] = [];
    const linhas = html
      .querySelectorAll('table.listagem')[0]
      ?.querySelectorAll('tr');

    linhas.shift();
    linhas.pop();
    linhas.forEach(lin => {
      const childNodes: any = lin.childNodes.filter(
        lin => lin && lin.toString().trim().length > 0,
      );
      childNodes.forEach((child: Node, index: number) => {
        if (index % 2 === 0) {
          dados.push(child.innerText.trim());
        }
        if (index % 2 !== 0) {
          dados[dados.length - 1] += ` ${child.innerText.trim()}`;
        }
      });
    });
    return dados;
  } catch (e) {
    recordErrorFirebase(e, '-parseDados');
    navigation.goBack();
  }
};

export const parseNotas = (html: HTMLElement, navigation: any) => {
  try {
    let notas = [];
    const linhas = html
      .querySelectorAll('table.listagem')[1]
      ?.querySelectorAll('tr');
    for (let i = 1; i < linhas.length - 2; i++) {
      notas.push({
        disciplina: linhas[i].querySelectorAll('td')[0].textContent.trim(),
        bimestre1: linhas[i].querySelectorAll('td')[1].textContent.trim(),
        recBimestre1: linhas[i].querySelectorAll('td')[2].textContent.trim(),
        bimestre2: linhas[i].querySelectorAll('td')[3]?.textContent.trim(),
        recBimestre2: linhas[i].querySelectorAll('td')[4]?.textContent.trim(),
        bimestre3: linhas[i].querySelectorAll('td')[5]?.textContent.trim(),
        recBimestre3: linhas[i].querySelectorAll('td')[6]?.textContent.trim(),
        bimestre4: linhas[i].querySelectorAll('td')[7]?.textContent.trim(),
        recBimestre4: linhas[i].querySelectorAll('td')[8]?.textContent.trim(),
        provaFinal: linhas[i].querySelectorAll('td')[9]?.textContent.trim(),
        faltas: linhas[i].querySelectorAll('td')[10]?.textContent.trim(),
        final: linhas[i].querySelectorAll('td')[11]?.textContent.trim(),
        situacao: linhas[i].querySelectorAll('td')[12]?.textContent.trim(),
      });
    }
    return notas;
  } catch (e) {
    recordErrorFirebase(e, '-parseNotas');
    navigation.goBack();
  }
};
