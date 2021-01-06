module.exports = {
  prueba: function (headers) {
    console.log(headers);

    return JSON.stringify({
      resolve: 'hola',
    });
  },
};
