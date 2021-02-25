/**
 * Function to build questionnaire for stromae.
 * It adds attribute to components
 *   - page : the stromae page
 * It removes empty subsequence
 * It changes declarations of empty sequence to 'Changing the sequence'
 * @param {Array} components
 */
export const buildQuestionnaire = components => {
  let seqLabel;
  let idSeq;
  let subseqLabel;
  let idSubseq;
  return Array.isArray(components)
    ? components.reduce((_, component) => {
        const { componentType, label, id, declarations } = component;
        if (
          componentType &&
          !['Sequence', 'Subsequence', 'Loop', 'FilterDescription'].includes(
            componentType
          )
        ) {
          return [
            ..._,
            {
              ...component,
              idSequence: idSeq,
              idSubsequence: idSubseq,
              sequence: { label: seqLabel },
              subsequence: subseqLabel ? { label: subseqLabel } : null,
              stromaeType: 'Lunatic',
            },
          ];
        }
        if (componentType === 'Loop') {
          idSeq = id;
          idSubseq = '';

          return [
            ..._,
            {
              ...component,
              idSequence: idSeq,
              sequence: { label: seqLabel },
              stromaeType: 'Lunatic',
            },
          ];
        }
        if (componentType === 'Sequence') {
          idSeq = id;
          seqLabel = label;
          subseqLabel = '';
          idSubseq = '';
          /**
           * if there is no declarations, we display a new declaration : D.newSequenceComment (cf Dictionary)
           */
          const newDeclarations =
            !declarations || declarations.length === 0
              ? [
                  {
                    id: `${id}-d1`,
                    declarationType: 'COMMENT',
                    position: 'AFTER_QUESTION_TEXT',
                    label: '"Nouvelle séquence"',
                  },
                ]
              : declarations;
          return [
            ..._,
            {
              ...component,
              labelNav: label,
              // label: '',
              idSequence: idSeq,
              declarations: newDeclarations,
              sequence: { label: seqLabel },
              stromaeType: 'Lunatic',
            },
          ];
        }
        if (componentType === 'Subsequence') {
          idSubseq = id;
          subseqLabel = label;
          /**
           * if there is no declarations, we "delete" this component
           */
          if (!declarations || declarations.length === 0) {
            return [
              ..._,
              {
                ...component,
                labelNav: label,
                idSequence: idSeq,
                stromaeType: 'Lunatic',
              },
            ];
          }
          return [
            ..._,
            {
              ...component,
              labelNav: label,
              label: '',
              sequence: { label: seqLabel },
              subsequence: { label: subseqLabel },
              idSequence: idSeq,
              stromaeType: 'Lunatic',
            },
          ];
        }
        return _;
      }, [])
    : [];
};

export const addConstantPages = components => validatedQuestionnaire => {
  const welcome = { stromaeType: 'welcomePage' };
  const validation = { stromaeType: 'validationPage' };
  const end = { stromaeType: 'endPage' };
  if (validatedQuestionnaire) return [welcome, ...components, validation, end];
  return [welcome, ...components, validation];
};
