const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITE': {
      // para evitar tener items repetidos en myList
      const arr = state.myList.map((item) => item.id);
      if (arr.includes(action.payload.id)) return state;
      return {
        // traemos el state previo
        ...state,
        // que elemento voy a actualizar
        myList: [
          // traemos el state previo de myList
          ...state.myList,
          // añadimos la infomación de la acción
          action.payload,
        ],
      };
    };

    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter((item) => item.id !== action.payload),
      };

    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        playing: state.trends.find((item) => item.id === Number(action.payload)) ||
              state.originals.find((item) => item.id === Number(action.payload)) ||
              {},
      };

    default:
      return state;
  }
};

export default reducer;
