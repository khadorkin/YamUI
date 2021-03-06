/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import { mergeStyleSets } from '@uifabric/styling';
import { memoizeFunction } from '@uifabric/utilities';
import { getTheme } from '../../util/colors';
import { getGutterValue } from '../../util/styles/gutters';
import { borderStylePopOver } from '../../util/styles/borders';

export interface SuggestionsListStyleProps {
  isLoading?: boolean;
  hasResults: boolean;
}

export interface SuggestionsListClassNames {
  root: string;
  spinnerWrapper: string;
  noResultsWrapper: string;
}

const getMemoizedClassNames = memoizeFunction((styleProps, theme): SuggestionsListClassNames => {
  const { isLoading, hasResults } = styleProps;

  return mergeStyleSets({
    root: {
      ...borderStylePopOver,
      width: '280px',
      paddingTop: hasResults ? getGutterValue(1) : undefined,
      paddingBottom: hasResults && !isLoading ? getGutterValue(1) : undefined,
    },
    spinnerWrapper: {
      paddingBottom: '14px',
      paddingTop: hasResults ? '13px' : '14px',
      borderTop: hasResults ? `1px solid ${theme.palette.neutralLighter}` : undefined,
    },
    noResultsWrapper: {
      paddingTop: '15px',
      paddingBottom: '17px',
    },
  });
});

export const getClassNames = (styleProps: SuggestionsListStyleProps) => {
  const theme = getTheme();
  return getMemoizedClassNames(styleProps, theme);
};
