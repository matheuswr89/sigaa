import { recordErrorFirebase } from '../../../../utils/globalUtil';

export const parseQuestionarios = (html: any, navigation: any) => {
  try {
    const array = {
      questionarios: <any>[],
    };

    const linhas = html?.querySelectorAll('tr');
    linhas?.forEach((lin: any) => {
      const allCollums = lin.querySelectorAll('td');
      if (allCollums[2] !== undefined) {
        const questionario = {
          titulo: allCollums[0].textContent,
          inicio: allCollums[1].textContent,
          fim: allCollums[2].textContent,
        };
        array.questionarios.push(questionario);
      }
    });

    return array;
  } catch (e) {
    recordErrorFirebase(e, '-parseQuestionarios');
    navigation.goBack();
  }
};
