import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { compose } from 'recompose';
import { withFirebase } from '../../../tools/Firebase';
import * as ROUTES from '../../../components/constants/router';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  signpassword: '',
  signemail: '',
  error: null,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  onLogSubmit = (e) => {
    const { email, password } = this.state;

    this.props.firebase
      .signInByMail(email, password)
      .then((authUser) => {
        console.log(authUser)
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  }

  onSignSubmit = (e) => {
    const { signemail, signpassword, username } = this.state;

    this.props.firebase
      .createUserByMail(signemail, signpassword)
      .then(authUser => {
        console.log(authUser)
        this.props.firebase.createUser(username, signemail, authUser.user.uid)
        .then(() => {console.log('success'); this.props.history.push(ROUTES.LANDING)});
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="10">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onLogSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Email" autoComplete="email" onChange={this.handleChange} value={this.state.email}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleChange} value={this.state.password}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary p-4 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody>
                    <Form onSubmit={this.onSignSubmit}>
                      <h1>SignUp</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="signemail" placeholder="Email" autoComplete="email" onChange={this.handleChange} value={this.state.signemail}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username" placeholder="username" autoComplete="email" onChange={this.handleChange} value={this.state.username}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="signpassword" placeholder="Password" autoComplete="current-password" onChange={this.handleChange} value={this.state.signpassword}/>
                      </InputGroup>
                      <Button color="primary" className="mt-3" active>SignUp</Button>
                    </Form>
                    {this.state.error && <p>{this.state.error.message}</p>}
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default compose(withFirebase)(Login);
