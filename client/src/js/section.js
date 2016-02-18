var Section = React.createClass({
    displayName: 'Section',

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
                return React.createElement(Search, { updateMode: this.updateMode, mode: this.state.mode });
            case 'list':
                return React.createElement(List, { updateMode: this.updateMode, mode: this.state.mode, data: this.state.data, crd: this.state.crd });
            case 'new':
                return React.createElement(New, { updateMode: this.updateMode, mode: this.state.mode });
        }
        return React.createElement(Home, { updateMode: this.updateMode, mode: this.state.mode });
    }
});