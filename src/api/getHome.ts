import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { api } from "./api";
import { getAllTurmas } from "./getAllTurmas";

export const getHome = async (
  link: string | null,
  setHtml: any,
  setLoading: any,
  setTurmasAnteriores: any
) => {
  if (link) {
    if (setLoading !== null) setLoading(true);
    const response = await api.post("/acesso-get", {
      url: "https://sig.ifsudestemg.edu.br/" + link,
    });
    const $ = cheerio.load(response.data.content);
    const turmas = parse($.html());
    setHtml(turmas);
    setLoading(false);
  }
  getAllTurmas(setTurmasAnteriores, setLoading);
};
