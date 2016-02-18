var Section = React.createClass({
    getInitialState: function getInitialState() {
        return {
            mode: this.props.mode || 'home',
            data: [],
            crd: []
        };
    },

    updateMode: function updateMode(mode, data, crd) {
        this.setState({
            mode: mode,
            data: data || [],
            crd: crd || []
        });
    },

    render: function render() {
        switch (this.state.mode) {
            case 'search':
                return (
                    <Search updateMode={this.updateMode} mode={this.state.mode} />
                );
            case 'list':
                return (
                    <List updateMode={this.updateMode} mode={this.state.mode} data={this.state.data} crd={this.state.crd} />
                );
            case 'new':
                return (
                    <New updateMode={this.updateMode} mode={this.state.mode} />
                )
        }
        return (
            <Home updateMode={this.updateMode} mode={this.state.mode} />
        );
    }
});

