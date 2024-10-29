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
        const response = await axios.get(
          'http://localhost:8080/games/roulette/playground',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        setPlayground(response.data);
      } catch (err) {
        console.error('Error fetching playground:', err);
        setError('Failed to load playground.');
      }
    };

    fetchPlayground();
  }, []);

  const handleBet = async () => {
    if (betAmount === null || betAmount <= 0) {
      setError('Bet amount must be greater than 0');
      return;
    }

    if (
      selectedColor === '' &&
      (selectedNumber === null || selectedNumber < 0 || selectedNumber > 36)
    ) {
      setError('Please select a color or a valid number');
      return;
    }

    if (selectedNumber === null && selectedColor === '') {
      setError('Please select either a color or a number');
      return;
    }

    const bet = {
      colour: selectedColor !== '' ? selectedColor.toUpperCase() : null,
      number: selectedNumber !== null ? selectedNumber : null,
      multiplicationFactor: null,
      amount: betAmount,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/games/roulette/start',
        bet,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setGameResult(response.data);
      setError('');
    } catch (err) {
      console.log(bet);
      console.error('Error placing bet:', err);
      setError('Failed to place bet.');
    }
  };

  return (
    <div className='p-16 flex justify-center'>
      <div className='flex bg-white shadow-lg rounded-md overflow-hidden'>
        <div className='p-6 bg-white w-96'>
          <h2 className='text-2xl font-semibold mb-4'>Place Your Bet</h2>

          <div className='mb-4'>
            <label className='block mb-2'>Bet Amount</label>
            <input
              type='number'
              value={betAmount !== null ? betAmount : ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                setBetAmount(value > 0 ? value : null);
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
                setSelectedNumber(null);
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
                setSelectedNumber(value >= 0 && value <= 36 ? value : null);
                setSelectedColor('');
              }}
              className='border rounded w-full p-2'
              min='0'
              max='36'
              placeholder='Enter a number (0-36)'
            />
          </div>
          <button
            onClick={handleBet}
            className='bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full transition transform active:scale-95 focus:outline-none'
          >
            Place Bet
          </button>

          {error && <p className='text-red-500 mt-4'>{error}</p>}
        </div>

        {gameResult && (
          <div className='flex flex-col justify-between p-6 w-64'>
            <div className='flex justify-center text-2xl font-semibold'>
              Outcome:
            </div>
            <div
              className={`flex items-center justify-center text-white text-3xl h-full font-semibold py-4 rounded-md shadow-md ${
                gameResult.actualColour === 'RED'
                  ? 'bg-red-500'
                  : gameResult.actualColour === 'BLACK'
                  ? 'bg-black'
                  : 'bg-green-600'
              }`}
            >
              {gameResult.actualNumber}
            </div>

            <div className='mt-4 text-center p-4 bg-gray-100 rounded-md shadow-md'>
              <h2 className='text-xl font-semibold'>Reward:</h2>
              {gameResult.isSuccess ? (
                <span className='text-green-600 text-2xl'>
                  +${gameResult.moneyWon}
                </span>
              ) : (
                <span className='text-red-500 text-2xl'>
                  {gameResult.message}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roulette;
