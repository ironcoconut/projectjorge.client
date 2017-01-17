PJ.View.register_view(
  'home', 
  function(app) {
    return {
      event_row: function(e, i) {
        // Title
        var title_strong = app.strong({}, e.name);
        var title = app.li({}, title_strong);
        // Time
        var time_icon = app.span({className: "glyphicon glyphicon-calendar rmar4"});
        var time = app.li({}, time_icon, e.starts_at);
        // Location
        var loc_icon = app.span({className: "glyphicon glyphicon-picture rmar4"});
        var loc = app.li({}, loc_icon, e.location);
        // Hosting
        var host_icon = app.span({className: "glyphicon glyphicon-user rmar4"});
        var host_class = e.admin ? "" : "hidden";
        var host = app.li({className: host_class}, host_icon, "You're Hosting");
        // Info
        var info_icon = app.span({className: "glyphicon glyphicon-info-sign rmar4"});
        var info = app.li({}, info_icon, 'More info...');
        // Helpers
        function event_click() {
          location.href = "/events/"+e.id;
        }
        // Main List
        var main = app.ul({className: "col-xs-10 hovery list-unstyled", onClick: event_click}, title, host, time, loc, info);

        // Map Icon
        var map_href = PJ.map_url(e.location);
        var map_icon = app.span({className: "glyphicon glyphicon-picture"});
        var map_header = app.h1({className: "text-center no-margin"}, map_icon);
        var map_text = app.h6({className: "text-center no-margin"}, 'map');
        var map = app.a({className: "col-xs-2 hovery", href: map_href, target: '_blank'}, map_header, map_text);

        return app.div({className: 'row tmar10', key: i}, main, map);
      },
      render: function() {
        var nav                = app.nav();
        var upcoming_header    = app.header_row({header: 'Upcoming Dinners'});
        var upcoming           = this.props.upcoming.map(this.event_row, this);
        var invitations_header = app.header_row({header: 'Invitations'});
        var invitations        = this.props.invitations.map(this.event_row, this);
        var footer             = app.footer();

        return app.container(nav, upcoming_header, upcoming, invitations_header, invitations, footer);
      }
    };
  }
);
