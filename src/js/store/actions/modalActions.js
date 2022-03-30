const modalActions = [
  {
    name: 'setIsModalOpen',
    action: (isModalOpen) => ({
      type: 'setIsModalOpen',
      payload: { isModalOpen },
    }),
  },

  {
    name: 'closeModal',
    action: () => ({
      type: 'closeModal',
    }),
  },

  {
    name: 'openModal',
    action: () => ({
      type: 'openModal',
    }),
  },
];

export default modalActions;
