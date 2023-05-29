export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

/**
 * @param {String} language
 * @return {Object}
 */
export function changeLanguage(language) {
  return {
    type: CHANGE_LANGUAGE,
    language,
  };
}
