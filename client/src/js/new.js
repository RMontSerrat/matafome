var New = React.createClass({
    displayName: 'New',

    getInitialState: function getInitialState() {
        return {
            data: {}
        };
    },

    componentDidMount: function componentDidMount() {
        initMap();
        this.bindSubmit();
    },

    getLocation: function getLocation() {
        var that = this;
        var endereco = this.state.data.vicinity;
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': endereco, 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    var location = { lat: latitude, lon: longitude };

                    that.state.data.location = location;
                    that.save();
                }
            }
        });
    },

    bindSubmit: function bindSubmit() {
        var that = this;

        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault();

            that.state.data = $(this).serializeObject();
            that.getLocation();
        });
    },

    save: function () {
        var data = this.state.data;

        console.log(data);
        $.ajax({
            url: 'http://localhost:5000/add/',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                console.log(response);
            }
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'novo podrão'
            ),
            React.createElement(
                'form',
                null,
                React.createElement('input', { type: 'text', name: 'name', placeholder: 'nome do podrão' }),
                React.createElement('input', { type: 'text', name: 'vicinity', placeholder: 'onde fica?' }),
                React.createElement(
                    'label',
                    { 'for': 'opening_hours' },
                    'horário de funcionamento'
                ),
                React.createElement('input', { type: 'text', name: 'opening_hours[]', placeholder: 'de' }),
                React.createElement('input', { type: 'text', name: 'opening_hours[]', placeholder: 'ate' }),
                React.createElement(
                    'label',
                    null,
                    'o que oferece?'
                ),
                React.createElement('input', { type: 'checkbox', name: 'types[]', value: 'burguer' }),
                React.createElement(
                    'label',
                    { 'for': 'option' },
                    'Burguer'
                ),
                React.createElement('input', { type: 'checkbox', name: 'types[]', value: 'cachorro' }),
                React.createElement(
                    'label',
                    { 'for': 'option' },
                    'Cachorro'
                ),
                React.createElement('input', { type: 'checkbox', name: 'types[]', value: 'churrasquinho' }),
                React.createElement(
                    'label',
                    { 'for': 'option' },
                    'Churras'
                ),
                React.createElement('input', { type: 'checkbox', name: 'types[]', value: 'caldos' }),
                React.createElement(
                    'label',
                    { 'for': 'option' },
                    'Caldos'
                ),
                React.createElement('input', { type: 'checkbox', name: 'types[]', value: 'outros' }),
                React.createElement(
                    'label',
                    { 'for': 'option', id: 'outros' },
                    'Outros'
                ),
                React.createElement('input', { type: 'submit', value: 'pronto!' })
            )
        );
    }
});