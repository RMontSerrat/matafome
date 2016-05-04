import React from 'react';
import _ from 'lodash';

export default class Generic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crd: localStorage.crd ? JSON.parse(localStorage.crd) : {},
            data: localStorage.data ? JSON.parse(localStorage.data) : {},
            address: localStorage.address ? JSON.parse(localStorage.address) : {}
        };
    };

    componentDidMount() {
        this.resetColor();
    };

    resetColor() {
        var body = document.getElementsByTagName('body')[0]; 
        body.classList.remove('invert');
    };

    invertColor() {
        var body = document.getElementsByTagName('body')[0]; 
        body.classList.add('invert');
    };

    render() {
        return '';
    };
};