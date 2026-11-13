import React, { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');

  const income = items
    .filter((x) => x.type === 'Income')
    .reduce((s, x) => s + x.amount, 0);

  const expense = items
    .filter((x) => x.type === 'Expense')
    .reduce((s, x) => s + x.amount, 0);

  function addItem(e) {
    e.preventDefault();
    if (!name.trim() || Number(amount) <= 0) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        name,
        amount: Number(amount),
        type,
      },
    ]);

    setName('');
    setAmount('');
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1>💰 Expense Tracker</h1>
        <p>Manage your money smartly!</p>

        <div style={s.balance}>
          <p>Total Balance</p>
          <h1>₹{income - expense}</h1>
        </div>

        <div style={s.stats}>
          <div style={s.box}>
            <p>Income</p>
            <h2 style={{ color: 'green' }}>₹{income}</h2>
          </div>
          <div style={s.box}>
            <p>Expenses</p>
            <h2 style={{ color: 'red' }}>₹{expense}</h2>
          </div>
        </div>

        <h3>Add Transaction</h3>
        <form onSubmit={addItem}>
          <input
            style={s.input}
            placeholder="Transaction name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={s.input}
            type="number"
            min="0.01"
            step="any"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            style={s.input}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Expense</option>
            <option>Income</option>
          </select>
          <button style={s.button}>+ Add Transaction</button>
        </form>

        <h3>Transaction History</h3>
        {items.length === 0 && <p>No transactions yet.</p>}

        {items.map((item) => (
          <div key={item.id} style={s.transaction}>
            <span>
              {item.name} ({item.type})
            </span>
            <strong>₹{item.amount}</strong>
            <button
              style={s.delete}
              onClick={() => setItems(items.filter((x) => x.id !== item.id))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg,#172554,#6d28d9)',
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 15px',
    fontFamily: 'Arial',
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '18px',
    width: '100%',
    maxWidth: '500px',
    height: 'fit-content',
  },
  balance: {
    background: '#6d28d9',
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
  },
  stats: {
    display: 'flex',
    gap: '15px',
    margin: '20px 0',
  },
  box: {
    flex: 1,
    background: '#f1f5f9',
    padding: '12px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px',
    marginBottom: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#6d28d9',
    color: 'white',
    border: 0,
    borderRadius: '8px',
    cursor: 'pointer',
  },
  transaction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 0',
    borderBottom: '1px solid #ddd',
  },
  delete: {
    color: 'red',
    border: 0,
    background: 'white',
    cursor: 'pointer',
  },
};
