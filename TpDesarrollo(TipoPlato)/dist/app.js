import express from 'express';
import { Characters } from './tipoPlato.js';
const app = express();
const tipoPlato = [
    new TipoPlato('Sevastian Villa', 'Luchador', 15, 1000, 6000, 1000, ['Boca', 'Vilaaaaaaa'], 'fffros453od-sdasdd44-da453dad-3hdfdg33-dd6565d-dddd88')
];
app.get('/api/characters', (req, res) => {
    res.json(tipoPlato);
});
/*app.use('/',(req, res) => {
  res.send('Hello!!')
})*/
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
//# sourceMappingURL=app.js.map