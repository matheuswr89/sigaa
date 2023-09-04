export const parseComments = (html: NodeListOf<Element>) => {
  const array: any[] = [];

  html.forEach((comment: Element) => {
    const linhas = comment.querySelectorAll('tr');

    array.push({
      index: linhas[0].textContent
        ?.trim()
        .replace(/\t/g, '')
        .replace(/\n/g, ''),
      contents: linhas[1]?.innerHTML?.trim().replace(/style="([^"]*)"/gm, ''),
    });
  });

  return array;
};
