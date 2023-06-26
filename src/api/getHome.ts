import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { api, payloadUser } from "./api";
import { getAllTurmas } from "./getAllTurmas";

export const getHome = async (
  link: string,
  setHtml: any,
  setLoading: any,
  setTurmasAnteriores: any
) => {
  if (setLoading !== null) setLoading(true);
  const response = await api.post("/acesso-get", {
    url: "https://sig.ifsudestemg.edu.br/" + link,
    data: await payloadUser(),
  });
  const $ = cheerio.load(response.data.content);
  const turmas = parse($.html());
  setHtml(turmas);
  setLoading(false);
  getAllTurmas(setTurmasAnteriores, setLoading, link);
};
