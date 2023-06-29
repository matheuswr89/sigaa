import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { api } from "./api";

export const getEnquete = async (
  json: any,
  setLoading: any,
  setHtml: any,
  controller: any,
  tipo: number
) => {
  if (json) {
    setLoading(true);
    const url =
      tipo === 1
        ? "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf"
        : "https://sig.ifsudestemg.edu.br/sigaa/ava/Enquete/listar.jsf";
    const response = await api.post(
      "/acesso-post",
      {
        url,
        data: json,
      },
      { signal: controller.signal }
    );

    const $ = cheerio.load(response.data.content);
    const root = parse($.html());
    setLoading(false);
    if (root.querySelector("div#conteudo")) {
      setHtml(root);
    } else {
    }
  }
};
