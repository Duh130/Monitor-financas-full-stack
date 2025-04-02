const express = require('express');
const mysql = require('mysql');  
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados MySQL (ajuste as configurações conforme necessário)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finance_monitor'
});

db.connect((err) => {
    if (err) {
        console.log("Erro na conexão com o banco de dados:", err);
        return;
    }
    console.log("Conectado ao MySQL");
});

// Rota para retornar as transações
app.get('/api/transactions', (req, res) => {
    const query = 'SELECT * FROM transactions'; // Substitua 'transactions' pelo nome da sua tabela no MySQL

    db.query(query, (err, results) => {
        if (err) {
            console.log("Erro ao buscar transações:", err);
            return res.status(500).json({ error: 'Erro ao buscar transações' });
        }
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
