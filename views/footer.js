PJ.View.register_partial(
  'footer', 
  function(app) {
    return {
      render: function() {
        var jorge_a = app.a({href: '#'}, 'Project Jorge');
        var jorge = app.li({className: "hovery"}, jorge_a);

        var about_a = app.a({href: '/about'}, 'About');
        var about = app.li({className: "hovery"}, about_a);

        var logout_a = app.a({href: '/logout'}, 'Logout');
        var logout = app.li({className: "hovery"}, logout_a);

        var spacer = app.li({}, ' - ');
        var bottom_menu = app.ul({className: "list-inline col-xs-12"}, jorge, spacer, about, spacer, logout);

        return app.div({className: "row text-center tmar10"}, bottom_menu);
      }
    };
  }
);
