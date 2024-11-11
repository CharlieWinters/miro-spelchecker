export const getWidgetsText = (count: number): string => {
  return count === 1 ? "1 widget" : `${count} widgets`;
};

export const getSuggestionsText = (count: number): string => {
  return count === 1 ? "1 suggestion" : `${count} suggestions`;
};

export const getSpellingChecksText = (
  current: number,
  total: number
): string => {
  if (total === 1) {
    return "1 spelling check";
  }

  return `${current} of ${total} spelling checks`;
};

export const getSelectionCheckedText = (count: number): string => {
  if (count === 1) {
    return "Selected widget has been checked";
  }

  return "Selected widgets have been checked";
};
