const modalReducers = {
  setIsModalOpen: (state, payload) => {
    const { isModalOpen } = payload;

    return {
      ...state,
      isModalOpen,
    };
  },

  openModal: (state) => ({
    ...state,
    isModalOpen: true,
  }),

  closeModal: (state) => {
    const { temporaryDiagram } = state;

    return {
      ...state,
      autolayout: false,
      isModalOpen: false,
      diagram: temporaryDiagram,
    };
  },
};

export default modalReducers;
