import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Link to="/"><i className="icon icon-logo"></i></Link>
                <Link to="/new"><i className="icon icon-new"></i></Link>
            </header>
        );
    }
};