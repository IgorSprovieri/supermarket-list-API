const validations = {
  validateIdObject: (IdObject) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(IdObject);
  },

  validateNumber: (Number) => {
    const regex = /^\d+$/;
    return regex.test(Number);
  },
};

module.exports = validations;
