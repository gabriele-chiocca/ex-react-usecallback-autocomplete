import { useEffect, useState, useCallback } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [inputText, setInputText] = useState('');
  const [products, setProducts] = useState([]);

  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const callProducts = useCallback(
    debounce(async (query) => {
      const res = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await res.json();
      console.log(data);
      return setProducts(data);
    }, 800),
    [],
  );

  useEffect(() => {
    if (inputText !== '') {
      callProducts(inputText);
    } else {
      setProducts([]);
    }
  }, [inputText]);

  return (
    <div className="container mt-5">
      <h1>Ecco i prodotti</h1>

      <input
        type="text"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        placeholder="Cerca il prodotto"
      />

      <div className="row">
        <h2>Suggestions</h2>
        {products.map((p, i) => {
          return (
            <div className="col" key={i}>
              <p>{p.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
