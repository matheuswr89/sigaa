import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { PythonModule } from "./api";

export const getEnquete = async (
  json: any,
  setLoading: any,
  setHtml: any,
  controller: any,
  tipo: number
) => {
  if (json) {
    const url =
      tipo === 1
        ? "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf"
        : "https://sig.ifsudestemg.edu.br/sigaa/ava/Enquete/listar.jsf";
    const response = await PythonModule.post(url, JSON.stringify(json));

    const $ = cheerio.load(response);
    const root = parse($.html());
    setLoading(false);
    if (root.querySelector("div#conteudo")) {
      setHtml(root);
    } else {
    }
  }
};
