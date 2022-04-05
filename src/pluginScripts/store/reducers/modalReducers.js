const reducers = {
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

  closeModal: (state) => ({
    ...state,
    isModalOpen: false,
  }),
};

export default reducers;
