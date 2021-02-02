import React from 'react';
import style from '../Movies/movies.module.css'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types';


const setVoteClass = (voteAvg) => {
    if (voteAvg >= 8) {
        return " green"

    } else if (voteAvg >= 6) {
        return "orange"

    }
    else {
        return "red"
    }
}



const Movie = ({ title, poster_path, overview, vote_average, isWatchList, pressed, setAlert }) => {

    const IMG_API = "https://image.tmdb.org/t/p/w1280";

    const addToWatchList = async () => {


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ title, poster_path, overview, vote_average })

        try {
            await axios.post('users/addmovie', body, config);
            setAlert(title + ' added to watchlist', 'success');




        } catch (error) {
            console.log(error.message)
            setAlert(title + ' is already in your watchlist', 'danger');

        }





    }
    const removeFromWatchList = async () => {





        try {

            await axios.delete('users/removemovie', { data: { title } })
            pressed()

        } catch (error) {
            console.log(error.message)

        }





    }


    let myButton = !isWatchList ? <Button onClick={addToWatchList} variant="contained" color="primary">
        Add to watchlist
</Button> : <Button onClick={removeFromWatchList} variant="contained" color="secondary">
            Remove from watchlist
            </Button>

    return (
        <div className={style.movie}>
            <img src={poster_path ? IMG_API + poster_path : "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80"} alt={title} />
            <div className={style.movie_info}>
                <h3>{title}</h3>
                <span style={{ color: setVoteClass(vote_average) }} className={style.vote_avg} >{vote_average}</span>

            </div>
            <div className={style.movie_over}>
                <h2>Overview:</h2>
                <p>{overview}</p>
                <div className={style.button_container}>
                    {myButton}
                </div>
            </div>


        </div>
    )
}


Movie.propTypes = {
    setAlert: PropTypes.func.isRequired
};
export default connect(null, { setAlert })(Movie);
