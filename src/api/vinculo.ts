import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { api } from "./api";

export const getVinculos = async (setHtml: any, setLoading: any) => {
  if (setLoading !== null) setLoading(true);
  const response = await api.post("/acesso-get", {
    url: "https://sig.ifsudestemg.edu.br/sigaa/vinculos.jsf",
  });
  const $ = cheerio.load(response.data.content);
  const turmas = parse($.html());
  setHtml(turmas);
  setLoading(false);
};
