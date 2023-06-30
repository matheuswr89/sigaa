import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { PythonModule } from "./api";
import { getAllTurmas } from "./getAllTurmas";

export const getHome = async (
  link: string | null,
  setHtml: any,
  setLoading: any,
  setTurmasAnteriores: any
) => {
  setLoading(true);
  if (link) {
    const response = await PythonModule.get(
      "https://sig.ifsudestemg.edu.br/" + link
    );
    const $ = cheerio.load(response);
    const turmas = parse($.html());
    setHtml(turmas);
    setLoading(false);
  }
  getAllTurmas(setTurmasAnteriores, setLoading);
};
