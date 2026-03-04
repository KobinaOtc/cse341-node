const belindaRoute = (req, res) => {
  res.send('My Belinda is a very good girl');
};

const ysamieRoute = (req, res) => {
  res.send('My Ysamie is a very good baby girl');
};

const kobbyRoute = (req, res) => {
  res.send('My Kobby is a very good boy');
};

module.exports = {
  belindaRoute,
  ysamieRoute,
  kobbyRoute
};