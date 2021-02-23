// page 1 du questionnaire -> 1er composants
const simplePage = { page: 1 };

// page 6 de la 5è iterations de la boucle
const pageInLoop = { iteration: 5, page: 6 };

// 3eme composant du questionnaire, 2ème itérations, page 5, 4ème itérations, 7ème composants
const pageInLoopInLoopInQuestionnaire = [3, 2, 5, 4, 7];
const v2 = { page: 3 };

const sequencePagination = 'sequence';
const subsequencePagination = 'subsequence';
// const questionPagination = 'question';

export const getListOfPages = pagination => components => {
  if (pagination === sequencePagination) {
    return components.filter(
      ({ componentType }) =>
        componentType === 'Sequence' || componentType === 'Loop'
    );
  }
  if (pagination === subsequencePagination) {
    return components.filter(
      ({ componentType }) => componentType === 'Subsequence'
    );
  }
  return components;
};

export const getComponentsOfSequence = components => sequenceId =>
  components.filter(({ idSequence }) => idSequence === sequenceId);
