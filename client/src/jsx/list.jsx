import React from 'react';
import Header from './header';

class List extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            podrao: this.props.data.podroes[0]._source,
            i: 0,
            loader: true,
            directionsService: new google.maps.DirectionsService(),
            directionsDisplay: new google.maps.DirectionsRenderer(),
            latlng: new google.maps.LatLng(this.props.crd.latitude, this.props.crd.longitude),
            buttonValue: this.setButtonValue(),
            ticketValue: this.setTicketValue()
        };
    };

    componentDidMount() {
        this.renderMap();
    };

    componentDidUpdate() {
        this.renderMap();
    };

    update() {
        var i = this.state.i;

        if(i >= this.props.data.podroes.length-1) {
            i = -1;
        }

        this.setState({
            podrao: this.props.data.podroes[i+1]._source,
            i: i+1,
            buttonValue: this.setButtonValue(),
            ticketValue: this.setTicketValue()
        });
    };

    setButtonValue() {
        return config.button[Math.floor(Math.random() * config.button.length)]
    };

    setTicketValue() {
        return config.good[Math.floor(Math.random() * config.good.length)]
    };

    renderCard() {
        var podrao = this.state.podrao;

        return (
            <div className="card-informations">
                <h1>{podrao.name}</h1>
                <p>{podrao.vicinity}</p>
                <div className="ticket ticket-card">
                    <p><span>{this.state.ticketValue}</span></p>
                </div>
            </div>
        )
    };

    renderMap() {
        var map;
        var podrao = this.state.podrao;
        var options = {
            zoom: 17,
            center: this.state.latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         
        map = new google.maps.Map(document.getElementById('map'), options);
        this.state.directionsDisplay.setMap(map);
        this.getCurrentAddress();
    };

    getCurrentAddress() {
        var that = this;
        var latlng = this.state.latlng;
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            "location": latlng
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                that.renderRoute(results[0].formatted_address);
            }
        });
    };

    renderRoute(enderecoPartida) { 
        var that = this;
        var request = { 
            origin: enderecoPartida,
            destination: this.state.podrao.vicinity,
            travelMode: google.maps.TravelMode.DRIVING
        };
        this.state.directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                that.state.directionsDisplay.setDirections(result);
            }
        });
    };

    render() {
        return (
            <section className="card">
                <Header updateMode={this.props.updateMode} mode={this.props.mode} />
                {this.renderCard()}
                <button onClick={this.update.bind(this)}>{this.state.buttonValue}</button>
                <div id="map"></div>
            </section>
        )
    };
};

export default List;