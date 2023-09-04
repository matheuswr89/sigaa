import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import parse from 'node-html-parser';

export const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'cache-control': 'max-age=0',
  'content-type': 'application/x-www-form-urlencoded',
  'sec-ch-ua':
    '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
};

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
  // NativeModules.PythonModule.cancel();
  controller.abort();
  navigation.goBack();
  return true;
}

export async function recordErrorFirebase(error: any, tela = '') {
  await crashlytics().recordError(error);
  await crashlytics().setAttribute(
    'tela',
    `${await AsyncStorage.getItem('@SIGAA:Router')}${tela}`,
  );
  // NativeModules.PythonModule.cancel();
}

export const fechaModal = (open: any, modalVisible: any, controller: any) => {
  controller.abort();
  // NativeModules.PythonModule.cancel();
  open(!modalVisible);
  set();
};

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
