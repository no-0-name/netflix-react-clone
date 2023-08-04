import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import axios from 'axios';
import { AiFillCaretRight, AiFillPlusCircle } from 'react-icons/ai';
import { UserAuth } from '../AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


const Main = () => {
  const [movies, setMovies] = useState([]);
  const [saved, setSaved] = useState(false);
  const {user} = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`)
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

  const saveShow = async () => {
    if(user?.email) {
      setSaved(true)
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path
        }),
      });
    } else {
      alert('please log in to save the movie!');
    }
  };

  return (
    <div className='w-full h-[680px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[680px] bg-gradient-to-r from-black'></div>
        <img 
          className='w-full h-full object-cover' 
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
          alt={movie?.title} 
        />
        <div className='absolute w-full top-[30%] p-4 md:p-8'>
          <h1 className='text-3xl md:max-w-[35%] md:text-5xl font-bold'>{movie?.title}</h1>
          <p className='w-full mt-2 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(movie?.overview, 180)}</p>
          <div className='flex my-4'>
            <button className='flex border border-red-800 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded py-2 px-7'>
              <AiFillCaretRight className='my-1' />
              Play
            </button>
            <button onClick={saveShow} className='flex border text-whit border-gray-400 hover:text-black hover:bg-gray-200 active:bg-gray-400 rounded mx-2 py-2 px-5'>
              <AiFillPlusCircle className='my-1 mr-1' />
              My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
