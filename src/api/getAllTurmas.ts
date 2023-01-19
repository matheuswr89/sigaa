import axios from 'axios';
import * as cheerio from 'cheerio';
import {parse} from 'node-html-parser';

export const getAllTurmas = async (
  setTurmasAnteriores: any,
  setLoading: any,
) => {
  setLoading(true);
  const response = await axios.get(
    'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
  );
  const $ = cheerio.load(response.data);
  const turmas = parse($.html());
  setLoading(false);
  setTurmasAnteriores(turmas);
};
