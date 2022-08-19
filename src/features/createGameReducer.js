export const initialCreateGameState = {
  name: "",
  options: {
    numPlayers: 3,
    setupData: { rounds: 12 },
    unlisted: false,
  },
  customCards: [],
};

export default function createGameReducer(state, { name, checked, value }) {
  switch (name) {
    case "customCards":
      return {
        ...state,
        customCards: checked,
      };
    case "nickname":
      return {
        ...state,
        name: value,
      };
    case "rounds":
      return {
        ...state,
        options: {
          ...state.options,
          setupData: { rounds: value },
        },
      };
    case "unlisted":
      return {
        ...state,
        options: {
          ...state.options,
          [name]: checked,
        },
      };
    case "options1":
      return {
        ...state,
        options: {
          ...state.options,
          setupData: {
            ...state.options.setupData,
            remotePromptDeck: value,
          },
        },
      };
    case "options2":
      return {
        ...state,
        options: {
          ...state.options,
          setupData: {
            ...state.options.setupData,
            remoteAnswerDeck: value,
          },
        },
      };
    default:
      localStorage.setItem("players", value);

      return {
        ...state,
        options: {
          ...state.options,
          [name]: value,
        },
      };
  }
}