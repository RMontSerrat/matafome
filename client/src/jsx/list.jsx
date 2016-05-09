import React from 'react';
import Header from './header';
import Ticket, {TicketGood, TicketBad} from './ticket';
import Generic from './model';
import { Link } from 'react-router';


class Botao extends Ticket {
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

export default class List extends Generic {
    constructor(props, context) {
        super(props);
        this.state = {
            podrao: this.props.location.state ? this.props.location.state.data.podroes[0]._source : {}, 
            i: 0,
            address: this.getAddress()
        }
    };

    componentDidMount() {
        this.verifyData();
        this.invertColor();
        this.renderMap();
    };

    verifyData() {
        if(_.isEmpty(this.state.podrao)) {
            this.context.router.push({ pathname: '/search', search: '?lat=' + this.props.location.query.lat + '&lon=' + this.props.location.query.lon, state: {} });
        };
    };

    update() {
        var that = this;
        var i = this.state.i;

        if(i >= this.props.location.state.data.podroes.length-1) {
            this.context.router.push('/list/end');
            return;
        }

        this.setState({
            podrao: this.props.location.state.data.podroes[i+1]._source,
            i: i+1
        }, function () {
            that.renderMap();
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

    getCurrentAddress(directionsDisplay) {
        var that = this;
        var latlng = new google.maps.LatLng(this.props.location.query.lat, this.props.location.query.lon);
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            "location": latlng
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var address = results[0].formatted_address;
                
                localStorage.setItem('address', JSON.stringify(address));
                
                that.setState({
                    address: address
                }, function () {
                    that.renderRoute(directionsDisplay);
                });
            }
        });
    };

    renderMap() {
        var map;
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var options = {
            zoom: 17,
            center: new google.maps.LatLng(this.props.location.query.lat, this.props.location.query.lon),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         
        map = new google.maps.Map(document.getElementById('map'), options);
        directionsDisplay.setMap(map);
        
        if(_.isEmpty(this.state.address)) {
            this.getCurrentAddress(directionsDisplay);
        } else {
            this.renderRoute(directionsDisplay);
        }
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
        var podrao = this.state.podrao;

        return (
            <section className="card">
                <Header />
                <div className="card-informations">
                    <h1>{podrao.name}</h1>
                    <p>{podrao.vicinity}</p>
                    <TicketGood /> 
               </div>
               <Botao onClick={this.update.bind(this)} />
                <div id="map"></div>
            </section>
        )
    };
};

export class EndList extends Generic {
    componentDidMount() {
        this.resetColor();
    };

    render() {
        return (
         <div className="feedback">
            <Header />
            <TicketBad />
            <h2>
               <span>não existem mais podrões próximos</span>
            </h2>
            <Link to="/search">
                <button>explorar podrões</button>
            </Link>
         </div>
        )
    }
};