import React from 'react';
import Generic from './model';
import { Link } from 'react-router';

export default class Header extends Generic {
    render() {
        return (
            <header>
                <Link to="/"><i className="icon icon-logo"></i></Link>
                <Link to="/new"><i className="icon icon-new"></i></Link>
            </header>
        );
    }
};