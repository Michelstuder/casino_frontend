import React, { useState } from 'react';
import axios from 'axios';
import getJwtTokenPayload from '../utils/decodeToken';

interface RouletteProps {
  updateBalance: (amount: number) => void;
  currentBalance: number;
}

const Roulette = ({ updateBalance, currentBalance }: RouletteProps) => {
  // State variables
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [gameResult, setGameResult] = useState<any | null>(null);
  const jwtToken = getJwtTokenPayload();

  // Place a bet with current selections and balance
  const handleBet = async () => {
    // Validate bet input
    if (!isBetValid()) return;

    const bet = {
      colour: selectedColor ? selectedColor.toUpperCase() : null,
      number: selectedNumber !== null ? selectedNumber : null,
      amount: betAmount ?? 0,  // Ensure amount is never null
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

      if (response.data.isSuccess) {
        // Add winnings to balance
        updateBalanceOnBet(response.data.moneyWon);
      } else {
        // Deduct bet amount from balance
        updateBalanceOnBet(-(bet.amount || 0));  // Fallback to 0 if amount is null
      }

      setError('');
    } catch (err) {
      console.error('Error placing bet:', err);
      setError('Failed to place bet. Please try again later.');
    }
  };

  // Validate bet inputs
  const isBetValid = () => {
    if (!betAmount || betAmount <= 0) {
      setError('Bet amount must be greater than 0.');
      return false;
    }

    if (betAmount > currentBalance) {
      setError('Insufficient balance.');
      return false;
    }

    if (!selectedColor && (selectedNumber === null || selectedNumber < 0 || selectedNumber > 36)) {
      setError('Please select either a color or a valid number.');
      return false;
    }

    return true;
  };

  // Update balance after placing a bet
  const updateBalanceOnBet = async (amount: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/users/${jwtToken?.email}/deposit`,
        amount,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      updateBalance(response.data.moneyAmount);
      setError('');
    } catch (err) {
      console.error('Failed to update balance:', err);
      setError('Failed to update balance. Please try again.');
    }
  };

  return (
    <div className='p-16 flex justify-center'>
      <div className='flex bg-white shadow-lg rounded-md overflow-hidden'>
        <div className='p-6 bg-white w-96'>
          <h2 className='text-2xl font-semibold mb-4'>Place Your Bet</h2>

          {/* Bet Amount Input */}
          <div className='mb-4'>
            <label className='block mb-2'>Bet Amount</label>
            <input
              type='number'
              value={betAmount !== null ? betAmount : ''}
              onChange={(e) => setBetAmount(Number(e.target.value) || null)}
              className='border rounded w-full p-2'
              min='1'
              placeholder='Enter your bet amount'
            />
          </div>

          {/* Select Color */}
          <div className='mb-4'>
            <label className='block mb-2'>Select a Color</label>
            <select
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setSelectedNumber(null); // Clear selected number when a color is chosen
              }}
              className='border rounded w-full p-2'
            >
              <option value=''>Select a color</option>
              <option value='red'>Red</option>
              <option value='black'>Black</option>
              <option value='green'>Green</option>
            </select>
          </div>

          {/* Select Number */}
          <div className='mb-4'>
            <label className='block mb-2'>Select a Number</label>
            <input
              type='number'
              value={selectedNumber !== null ? selectedNumber : ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                setSelectedNumber(value >= 0 && value <= 36 ? value : null);
                setSelectedColor(''); // Clear color selection when a number is chosen
              }}
              className='border rounded w-full p-2'
              min='0'
              max='36'
              placeholder='Enter a number (0-36)'
            />
          </div>

          {/* Place Bet Button */}
          <button
            onClick={handleBet}
            className='bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full transition transform active:scale-95 focus:outline-none'
          >
            Place Bet
          </button>

          {/* Error Message */}
          {error && <p className='text-red-500 mt-4'>{error}</p>}
        </div>

        {/* Display Game Result */}
        {gameResult && (
          <div className='flex flex-col justify-between p-6 w-64'>
            <div className='flex justify-center text-2xl font-semibold'>Outcome:</div>
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
                <span className='text-green-600 text-2xl'>+${gameResult.moneyWon}</span>
              ) : (
                <span className='text-red-500 text-2xl'>{gameResult.message}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roulette;
