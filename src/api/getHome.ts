import axios from 'axios';
import * as cheerio from 'cheerio';
import {parse} from 'node-html-parser';
import {getAllTurmas} from './getAllTurmas';

export const getHome = async (
  link: string,
  setHtml: any,
  setLoading: any,
  setTurmasAnteriores: any,
) => {
  if (setLoading !== null) setLoading(true);
  const response = await axios.get('https://sig.ifsudestemg.edu.br/' + link);
  const $ = cheerio.load(response.data);
  const turmas = parse($.html());
  setHtml(turmas);
  setLoading(false);
  getAllTurmas(setTurmasAnteriores, setLoading);
};
