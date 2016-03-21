import React from 'react';

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketValue: this.setTicketValue()
        };
    }

    setTicketValue() {
        console.log('chamou');
        return config.good[Math.floor(Math.random() * config.good.length)]
    };

    componentDidUpdate() {
        this.setState({
            ticketValue: this.setTicketValue()
        })
    };

    render() {
        return (
            <div className="ticket ticket-card">
                <p><span>{this.state.ticketValue}</span></p>
            </div>
        )
    };
}

export default Ticket;

