PJ.View.register_view(
  'login', 
  function(app) {
    return {
      getDefaultProps: function () {
        return {
          title: 'Login',
          subtitle: 'Enter either your handle, email or phone and your password to login.',
          elements: [
            {
              type: "text",
              name: "identifier",
              display: "Handle, Email or Phone"
            },
            {
              type: "password",
              name: "password",
              display: "Password"
            }
          ]
        };
      },
      getInitialState: function() {
        return {
          error: null,
          identifier: '',
          password:''
        };
      },
      render: function() {
        var title = app.title(this.props.title);
        var subtitle = app.subtitle(this.props.subtitle);
        var error = this.error();
        var header_row = app.header(title, subtitle, error);

        var elements = this.props.elements;
        var mapped = elements.map(this.map_elements, this);
        var login_form = app.form_container(mapped);

        var signup_button = app.secondary_button({onClick: this.signup}, "Signup");
        var login_button = app.primary_button({href: PJ.Router.path('login')}, "Login");

        return app.container(header_row, login_form, login_button, signup_button);
      },
      error: function() {
        return this.state.error ? app.error(this.state.error) : null;
      },
      map_elements: function(element, index) {
        var name = element.name;
        var type = element.type;
        var display = element.display;
        var key = name+index;
        var input_options = {
          type: type,
          name: name,
          value: this.state[name],
          onChange: this.handleChange.bind(this, name)
        };

        var label = app.label({}, display);
        var input = app.input(input_options);

        return app.div({key: key}, label, input);
      },
      handleChange(name, event) {
        var data = {};
        data[name] = event.target.value;
        this.setState(data);
      },
      login: function() {
        var path = '/users/login';
        var url = PJ.base_url+path;
        var data = {
          identifier: this.state.identifier,
          password: this.state.password
        };

        $.post(url, JSON.stringify(data)).
          done(this.success).
          fail(this.failure);
      },
      success: function() {
        page('/');
      },
      failure: function() {
        this.setState({error: "Invalid id and password."});
      }
    };
  }
);
