PJ.View.register_partial(
  'nav', 
  function(app) {
    return {
      render: function() {
        var menu_icon = app.span({className: "glyphicon glyphicon-cutlery rmar8"});
        var menu_text = app.h1({}, menu_icon, 'Dinner Together');
        var menu_container = app.div({className: "col-xs-8 right-border"}, menu_text);

        var new_icon = app.span({className: "glyphicon glyphicon-plus rmar8"});
        var new_text = app.h1({}, new_icon, 'New');
        var new_container = app.a({className: "col-xs-4 hovery", href: '/events/new'}, new_text);

        return app.div({className: "row bottom-border"}, menu_container, new_container);
      }
    };
  }
);
