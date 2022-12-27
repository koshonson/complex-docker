import { useEffect, useState } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    async function fetchValues() {
      const values = await axios.get('/api/values/current');
      setValues(values.data);
    }

    async function fetchIndexes() {
      const seenIndexes = await axios.get('/api/values/all');
      setSeenIndexes(seenIndexes.data);
    }

    fetchValues();
    fetchIndexes();
  }, []);

  function renderSeenIndexes() {
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  function renderCalculatedValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/values', { index });
    setIndex('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='input'>Enter your index:</label>
        <input id='input' type='text' value={index} onChange={e => setIndex(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderCalculatedValues()}
    </div>
  );
};

export default Fib;
