import request from 'request';
import React from 'react';
import Header from './header';
import Generic from './model';

class Search extends Generic {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.setCoordinates();
        this.successLocation();
        this.setColor();
    };

    successLocation() {
        var that = this,
            crd = this.state.crd,
            url = 'https://matafome-api.herokuapp.com/';

        request({
            url: url,
            data: crd,
            method: 'GET'
        }, function(err, response, data) {
            that.setState({
                data: JSON.parse(data)
            });
            localStorage.setItem('data', JSON.stringify(that.state.data));
            that.getCurrentAddress(that.renderMode);
        });
    };

    render() {
        return (
            <div className="search">
                <Header />
                <h2 className="loading">
                    <span>procurando podrões bem, bem gordurosos...</span>
                </h2>
            </div>
        )
    };
};

export default Search;
