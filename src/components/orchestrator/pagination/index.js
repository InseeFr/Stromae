import { useMediaQuery } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import React from 'react';

// const SwipeComponent = bindKeyboard(SwipeableViews);
const SwipeComponent = SwipeableViews;

const Pagination = ({
  componentsPages,
  currentPage,
  setCurrentPage,
  validated,
  onNext,
}) => {
  const mobile1 = useMediaQuery(
    '(max-width:500px) and (orientation: portrait)'
  );
  const mobile2 = useMediaQuery(
    '(max-height:500px) and (orientation: landscape)'
  );

  const changePage = index => {
    console.log('changeing');
  };

  const isMobileDevice = mobile1 || mobile2;

  const currentIndex =
    currentPage >= 0 ? currentPage : componentsPages.length - 1;

  return (
    <>
      {isMobileDevice && (
        <SwipeComponent
          index={currentIndex}
          onChangeIndex={setCurrentPage}
          resistance
          disabled={validated}
          onTransitionEnd={onNext}
        >
          {componentsPages}
        </SwipeComponent>
      )}
      {!isMobileDevice && componentsPages[currentIndex]}
    </>
  );
};

export default Pagination;
