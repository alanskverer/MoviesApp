import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';




const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <ul>
            <li>
                <a href="/watchlist">
                    <i className="fas fa-video" />{' '}
                    <span className="hide-sm">Watchlist</span>
                </a>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </a>

            </li>

        </ul>

    );


    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to={!isAuthenticated ? '/' : '/login'}>
                    <i className="fas fa-ticket-alt"></i> Movies App
                </Link>
            </h1>
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </nav>
    )
}

Navbar.prototypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar)
