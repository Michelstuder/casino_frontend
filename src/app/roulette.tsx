import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Roulette = () => {
  const [playground, setPlayground] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [gameResult, setGameResult] = useState<any | null>(null);

  useEffect(() => {
    const fetchPlayground = async () => {
      try {
        const response = await axios.get('http://localhost:8080/games/roulette/playground', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Set the authorization header
            credentials: "include" // Allows setting cookies for CORS
          },
        });
        setPlayground(response.data);
      } catch (err) {
        console.error('Error fetching playground:', err);
        setError('Failed to load playground.');
      }
    };

    fetchPlayground();
  }, []);

  const handleBet = async () => {
    // Validate inputs
    if (betAmount === null || betAmount <= 0) {
      setError('Bet amount must be greater than 0');
      return;
    }

    if (selectedColor === '' && (selectedNumber === null || selectedNumber < 0 || selectedNumber > 36)) {
      setError('Please select a color or a valid number');
      return;
    }

    if (selectedNumber === null && selectedColor === '') {
      setError('Please select either a color or a number');
      return;
    }

    // Prepare the bet object to send to the backend
    const bet = {
      colour: selectedColor,
      number: selectedNumber !== null ? selectedNumber : null,
      betAmount,
    };

    try {
      const response = await axios.post('http://localhost:8080/games/roulette/start', bet, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Set the authorization header
        },
      });
      setGameResult(response.data);
      setError('');
    } catch (err) {
      console.error('Error placing bet:', err);
      setError('Failed to place bet.');
    }
  };

  return (
    <div className='p-16 flex flex-col items-center'>
      <h1 className='text-3xl mb-4'>Roulette</h1>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>Place Your Bet</h2>

        <div className='mb-4'>
          <label className='block mb-2'>Bet Amount</label>
          <input
            type='number'
            value={betAmount !== null ? betAmount : ''}
            onChange={(e) => {
              const value = Number(e.target.value);
              setBetAmount(value > 0 ? value : null); // Set to null if the input is invalid
            }}
            className='border rounded w-full p-2'
            min='1'
            placeholder='Enter your bet amount'
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Select a Color</label>
          <select
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              setSelectedNumber(null); // Clear the number when color is selected
            }}
            className='border rounded w-full p-2'
          >
            <option value=''>Select a color</option>
            <option value='red'>Red</option>
            <option value='black'>Black</option>
            <option value='green'>Green</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Select a Number</label>
          <input
            type='number'
            value={selectedNumber !== null ? selectedNumber : ''}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSelectedNumber(value >= 0 && value <= 36 ? value : null); // Set to null if the input is invalid
              setSelectedColor(''); // Clear the color when number is selected
            }}
            className='border rounded w-full p-2'
            min='0'
            max='36'
            placeholder='Enter a number (0-36)'
          />
        </div>

        <button
          onClick={handleBet}
          className='bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full'
        >
          Place Bet
        </button>

        {error && <p className='text-red-500 mt-4'>{error}</p>}
      </div>

      {gameResult && (
        <div className='mt-6 p-4 bg-green-100 text-green-800 rounded shadow-md'>
          <h2 className='text-xl font-semibold'>Game Result:</h2>
          <p>{JSON.stringify(gameResult)}</p>
        </div>
      )}
    </div>
  );
};

export default Roulette;
