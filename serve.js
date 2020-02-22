const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

function setHeaders(res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
}

app.use(express.static('public', { setHeaders }));
app.use('/dist', express.static('dist', { setHeaders }));
app.listen(port, () => console.log(`http://localhost:${port}`));
