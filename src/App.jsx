import React, { useEffect, useState } from 'react'
import Search from './Components/Search'
import Spinner from './Components/Spinner'
import Moviecard from './Components/Moviecard';
import { useDebounce } from 'react-use'
import { updatesearchcount, gettrendingmovies } from './appwrite';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TNDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [movielist, setmovielist] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');
  const [debouncesearchterm, setdebouncesearchterm] = useState("");
  const [isloading, setisloading] = useState(false);
  const [errormessage, seterrormessage] = useState('');
  const [trendingmovies, settrendingmovies] = useState([]);
  const [isloadingtrending,setisloadingtrending] = useState(false);
  const [errorloadmessage,seterrorloadmessage] = useState("");


  useDebounce(() => { setdebouncesearchterm(searchTerm) }, 500, [searchTerm]);

  const fetchmovies = async (query = '') => {
    setisloading(true);
    seterrormessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json();
      if (data.Response === 'False') {
        seterrormessage(data.Error || 'Failed to fetch movies');
        setmovielist([]);
        return;
      }
      setmovielist(data.results || []);

      if (query && data.results.length > 0) {
        console.log("Calling updateSearchCount");
        await updatesearchcount(query, data.results[0]);
      }
    }
    catch (error) {
      console.log(`Error fetching movies : ${error}`)
      seterrormessage('Error fetching movies. Please try again later.');
    } finally {
      setisloading(false);
    }
  }
  const loadTrendingMovies = async () => {
    setisloadingtrending(true);
    try {
      const movies = await gettrendingmovies();

      settrendingmovies(movies);
    }
    catch (error) {
      console.log(`Error fetching trending movies : ${error}`);
      seterrorloadmessage('Error fetching trending movies. Please reload after some time');
    }
    finally{
      setisloadingtrending(false);
    }
  }
  useEffect(() => { fetchmovies(debouncesearchterm) }, [debouncesearchterm])
  useEffect(() => {
    loadTrendingMovies();
  }, [])
  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src='./Logo.svg' alt='Logo' className='w-24 h-auto'/>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassel</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}></Search>
        </header>
        
        <section className='trending'>
          <h2>Trending Movies</h2>

          {isloadingtrending?(<Spinner/>):errorloadmessage?<p className='text-red-500'>{errorloadmessage}</p>:trendingmovies.length>0?<ul>
            {trendingmovies.map((movie,index)=>(<li key={movie.$id}>
              <p>{index+1}</p>
              <img src={movie.poster_url} alt={movie.poster_url} />
            </li>))}</ul>:<h4>No Trending Movies found!!!</h4>}
        </section>

        <section className='all-movies'>
          <h2>All movies</h2>

          {isloading ? (<Spinner />) : errormessage ? <p className='text-red-500'>{errormessage}</p> : <ul>
            {movielist.map((movie) => (
              <Moviecard key={movie.id} movie={movie}></Moviecard>
            ))}</ul>}
        </section>
      </div>
    </main>
  )
}

export default App