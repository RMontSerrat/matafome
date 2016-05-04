import request from 'request';
import React from 'react';
import Header from './header';
import Generic from './model';
import { hashHistory } from 'react-router';

class Search extends Generic {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.setCoordinates();
        this.resetColor();
    };

    setCoordinates() {
        var options = {
            enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: Infinity
        };

        navigator.geolocation.getCurrentPosition(this.successSetCoordinates.bind(this), this.errorSetCoordinates, options);
    };

    successSetCoordinates(pos) {
        var crd = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        };

        localStorage.setItem('crd', JSON.stringify(crd));
        this.fetchData(crd);
    };

    errorSetCoordinates() {
        hashHistory.push('/error');
    };

    fetchData(crd) {
        var that = this;
        var url = 'https://matafome-api.herokuapp.com/?lat=' + crd.latitude + '&lon=' + crd.longitude;
        
        request.get(url, function(err, response, data) {
            localStorage.setItem('data', data);
            that.renderMode(JSON.parse(data));
        });
    };

    renderMode(data) {
        if (data.total >= 1) {
            hashHistory.push('/list');
        } else {
            hashHistory.push('/empty');
        }
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
