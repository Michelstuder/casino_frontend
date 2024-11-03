import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getJwtTokenPayload from '../utils/decodeToken';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import ToastNotification, { showSuccessToast, showErrorToast } from '../components/toastNotification';

interface HomeProps {
  updateBalance: (newBalance: number) => void;
}

const Home = ({ updateBalance }: HomeProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const jwtToken = getJwtTokenPayload();

  // Fetch balance on initial load and if user email changes
  useEffect(() => {
    if (jwtToken?.email) {
      fetchBalance();
    }
  }, [jwtToken?.email]);

  // Fetches the user's balance from the backend
  const fetchBalance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/users/${jwtToken?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setBalance(response.data.moneyAmount);
      updateBalance(response.data.moneyAmount);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
      setError('Failed to load balance.');
    } finally {
      setLoading(false);
    }
  };

  // Validate and handle deposit actions
  const handleDeposit = async () => {
    if (!isValidAmount(depositAmount)) {
      setError('Please enter a valid deposit amount.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8081/api/users/${jwtToken?.email}/deposit`,
        depositAmount,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setBalance(response.data.moneyAmount);
      updateBalance(response.data.moneyAmount);
      resetInputFields();
      showSuccessToast({ message: 'Balance updated successfully.' }); // Show success toast
    } catch (err) {
      console.error('Deposit failed:', err);
      showErrorToast({ message: 'Failed to deposit.' }); // Show error toast
    }
  };

  // Validate and handle withdrawal actions
  const handleWithdraw = async () => {
    if (!isValidAmount(withdrawAmount)) {
      setError('Please enter a valid withdrawal amount.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8081/api/users/${jwtToken?.email}/withdraw`,
        withdrawAmount,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setBalance(response.data.moneyAmount);
      updateBalance(response.data.moneyAmount);
      resetInputFields();
      showSuccessToast({ message: 'Balance updated successfully.' }); // Show success toast
    } catch (err) {
      console.error('Withdrawal failed:', err);
      showErrorToast({ message: 'Failed to withdraw. Check balance.' }); // Show error toast
    }
  };

  // Helper function to validate input amounts
  const isValidAmount = (amount: number | null) => amount !== null && amount > 0;

  // Reset error and input fields
  const resetInputFields = () => {
    setDepositAmount(null);
    setWithdrawAmount(null);
    setError('');
  };

  return (
    <div className='p-8 max-w-md mx-auto bg-white rounded-lg shadow-md'>
      <ToastNotification /> {/* Render Toast Container */}

      <h2 className='text-3xl font-semibold mb-6 text-center'>Manage Your Balance</h2>

      {/* Loading Spinner */}
      {loading ? (
        <p className='text-center text-gray-500'>Loading balance...</p>
      ) : (
        <div className='flex justify-center mb-6'>
          <p className='text-4xl font-bold text-center'>${balance}</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          <span>{error}</span>
        </div>
      )}

      {/* Deposit Section */}
      <div className='mb-4'>
        <label className='block mb-2 font-medium text-gray-700'>Deposit Amount</label>
        <div className='flex'>
          <input
            type='number'
            value={depositAmount ?? ''}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            className='border border-gray-300 rounded-l-lg w-3/4 p-2 focus:outline-none focus:ring focus:ring-green-200'
            placeholder='Enter amount to deposit'
          />
          <button
            onClick={handleDeposit}
            className='bg-green-500 text-white px-4 py-2 rounded-r-lg w-1/4 flex items-center justify-center hover:bg-green-600 transition duration-200'
          >
            <AiOutlinePlusCircle className='mr-1' />
            Deposit
          </button>
        </div>
      </div>

      {/* Withdraw Section */}
      <div className='mb-4'>
        <label className='block mb-2 font-medium text-gray-700'>Withdraw Amount</label>
        <div className='flex'>
          <input
            type='number'
            value={withdrawAmount ?? ''}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            className='border border-gray-300 rounded-l-lg w-3/4 p-2 focus:outline-none focus:ring focus:ring-red-200'
            placeholder='Enter amount to withdraw'
          />
          <button
            onClick={handleWithdraw}
            className='bg-red-500 text-white px-4 py-2 rounded-r-lg w-1/4 flex items-center justify-center hover:bg-red-600 transition duration-200'
          >
            <AiOutlineMinusCircle className='mr-1' />
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
