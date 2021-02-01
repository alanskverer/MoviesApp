import React, { useState, useEffect, Fragment } from 'react'
import style from '../Movies/movies.module.css'
import Movie from './Movie';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux'
const Movies = ({ setAlert }) => {



    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const moviesByRatingURL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEYY}&language=en-US&page=1`
    const moviesBySearchWord = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEYY}&language=en-US&query=${search}&page=1&include_adult=true`


    useEffect(() => {
        fetch(moviesByRatingURL)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);

            })


    }, [moviesByRatingURL])

    const onSubmitHanlder = (e) => {
        e.preventDefault();
        if (search === '') {
            setAlert('Please insert movie name', 'danger')
            return null;
        }
        fetch(moviesBySearchWord)
            .then((res) => res.json())
            .then((data) => {
                if (data.results.length > 0) {
                    setMovies(data.results);
                }
                else {
                    setAlert('No movies found, try again', 'danger')
                }


            })


    }

    const searchChangeHanlder = (e) => {
        setSearch(e.target.value)

    }



    return (
        <Fragment>
            <div className={style.search_container}>
                <header>
                    <form onSubmit={onSubmitHanlder}>
                        <input className={style.search_bar}
                            type="text"
                            placeholder="Search Movie..."
                            value={search}
                            onChange={searchChangeHanlder}
                        />

                    </form>

                </header>
            </div>
            <div className={style.movie_container}>

                {movies.length > 0 && movies.map((movie) => (
                    <Movie key={movie.id} {...movie} />
                ))}
            </div>
        </Fragment>
    )
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

export default connect(null, { setAlert })(Movies)
// export default connect(mapStateToProps, { setAlert })(Movies)
