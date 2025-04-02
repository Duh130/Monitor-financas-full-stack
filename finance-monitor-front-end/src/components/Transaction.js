import { useEffect, useState } from "react";
import api from "../services/api";
import "../components/Transaction.css"

export default function Transaction() {
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        api.get("/transactions")
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar transações:", error);
            });
    }, []);

    return (
        <div>
            <h2>Transações</h2>
            <ul>
                {transaction.map((transaction) => (
                    <li key={transaction.id}>
                        <strong>{transaction.description}</strong>
                        <p>{transaction.amount}</p>
                        <p>{transaction.type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
