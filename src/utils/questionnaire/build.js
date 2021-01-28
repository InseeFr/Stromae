import D from 'i18n';
import * as lunatic from '@inseefr/lunatic';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

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
  let seqPage = 0;
  let idSeq;
  let subseqLabel;
  let subseqPage = 0;
  let idSubseq;
  let currentPage = 0;
  return Array.isArray(components)
    ? components.reduce((_, component) => {
        const { componentType, label, id, declarations } = component;
        if (
          componentType &&
          !['Sequence', 'Subsequence', 'FilterDescription'].includes(
            componentType
          )
        ) {
          currentPage += 1;
          return [
            ..._,
            {
              ...component,
              idSequence: idSeq,
              idSubsequence: idSubseq,
              sequence: { label: seqLabel, page: seqPage },
              subsequence:
                subseqLabel && subseqPage
                  ? { label: subseqLabel, page: subseqPage }
                  : null,
              page: currentPage,
            },
          ];
        }
        if (componentType === 'Sequence') {
          currentPage += 1;
          idSeq = id;
          seqLabel = label;
          seqPage = currentPage;
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
                    label: '"coucou"',
                  },
                ]
              : declarations;
          return [
            ..._,
            {
              ...component,
              labelNav: label,
              label: '',
              declarations: newDeclarations,
              sequence: { label: seqLabel, page: seqPage },
              page: currentPage,
            },
          ];
        }
        if (componentType === 'Subsequence') {
          idSubseq = id;
          subseqLabel = label;
          subseqPage = currentPage + 1;
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
                goToPage: currentPage + 1,
              },
            ];
          }
          currentPage += 1;
          return [
            ..._,
            {
              ...component,
              labelNav: label,
              label: '',
              sequence: { label: seqLabel, page: seqPage },
              subsequence: { label: subseqLabel, page: subseqPage },
              idSequence: idSeq,
              goToPage: currentPage,
              page: currentPage,
            },
          ];
        }
        if (componentType === 'FilterDescription') {
          return [
            ..._,
            {
              ...component,
              idSequence: idSeq,
              idSubsequence: idSubseq,
              sequence: { label: seqLabel, page: seqPage },
              subsequence:
                subseqLabel && subseqPage
                  ? { label: subseqLabel, page: subseqPage }
                  : null,
            },
          ];
        }
        return _;
      }, [])
    : [];
};
