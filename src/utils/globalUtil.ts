import AsyncStorage from '@react-native-async-storage/async-storage';

import parse from 'node-html-parser';

export async function set() {
  await AsyncStorage.setItem('back', 'true');
}

export async function setTipoAluno(tipo = 'graduacao') {
  await AsyncStorage.setItem('tipoAluno', tipo);
}

export function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && (isFinite(n) || Number.isInteger(n));
}

export function handleBackButtonClick(controller: any, navigation: any) {
  set();
  controller.abort();
  navigation.goBack();
  return true;
}

export const replaceAll = (content: string) => {
  return content
    ?.trim()
    ?.replace(/\n/g, ' ')
    ?.replace(/\t/g, '')
    ?.replace(/\r/g, '')
    ?.replace(/<i>|<\/i>\s*<\/small>/gm, '')
    ?.replace(/\s\s/g, '');
};

export const replaceIfEmpty = (match: any, args: any[]) => {
  const content = parse(match);

  if (content.innerHTML.includes('img')) {
    if (!content.querySelector('img')?.attributes.src.includes('http')) {
      content
        .querySelector('img')
        ?.setAttribute(
          'src',
          'https://sig.ifsudestemg.edu.br' +
            content.querySelector('img')?.attributes.src,
        );
    }
    return content.innerHTML;
  }

  if (content.textContent.length < 5) {
    return '';
  }

  if (content.innerText === '&nbsp;') {
    return '';
  }
  return match;
};

export const replaceHeader = (match: string, args: any[]) => {
  let fileName = match.split('filename="')[1].replace('""', '');
  return `"${fileName}"`;
};
