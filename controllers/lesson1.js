const belindaRoute = (req, res) => {
  res.send('My Belinda is a very good girl');
};

const ysamieRoute = (req, res) => {
  res.send('My Ysamie is a very good baby girl');
};

module.exports = {
  belindaRoute,
  ysamieRoute
};