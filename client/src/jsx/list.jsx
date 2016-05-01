import React from 'react';
import Header from './header';
import Ticket, {TicketGood} from './ticket';
import Generic from './model';


class Button extends Ticket {
    constructor(props) {
        super(props);
    };

    getArray() {
        return config.button;
    };

    render() {
        return (
            <button onClick={this.props.onClick}>{this.state.ticketValue}</button>
        )
    };
};

class List extends Generic {
    constructor(props) {
        super(props);
    
        this.state.podrao = this.state.data.podroes[0]._source;
        this.update = this.update.bind(this);
    };

    componentDidMount() {
        this.renderMap();
        this.setColor();
    };

    componentDidUpdate() {
        this.renderMap();
    };

    update() {
        var i = this.state.i;

        if(i >= this.state.data.podroes.length-1) {
            i = -1;
        }

        this.setState({
            podrao: this.state.data.podroes[i+1]._source,
            i: i+1
        });
    };

    rendeTypes() {
        var types = this.state.podrao.types;
        return types.map(function (type, key) {
            var space = '';
            if(key < types.length - 1) {
                space = '•';
            };

            return <li key={key}>{type + ' ' + space}</li>
        });
    };

    renderCard() {
        var podrao = this.state.podrao;

        return (
            <div className="card-informations">
                <h1>{podrao.name}</h1>
                { /*<ul className="card-types">{this.rendeTypes()}</ul> */}
                <p>{podrao.vicinity}</p>
                <TicketGood /> 
           </div>
        )
    };

    renderMap() {
        var map;
        var podrao = this.state.podrao;
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var options = {
            zoom: 17,
            center: new google.maps.LatLng(this.state.crd.lat, this.state.crd.lon),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         
        map = new google.maps.Map(document.getElementById('map'), options);
        directionsDisplay.setMap(map);
        this.renderRoute(directionsDisplay);
    };

    renderRoute(directionsDisplay) {
        var that = this;
        var directionsService = new google.maps.DirectionsService();
        var request = { 
            origin: this.state.address,
            destination: this.state.podrao.vicinity,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    };

    render() {
        return (
            <section className="card">
                <Header />
                {this.renderCard()}
                <Button onClick={this.update} />
                <div id="map"></div>
            </section>
        )
    };
};

export default List;