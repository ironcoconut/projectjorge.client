PJ.View.register_view(
  'loading', 
  function(app) {
    return {
      render: function() {
        return app.p({}, 'loading');
      }
    };
  }
);
