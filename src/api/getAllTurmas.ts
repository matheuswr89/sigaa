import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { PythonModule } from "./api";

export const getAllTurmas = async (
  setTurmasAnteriores: any,
  setLoading: any
) => {
  setLoading(true);
  const response = await PythonModule.get(
    "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf"
  );
  const $ = cheerio.load(response);
  const turmas = parse($.html());
  setTurmasAnteriores(turmas);
  setLoading(false);
};
