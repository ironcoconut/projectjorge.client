PJ.View.register_view(
  'event_show', 
  function(app) {
    return {
      icon: function(name) {
        var icon = app.span({className: "glyphicon glyphicon-"+name});
        return app.h1({className: "col-xs-1 text-right no-margin"}, icon);
      },
      icon_row: function(name, classes, children) {
        var icon = this.icon(name);
        var right_row = app.div({className: "row"}, children);
        var right_col = app.div({className: "col-xs-11"}, right_row);

        return app.div({className: "tmar10 row "+classes}, icon, right_col);
      },
      render: function() {
        console.log('props', this.props);
        var nav = app.nav();
        var title = app.header_row({header: this.props.name});

        var rsvp_text = app.div({className: "col-xs-12", key: "rsvp_text"}, "You have not RSVPed.");
        var rsvp_accept = app.button({type: "button", className: "btn btn-default"}, "Accept Invitation");
        var rsvp_decline = app.button({type: "button", className: "btn btn-default"}, "Decline");
        var rsvp_buttons = app.div({className: "col-xs-12", key: "rsvp_buttons"}, rsvp_accept, rsvp_decline);

        var rsvp_row = this.icon_row('envelope', 'bg-info', [rsvp_text, rsvp_buttons]);

        var calendar_date = app.div({className: "col-xs-12", key: "date"}, this.props.date);
        var calendar_time = app.div({className: "col-xs-12", key: "time"}, this.props.time);
        var calendar_row = this.icon_row('calendar', '', [calendar_date, calendar_time]);

        var map_location = app.div({className: "col-xs-12", key: "location"}, this.props.location);
        var map_href = PJ.map_url(this.props.location);
        var map_a = app.a({href: map_href}, "view map");
        var map_a_col = app.div({className: "col-xs-12", key: "a"}, map_a);
        var map_row = this.icon_row('picture', '', [map_location, map_a_col]);

        var guests = app.div({className: "col-xs-12", key: "guests"}, "Guests");
        var guests_row = this.icon_row('user', '', [guests]);

        var footer = app.footer();

        return app.container(nav, title, rsvp_row, calendar_row, map_row, guests_row, footer);
      }
    };
  }
);
