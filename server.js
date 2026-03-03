const express = require('express');
const app = express();
const lesson1Controller = require('./controllers/lesson1');
const port = process.env.PORT || 3000;

app.get('/', lesson1Controller.belindaRoute);

// Alternatively, we could just put the function here instead of importing it from the controller file
// (req, res) => {
//   res.send('My Belinda is a very good girl');
// }

app.get('/ysamie', lesson1Controller.ysamieRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});