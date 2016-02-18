var Search = React.createClass({
    displayName: 'Search',

    componentDidMount: function componentDidMount() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(this.successLocation, this.errorLocation, options);
    },

    successLocation: function successLocation(pos) {
        var self = this,
            crd = pos.coords,
            url = 'http://localhost:5000/';
        data = {
            lat: crd.latitude,
            lon: crd.longitude
        };

        $.ajax({
            url: url,
            data: data,
            type: "GET",
            crossDomain: true,
            success: function (data) {
                self.props.updateMode('list', data, crd);
            }
        });
    },

    errorLocation: function errorLocation() {
        console.log('erro');
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('img', { src: '../../src/img/bg.png' }),
            React.createElement(
                'button',
                null,
                'buscar podrão'
            )
        );
    }
});