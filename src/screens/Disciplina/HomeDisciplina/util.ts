import { HTMLElement } from 'node-html-parser';
import { recordErrorFirebase } from '../../../utils/globalUtil';

export const parseHomeDisciplina = (html: HTMLElement, navigation: any) => {
  try {
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
          let name = ele?.textContent
            .trim()
            .split('new DnD')[0]
            .trim()
            .replace(/\r/g, '')
            .replace(/\t/g, '')
            .replace(/\n/g, '');
          if (String(ele?.innerHTML).includes('href')) {
            const onclick =
              ele?.getElementsByTagName('a')[0]?.attributes.onclick;
            if (onclick) {
              if (
                onclick.includes('idEnviar') ||
                onclick.includes('idMostrar')
              ) {
                link = onclick.substring(
                  onclick.indexOf("'),{'") + 3,
                  onclick.indexOf("'},'');}") + 2,
                );
              } else {
                link = onclick.substring(
                  onclick.indexOf("'),{'") + 3,
                  onclick.indexOf("'},'_blank'") + 2,
                );
              }
            }
          }
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
                    ? ele?.childNodes[0]?.childNodes[2]?.childNodes[i]
                        ?.attributes?.src
                    : 'https://sig.ifsudestemg.edu.br' +
                      ele?.childNodes[0]?.childNodes[2]?.childNodes[i]
                        ?.attributes?.src;
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
            name = name.split('function')[0];
            tipo = 'iframe';
            link = ele.getElementsByTagName('iframe')[0].attributes.src;
          } else if (
            String(ele.innerHTML).includes('href') &&
            ele.querySelector("a[target='_blank']") !== undefined &&
            ele.getElementsByTagName('a')[0].attributes.href !== '#'
          ) {
            tipo = 'link';
            link = ele.getElementsByTagName('a')[0].attributes.href;
          } else if (
            ele.innerHTML &&
            ele?.querySelector('a[id$="idEnviarMaterialTarefa"]')
          ) {
            tipo = 'atividade';
          } else if (
            ele.innerHTML &&
            ele?.querySelector('a[id$="idMostrarForum"]')
          ) {
            tipo = 'forum';
          } else if (
            ele.innerHTML &&
            ele?.querySelector('a[id$="idMostrarEnquete"]')
          ) {
            tipo = 'enquete';
          } else if (
            ele.innerHTML &&
            ele.querySelector('a[id$="idEnviarMaterialQuestionario"]')
          ) {
            tipo = 'questionario';
          } else if (
            String(ele.innerHTML).includes(
              '<a href="#" onclick="if(typeof jsfcljs',
            )
          ) {
            tipo = 'arquivo';
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
  } catch (e) {
    recordErrorFirebase(e, '-parseHomeDisciplina');
    navigation.goBack();
  }
};
