import React from 'react';

export default class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketValue: ''
        };
    };

    setTicketValue() {
        return this.props.array[Math.floor(Math.random() * this.props.array.length)]
    };

    componentDidMount() {
        this.setState({
            ticketValue: this.setTicketValue()
        });
    };

    componentWillReceiveProps() {
        this.setState({
            ticketValue: this.setTicketValue()
        });
    };

    render() {
        return (
            <div className="ticket ticket-card">
                <i className="icon-decagono"></i>
                <p><span>{this.state.ticketValue}</span></p>
            </div>
        )
    };
};