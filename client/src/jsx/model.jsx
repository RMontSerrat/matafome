import React from 'react';
import { browserHistory } from 'react-router'

export default class Generic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crd: localStorage.crd ? JSON.parse(localStorage.crd) : {},
            data: localStorage.data ? JSON.parse(localStorage.data) : {},
            address: localStorage.address ? JSON.parse(localStorage.address) : {},
            podrao: {},
            i: 0
        };
        this.renderMode = this.renderMode.bind(this);
    };

    componentDidMount() {
        this.setColor();
    };

    setColor() {
        var color = this.props.color;
        var body = document.getElementsByTagName('body')[0]; 
        if (!color) {
            body.className = "";
        }
        body.classList.add(color);
    };

    renderMode() {
        if (this.state.data.total >= 1) {
            browserHistory.push('/list');
        } else {
            browserHistory.push('/empty');
        }
    };

    setCoordinates() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(this.successSetCoordinates.bind(this), this.renderError, options);
    };

    successSetCoordinates(pos) {
        var crd = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
        };

        this.setState({crd: crd});
        localStorage.setItem('crd', JSON.stringify(this.state.crd));
    };

    getCurrentAddress(callback) {
        var that = this;
        var latlng = new google.maps.LatLng(this.state.crd.lat, this.state.crd.lon);
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            "location": latlng
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                that.setState({
                    address: results[0].formatted_address
                });
                localStorage.setItem('address', JSON.stringify(results[0].formatted_address));
                if (callback) {
                    callback();
                }
            }
        });
    };

    getLocationByAddress(endereco, callback) {
        var that = this;
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': endereco, 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var crd = {
                        latitude: results[0].geometry.location.lat(),
                        longitude: results[0].geometry.location.lng()
                    };

                    that.setState({crd: crd});

                    if (callback) {
                        callback();
                    }
                }
            }
        });
    };

    render() {
        return '';
    };
};