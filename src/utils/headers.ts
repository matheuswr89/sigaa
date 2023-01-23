const headerBase = {
  "sec-ch-ua":
    '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "cache-control": "max-age=0",
  "content-type": "application/x-www-form-urlencoded",
  cookie:
    "_ga=GA1.3.654998053.1648578671; _gid=GA1.3.1932525244.1659216266; JSESSIONID=525FEEB8F0A43737D3B4F53AD6936203.node12",
};

export const headerLogin = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/verTelaLogin.do",
};

export const headers2 = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
};

export const headers3 = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
};

export const headers4 = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf",
};

export const headers5 = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf",
};

export const headerDownload = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
};

export const headerMedio = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
};
export const headerTarefa = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf",
};

export const headerTopico = {
  ...headerBase,
  origin: "https://sig.ifsudestemg.edu.br",
  referer: "https://sig.ifsudestemg.edu.br/sigaa/ava/ForumTurma/lista.jsf",
};
