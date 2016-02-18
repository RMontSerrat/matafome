var Filter = React.createClass({
   displayName: "Filter",

   emailsToday: function emailsToday(e) {
      if (e.target.checked) {
         this.props.filter.date = e.target.value;
      } else {
         this.props.filter.date = "";
      }
      this.props.onChange("filter", this.props.filter);
   },

   render: function render() {
      return React.createElement(
         "div",
         { className: "emails-filter-today" },
         React.createElement("input", { type: "checkbox", name: "emails-today", value: config.dateToday(), onChange: this.emailsToday }),
         React.createElement(
            "span",
            null,
            "Mostrar somente emails de hoje"
         )
      );
   }
});