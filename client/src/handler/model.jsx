import React from 'react';

export default class Generic extends React.Component {
    constructor(props, context) {
        super(props);
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

    getCoords() {
        if (localStorage.crd) {
            return JSON.parse(localStorage.crd);
        }
    };

    getAddress() {
        if (localStorage.address) {
            return JSON.parse(localStorage.address);
        }
    };

    cancel(e) {
        e.preventDefault();
        this.context.router.goBack();
    };
};

Generic.contextTypes = {
    router: React.PropTypes.object
};