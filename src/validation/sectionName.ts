export const sectionNameValidation = (sectionName: string): boolean => {
  const kebabCasePattern = /^[a-z]+(-[a-z]+)*$/;

  const isMatchedKebabCase = sectionName.match(kebabCasePattern);
  if (isMatchedKebabCase) {
    return true;
  }

  return false;
};
