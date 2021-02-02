import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import style from '../Movies/movies.module.css'



const Watchlist = () => {

    const [watchListMovies, setWatchListMovies] = useState([])
    const [watchListUpdated, setWatchListUpdated] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/users/getusermovies')
                let movieArray = [];
                res.data.user.movies.forEach(movie => {
                    movie.movie.isWatchList = true;
                    movieArray.unshift(movie.movie);

                })

                setWatchListMovies(movieArray);
                setPageLoaded(true)

            } catch (error) {

                console.log(error.message)
            }

        }
        fetchData();

    }, [watchListUpdated])



    const btnPressed = () => {

        setWatchListUpdated(!watchListUpdated);


    }

    let content = !pageLoaded ? "" : watchListMovies.length === 0 ? <h1>Watch list is empty</h1> : watchListMovies.map((movie) => (

        <Movie key={movie.title} {...movie} pressed={btnPressed} />
    ))




    return (

        <div className={style.movie_container}>
            {content}
        </div>


    )
}

export default Watchlist
