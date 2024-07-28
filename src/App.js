import logo from './logo.svg';
import './App.css';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';


function App() {

  const [allMovie, setAllMovie] = useState([])
  // 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;




  let handelInput = (e) => {
    let MovieName = e.target.value
    Display(MovieName)
  }

  function Display(MovieName = "") {
    let Api;

    if (MovieName == "") {
      Api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`
    }
    else {
      Api = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${MovieName}`
    }

    axios.get(Api)

      .then((ress) => {
        setAllMovie(ress.data.results)
      })

      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    Display()

  }, [currentPage])





  return (
    <>
      <div className='max-w-[1140px] mt-[30px]  mx-auto'>
        <h1 className='text-[40px] text-white '>Movie App</h1>
        <input onChange={handelInput} type='text' className='w-[80%] p-2 border mt-[20px] ' placeholder='enter movie name' />
      </div>

      <div className='max-w-[1140px] mx-auto mt-[15px] grid lg:grid-cols-4 sm:grid-cols-2 gap-[10px] '>

        {allMovie.length > 0 ?
          allMovie.map((v, i) => {

            return (


              <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img class="rounded-t-lg" src={`https://image.tmdb.org/t/p/w1280${v.poster_path}`} alt="" />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {v.title}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> {v.release_date} </p>
                  <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {v.original_title}
                  </a>
                </div>
              </div>

            )
          })
          : "Please wait....."}









      </div>

      <div className='my-[35px]'>
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default App;


