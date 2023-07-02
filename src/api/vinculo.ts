import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { NativeModules } from 'react-native';

export const getVinculos = async (setHtml: any, setLoading: any) => {
  const response = await NativeModules.PythonModule.get(
    'https://sig.ifsudestemg.edu.br/sigaa/vinculos.jsf',
  );
  const $ = cheerio.load(response);
  const turmas = parse($.html());
  setHtml(turmas);
  setLoading(false);
};
