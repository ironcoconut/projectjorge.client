PJ.View.register_view(
  'home', 
  function(app) {
    return {
      render: function() {
        var state = this.state;

        return app.p({}, 'home');
      }
    };
  }
);
