import axios from 'axios';
import * as cheerio from 'cheerio';
import parse, { HTMLElement } from 'node-html-parser';
import { headers, recordErrorFirebase } from '../utils/globalUtil';

export const fetchData = async (
  att: any,
  setLoading: any,
  setContent: any,
  setLink: any,
  tipo: number,
  javax?: string,
  controller?: any,
) => {
  try {
    const url =
      tipo === 0
        ? 'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf'
        : 'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf';
    if (att) {
      let payload: any = {};
      if (tipo === 0)
        payload = {
          formAtividades: 'formAtividades',
          'javax.faces.ViewState': att.javax,
          ...JSON.parse(att.json.replace(/'/g, '"')),
        };
      else
        payload = {
          ...JSON.parse(att.link.replace(/'/g, '"')),
          formAva: 'formAva',
          'formAva:idTopicoSelecionado': 0,
          'javax.faces.ViewState': javax,
        };

      const response = await axios.post(url, payload, {
        headers,
        signal: controller.signal,
      });
      // const response = await NativeModules.PythonModule.post(
      //   url,
      //   JSON.stringify(payload),
      // );
      const $: cheerio.CheerioAPI = cheerio.load(response.data);
      const root: HTMLElement | null = parse($.html()).querySelector(
        '#conteudo',
      );
      setLoading(false);
      if (root?.querySelector('ul[class="form"]')) {
        const allLink = root
          ?.querySelectorAll('ul[class="form"] > li')[2]
          .querySelector('a');
        setContent(root?.querySelectorAll('ul[class="form"] > li'));
        setLink('');
        setLink('https://sig.ifsudestemg.edu.br' + allLink?.attributes.href);
      } else if (root?.querySelector('ul.erros')) {
        setContent(root?.querySelectorAll('ul.erros'));
      } else {
        setContent(root?.querySelectorAll('center'));
      }
    }
  } catch (e: any) {
    recordErrorFirebase(e, '-modalAtividades');
  }
};
