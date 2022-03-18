import React, {useEffect, useState, useCallback, useRef} from 'react'

var axios = require("axios").default;

function App() {

  const [resultDB, SetResultDB] = useState([]);

  const [platform, setPlatform] = useState("netflix");
  const [country, setCountry] = useState("us");
  const [genre, setGenre] = useState("14");
  const [type, setType] = useState("movie");

  const [page, setPage] = useState("1");

  var options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/basic',
    params: {
      country: country,
      service: platform,
      type: type,
      genre: genre,
      page: page,
    },
    headers: {
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
      'x-rapidapi-key': 'efa42cfc6emsh781d8e3c11cd18cp12188djsn733f5b64c29c'
    }
  };

  useEffect(() => {
    axios.request(options).then(function (response) {

      console.log(response.data);
      SetResultDB(response.data.results)

    }).catch(function (error) {
      console.error(error);
    });
  }, [])

  useEffect(() => {
    axios.request(options).then(function (response) {

      console.log(response.data);
      
      SetResultDB(prevResultDB => {
        return [...new Set([...prevResultDB, ...response.data.results])]
      });

    }).catch(function (error) {
      console.error(error);
    });
  }, [country, platform, type, genre, page])

  return (
    <div>
      
      <div className='grid lg:grid-cols-6 gap-4 content-center items-center bg-white p-5 shadow-lg'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold text-gray-900 text-center'>MovieDB</h2>
          <p  className='text-sm font-semibold text-gray-900 text-center'>What do you wanna watch?</p>
        </div>
        

        {/*<input className='rounded p-2 bg-white text-gray-900 border-gray-900 border-2 font-semibold' placeholder='Search...'/>*/}

        <select className=' p-2 bg-white text-gray-900 border-gray-900 border-2 font-semibold' onChange={e => setType(e.target.value)}>
          <option value="movie" selected>Movie</option>
          <option value="series">Series</option>
        </select>

        <select className=' p-2 bg-white text-gray-900 border-gray-900 border-2 font-semibold' onChange={e => setPlatform(e.target.value)}>
          <option value="netflix" selected>Netflix</option>
          <option value="prime">Prime Video</option>
          <option value="disney">Disney+</option>
          <option value="hbo">HBO</option>
          <option value="hulu">Hulu</option>
        </select>

        <select className=' p-2 bg-white text-gray-900 border-gray-900 border-2 font-semibold' onChange={e => setGenre(e.target.value)}>
          <option value="14" selected>Fantasy</option>
          <option value="35">Comedy</option>
          <option value="12">Adventure</option>
          <option value="28">Action</option>
          <option value="10749">Romance</option>
          <option value="10751">Family</option>
          <option value="10764">Reality</option>
          <option value="53">Thriller</option>
          <option value="16">Animation</option>
          <option value="5">Sport</option>
          <option value="80">Crime</option>
          <option value="9648">Mystery</option>
          <option value="878">Science Fiction</option>
          <option value="10767">Talk Show</option>
          <option value="4">Musical</option>
          <option value="99">Documentary</option>
        </select>

        <select className=' p-2 bg-white text-gray-900 border-gray-900 border-2 font-semibold' onChange={e => setCountry(e.target.value)}>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
          <option value="nz">New Zealand</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="it">Italy</option>
          <option value="sp">Spain</option>
          <option value="ko">South Korea</option>
          <option value="jp">Japan</option>
        </select>

      </div>

      <div className='p-5 grid lg:grid-cols-4 lg:gap-4'>
        {
          resultDB.map((resultItem, index) => {
                      
                          return (
                            <div key={resultItem} className='rounded-xl shadow-lg relative'>
                              
                                <img
                                  className='rounded-xl'
                                  src={resultItem.posterURLs.original}
                                />
                                <h1 className=" text-4xl text-center w-full pt-48 rounded-b-xl font-semibold text-white absolute bottom-0 p-8 bg-gradient-to-t from-black">
                                  {/*resultItem.title*/}
                                </h1>
                                <p className='bg-black text-white font-bold px-4 py-2 absolute top-0 right-0 rounded-tr-xl'>{resultItem.year}</p>
                            </div>
                          )
                      
          })
        }
        
      </div>
      <div className='flex flex-col items-center text-center align- p-5'>
        <button onClick={() => setPage(prevPage => prevPage + 1)} className="shadow-lg hover:scale-125 hover:duration-300 bg-black font-semibold text-white border-black border-2 hover:bg-transparent hover:text-black px-4 py-2" >Load More</button>
      </div>
      <div>
      <footer class="bg-white pt-10 sm:mt-10 pt-10">        
          <div class="pt-2">
              <div class="flex pb-5 px-3 m-auto pt-5 
                  border-t border-gray-200 text-gray-500 text-sm text-center
                  flex-col max-w-6xl">
                  <div class="mt-2">
                      <p className='text-center'>Made with <ion-icon name="heart"></ion-icon> by Antonio Scapellato</p>
                  </div>
              </div>
          </div>
      </footer>
      </div>
    </div>
  )
}

export default App
