var List = React.createClass({
    getInitialState: function getInitialState() {
        return {
            podrao: this.props.data.podroes[0]._source,
            i: 0,
            loader: true,
            directionsService: new google.maps.DirectionsService(),
            directionsDisplay: new google.maps.DirectionsRenderer(),
            latlng: new google.maps.LatLng(this.props.crd.latitude, this.props.crd.longitude)
        }
    },

    update: function update() {
        var i = this.state.i;

        if(i >= this.props.data.podroes.length-1) {
            i = -1;
        }

        this.setState({
            podrao: this.props.data.podroes[i+1]._source,
            i: i+1
        });
    },

    renderCard: function renderCard() {
        var podrao = this.state.podrao;
        
        return (
            <div>
                <h1>{podrao.name}</h1>
                <p>{podrao.vicinity}</p>
            </div>
        )
    },

    renderRoute: function renderRoute(enderecoPartida) { 
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
    },

    renderMap: function renderMap() {
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
    },

    componentDidMount: function componentDidMount() {
        this.renderMap();
    },

    componentDidUpdate: function componentDidUpdate() {
        this.renderMap();
    },

    getCurrentAddress: function getCurrentAddress() {
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
    },

    render: function render() {
        var divStyle = {width: 500, height: 700};

        return (
            <div>
                <Header />
                {this.renderCard()}
                <button onClick={this.update}>Lixo, quero outro</button>
                <div id="map" style={divStyle}></div>
            </div>
        )
    }
});
