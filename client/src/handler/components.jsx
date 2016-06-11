import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketValue: ''
        };
    };

    setTicketValue() {
        return this.props.data[Math.floor(Math.random() * this.props.data.length)]
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

Ticket.PropTypes = {
    data: PropTypes.array.isRequired,
};

export class ErrorBar extends React.Component {
    render() {
        return (
            <div className="error-bar">
                <Link to="/">cancelar</Link>
                {this.props.children}
            </div>
        )
    }
}