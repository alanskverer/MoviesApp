import React, { useState, useEffect, Fragment } from 'react'
import style from '../Movies/movies.module.css'
import Movie from './Movie';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';



const Movies = ({ setAlert }) => {




    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [numOfPage, setNumOfPage] = useState(1);
    const moviesByRatingURL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEYY}&language=en-US&page=${numOfPage}`
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
    let pageSelectorBtn = numOfPage === 1 ? <Button style={{ margin: 20 }} onClick={() => setNumOfPage(numOfPage + 1)}>next page</Button>
        :
        <div><Button onClick={() => setNumOfPage(numOfPage - 1)}>previous page</Button>
            <Button style={{ margin: 20 }} onClick={() => setNumOfPage(numOfPage + 1)}>next page</Button>
        </div>



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
                {pageSelectorBtn}
                {/* <button onClick={() => setNumOfPage(numOfPage + 1)}>next page</button> */}

            </div>
        </Fragment>
    )
}

Movies.propTypes = {
    setAlert: PropTypes.func.isRequired
};


export default connect(null, { setAlert })(Movies)
