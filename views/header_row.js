PJ.View.register_partial(
  'header_row', 
  function(app) {
    return {
      render: function() {
        var title = app.h1({className: 'col-xs-12'}, this.props.header);

        return app.div({className: 'row'}, title);
      }
    };
  }
);
