PJ.View.register_view(
  'signup', 
  function(app) {
    return {
      getDefaultProps: function () {
        return {
          title: 'Sign Up',
          subtitle: 'Enter your handle, an email or phone number and a password to join.',
          elements: [
            {
              type: "text",
              name: "handle",
              display: "Handle"
            },
            {
              type: "email",
              name: "email",
              display: "Email"
            },
            {
              type: "tel",
              name: "phone",
              display: "Phone"
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
          handle: '',
          email: '',
          phone: '',
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
        var signup_form = app.form_container(mapped);

        var signup_button = app.primary_button({onClick: this.signup}, "Signup");
        var login_button = app.secondary_button({href: PJ.Router.path('login')}, "Login");

        return app.container(header_row, signup_form, signup_button, login_button);
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
      signup: function() {
        var path = '/users';
        var url = PJ.base_url+path;
        var data = {
          handle: this.state.handle,
          email: this.state.email,
          phone: this.state.phone,
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
        this.setState({error: "Invalid signup information."});
      }
    };
  }
);
