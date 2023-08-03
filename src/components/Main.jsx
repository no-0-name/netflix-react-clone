import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import axios from 'axios';

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length )];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results)
    });
  }, []);

  const truncateString = (str, num) => {
    if(str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str;
    }
  };

  return (
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img 
          className='w-full h-full object-cover' 
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
          alt={movie?.title} 
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:max-w-[35%] md:text-5xl font-bold'>{movie?.title}</h1>
          <p className='w-full mt-2 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(movie?.overview, 180)}</p>
          <div className='my-4'>
            <button className='border border-red-800 bg-red-600 text-white rounded py-2 px-7'>Play</button>
            <button className='border text-white border-gray-300 rounded mx-2 py-2 px-5'>Watch Later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
