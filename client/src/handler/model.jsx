import React from 'react';

export default class Generic extends React.Component {
    constructor(props, context) {
        super(props);

        this.goBack = this.goBack.bind(this);
    };

    resetColor() {
        var body = document.getElementsByTagName('body')[0]; 
        body.classList.remove('invert');
    };

    invertColor() {
        var body = document.getElementsByTagName('body')[0]; 
        body.classList.add('invert');
    };

    goBack(e) {
        e.preventDefault();
        this.context.router.goBack();
    };
};

export class Default extends Generic {
    componentDidMount() {
        this.resetColor();
    };
};

export class Invert extends Generic {
    componentDidMount() {
        this.invertColor();
    };
};

Generic.contextTypes = {
    router: React.PropTypes.object
};