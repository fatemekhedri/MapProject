import { CHANGE_LANGUAGE } from "../actions/language";
import languages from "../utility/consts/languages.json";
import messages from "../i18n";
const initialState = {
  ...languages["fa"],
  messages: messages["fa"],
};

/**
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        ...languages[action.language],
        messages: messages[action.language],
      };
    default:
      return state;
  }
}
