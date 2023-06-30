import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { PythonModule } from "./api";

export const getVinculos = async (setHtml: any, setLoading: any) => {
  const response = await PythonModule.get(
    "https://sig.ifsudestemg.edu.br/sigaa/vinculos.jsf"
  );
  const $ = cheerio.load(response);
  const turmas = parse($.html());
  setHtml(turmas);
  setLoading(false);
};
