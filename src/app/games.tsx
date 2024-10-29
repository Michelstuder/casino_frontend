import React from 'react';
import { useNavigate } from 'react-router-dom';

const Games = () => {
  const navigate = useNavigate();

  const handleRouletteClick = () => {
    navigate('/roulette');
  };

  return (
    <div className='p-16 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div className='bg-white shadow-md w-80 rounded-lg overflow-hidden flex flex-col justify-between'>
        <img
          src='https://as2.ftcdn.net/v2/jpg/01/58/48/65/1000_F_158486556_3f1vUzdTXKRfDcAUTnItuYeQZSul0Pjt.jpg'
          alt='Roulette'
          className='w-full h-48 object-cover'
        />
        <h2 className='text-2xl font-semibold flex justify-center py-2'>
          Roulette
        </h2>
        <div className='flex items-center justify-center p-4'>
          <button 
            className='bg-indigo-500 text-white font-bold py-2 px-4 rounded'
            onClick={handleRouletteClick} // Add onClick handler
          >
            Test your luck
          </button>
        </div>
      </div>

      <div className='bg-white shadow-md w-80 rounded-lg overflow-hidden flex flex-col justify-between'>
        <img
          src='https://life-stuff.org/wp-content/uploads/2022/02/gambling-poster.jpg'
          alt='More games'
          className='w-full h-48 object-cover'
        />
        <h2 className='text-2xl font-semibold flex justify-center py-2'>
          More Games Coming Soon!
        </h2>
        <div className='flex items-center justify-center p-4'>
          <button className='bg-gray-400 text-white font-bold py-2 px-4 rounded'>
            Check back later
          </button>
        </div>
      </div>
    </div>
  );
};

export default Games;
