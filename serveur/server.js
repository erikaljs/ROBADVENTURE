const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

app.use(express.static(path.resolve(__dirname, '../game')));


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..//game/index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur Express en cours d'exécution sur http://localhost:${PORT}/`);
});
