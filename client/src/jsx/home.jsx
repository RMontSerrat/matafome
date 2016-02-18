var Home = React.createClass({
    renderSearch: function renderSearch() {
        this.props.updateMode('search');
    },

    renderNew: function renderNew () {
        this.props.updateMode('new');
    },

    render: function render() {
        return (
            <div>
                <Header />
                <img src="../../src/img/bg.png" />
                <button onClick={this.renderSearch}>buscar podrão</button>
                <button onClick={this.renderNew}>Novo podrão!</button>
            </div>
        )
    }
});
