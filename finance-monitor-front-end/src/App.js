import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from './components/Transaction.js';
import './components/Transaction.css';

function App() {
  const [transaction, setTransaction] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    // Altere a URL para o endereço correto do seu backend
    axios.get('http://localhost:3000/api/transactions') // Corrigido para a porta 3000
      .then(response => {
        setTransaction(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar as transações:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      description,
      amount,
      type,
    };

    // Alterando a URL para a porta 3000
    axios.post('http://192.168.0.112:3000/api/transactions', newTransaction)
      .then(response => {
        setTransaction([...transaction, response.data]);
        setDescription('');
        setAmount('');
        setType('');
      })
      .catch(error => {
        console.error('Erro ao adicionar transação:', error);
      });
  };

  return (
    <div>
      <h1>Monitor de Finanças</h1>

      <Transaction transaction={transaction} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Selecione o tipo</option>
          <option value="entrada">Entrada</option>
          <option value="saída">Saída</option>
        </select>
        <button type="submit">Adicionar Transação</button>
      </form>
    </div>
  );
}

export default App;
