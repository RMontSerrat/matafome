var Home = React.createClass({
    displayName: 'Home',

    renderSearch: function renderSearch() {
        this.props.updateMode('search');
    },

    renderNew: function renderNew() {
        this.props.updateMode('new');
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, null),
            React.createElement('img', { src: '../../src/img/bg.png' }),
            React.createElement(
                'button',
                { onClick: this.renderSearch },
                'buscar podrão'
            ),
            React.createElement(
                'button',
                { onClick: this.renderNew },
                'Novo podrão!'
            )
        );
    }
});