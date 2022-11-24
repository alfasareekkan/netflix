import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import YouTube, { YouTubeProps } from 'react-youtube';
import {movieTrailerUrl} from '../Requesst';

function Row({ title, fetchUrl,rowId }) {
    const [movies, setMovie] = useState([])
    const [trailerUrl,setTrailerUrl]=useState('')
    useEffect(() =>{
        axios.get(fetchUrl).then((response) => {
            setMovie(response.data.results)
        })
    }, [fetchUrl])
    const sliderLeft = () => {
        var slider = document.getElementById('slider'+rowId)
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const sliderRight = () => {
        var slider = document.getElementById('slider'+rowId)
        slider.scrollLeft = slider.scrollLeft + 500;
    }
    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
    };
    const handleMovie = (id) => {
        axios.get(movieTrailerUrl(id)).then((response) => {
            if (response.data.results.length !== 0) {
                setTrailerUrl(response.data.results)
                
            }
        })
    }
  return (
      <>
          <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
          <div className='relative flex item-center group' >
              <MdChevronLeft
                  onClick={sliderLeft}
                  size={40} className='bg-white left-0 mt-14 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
              <div id={'slider'+rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                  {
                      movies.map((obj, id) => (
                         
                          <div key={id} onClick={()=>handleMovie(obj.id)} className='w-[160px] sm:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                              <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${obj.backdrop_path}`} alt={obj?.title} />
                              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                  <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center '>{obj?.title}</p>
                              </div>
                          </div>
                      )
                        
                      )
                  }
              </div>
              <MdChevronRight
                  onClick={sliderRight}
                  size={40} className='bg-white right-0 mt-14 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />

              
          </div>
          {trailerUrl && <YouTube videoId={trailerUrl[0].key} opts={opts} />}
      </>
  )
}

export default Row