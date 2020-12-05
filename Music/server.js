const path = require('path');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, function () {
  console.log('Example app listening on port ' + 5000 + '!');
});
