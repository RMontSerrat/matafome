var EmailResult = React.createClass({
   displayName: 'EmailResult',

   formatDate: function formatDate(date_time) {
      date_time = date_time.split('T');
      var date = date_time[0],
          time = date_time[1].split(":");

      time.pop();

      if (date === config.dateToday()) {
         return time[0] + ':' + time[1];
      } else {
         return config.dateFormatted(date);
      }
   },

   render: function render() {
      return React.createElement(
         'div',
         { className: 'emails-list-row' },
         React.createElement(
            'div',
            { className: 'emails-list-column' },
            React.createElement(
               'span',
               null,
               this.props.data.name
            )
         ),
         React.createElement(
            'div',
            { className: 'emails-list-column' },
            React.createElement(
               'span',
               null,
               this.props.data.subject
            )
         ),
         React.createElement(
            'div',
            { className: 'emails-list-column' },
            React.createElement(
               'span',
               null,
               this.formatDate(this.props.data.date)
            )
         )
      );
   }
});