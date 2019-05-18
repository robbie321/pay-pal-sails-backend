module.exports = {
  index(req, res) {
    console.log('It Works');
    res.status(200).send('OK');
    res.end();
  },
};

// export default IPNController;
