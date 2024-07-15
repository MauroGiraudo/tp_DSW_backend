import express from 'express';
import { Plato } from './plato.js';
const app = express();
const platos = [
    new Plato('Sevastian Villa', 'Luchador', 15, 1000, 6000, 1000, ['Boca', 'Vilaaaaaaa'], 'fffros453od-sdasdd44-da453dad-3hdfdg33-dd6565d-dddd88')
];
app.get('/api/platos', (req, res) => {
    res.json(platos);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
