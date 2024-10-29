import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserIdFromToken from '../utils/decodeToken';

interface HomeProps {
  updateBalance: (newBalance: number) => void;
}

const Home = ({ updateBalance }: HomeProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const jwtToken = getUserIdFromToken();

  useEffect(() => {
    if (jwtToken) {
      fetchBalance();
    }
  }, [jwtToken?.email]);

  // Fetch user balance using the user ID
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/users/${jwtToken?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json', // Explicitly set the content type
          },
        }
      );
      setBalance(response.data.moneyAmount);
      updateBalance(response.data.moneyAmount); // Sync balance with App
    } catch (err) {
      console.error('Failed to fetch balance:', err);
      setError('Failed to load balance.');
    }
  };

  // Handle deposit by updating the balance through the backend
  const handleDeposit = async () => {
    if (depositAmount && depositAmount > 0) {
      try {
        const response = await axios.put(
          `http://localhost:8081/api/users/${jwtToken?.email}/deposit`,
          depositAmount,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json', // Explicitly set the content type
            },
          }
        );
        setBalance(response.data.moneyAmount);
        updateBalance(response.data.moneyAmount); // Update the balance in App
        setDepositAmount(null);
        setError('');
      } catch (err) {
        console.error('Deposit failed:', err);
        setError('Failed to deposit.');
      }
    } else {
      setError('Please enter a valid deposit amount.');
    }
  };

  // Handle withdrawal by updating the balance through the backend
  const handleWithdraw = async () => {
    if (withdrawAmount && withdrawAmount > 0) {
      try {
        const response = await axios.put(
          `http://localhost:8081/api/users/${jwtToken?.email}/withdraw`,
          withdrawAmount,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json', // Explicitly set the content type
            },
          }
        );
        setBalance(response.data.moneyAmount);
        updateBalance(response.data.moneyAmount); // Update the balance in App
        setWithdrawAmount(null);
        setError('');
      } catch (err) {
        console.error('Withdrawal failed:', err);
        setError('Failed to withdraw. Check balance.');
      }
    } else {
      setError('Please enter a valid withdrawal amount.');
    }
  };

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-semibold mb-4'>Manage Your Balance</h2>
      <p>Current Balance: ${balance}</p>

      <div className='mt-4'>
        <label className='block mb-2'>Deposit Amount</label>
        <input
          type='number'
          value={depositAmount ?? ''}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
          className='border rounded w-full p-2'
          placeholder='Enter amount to deposit'
        />
        <button
          onClick={handleDeposit}
          className='bg-green-500 text-white p-2 rounded mt-2'
        >
          Deposit
        </button>
      </div>

      <div className='mt-4'>
        <label className='block mb-2'>Withdraw Amount</label>
        <input
          type='number'
          value={withdrawAmount ?? ''}
          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          className='border rounded w-full p-2'
          placeholder='Enter amount to withdraw'
        />
        <button
          onClick={handleWithdraw}
          className='bg-red-500 text-white p-2 rounded mt-2'
        >
          Withdraw
        </button>
      </div>

      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  );
};

export default Home;
