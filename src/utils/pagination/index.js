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
