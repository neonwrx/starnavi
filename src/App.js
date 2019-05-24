import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Input } from "reactstrap";
import axios from "axios";

import DataTable from "./DataTable";
import Game from "./Game";
import "./App.css";

class App extends Component {
  state = {
    userName: "",
    selectMode: "",
    message: "",
    buttonText: "Play",
    winners: [],
    field: undefined,
    delay: undefined,
    start: false,
    disabled: false,
  };

  componentDidMount() {
    axios
      .get(`https://starnavi-frontend-test-task.herokuapp.com/winners`, {
        credentials: "same-origin",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        const winners = res.data;
        this.setState({ winners });
      });
    axios
      .get(`https://starnavi-frontend-test-task.herokuapp.com/game-settings`, {
        crossdomain: true,
        headers: {'Access-Control-Allow-Origin': '*'},
      })
      .then(res => {
        const settings = res.data;
        console.log('settings', settings)
        // this.setState({ winners });
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const { userName, selectMode } = this.state;
    if (userName !== "" && selectMode !== "") {
      // axios.get(`https://starnavi-frontend-test-task.herokuapp.com/game-settings`, {
      //   credentials: "same-origin",
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   }
      // })
      //   .then(res => {
      //     const field = res.data;
      //     this.setState({ field });
      //     console.log('field', field);
      //   })
      // fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings', {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   }
      // })
      // .then(response => response.json())
      // .then(field => console.log('field', field));
      const data = {
        easyMode: {
          field: 5,
          delay: 2000
        },
        normalMode: {
          field: 10,
          delay: 1000
        },
        hardMode: {
          field: 15,
          delay: 500
        }
      };
      for (let elem in data) {
        if (elem === selectMode) {
          const { field, delay } = data[elem];
          this.setState({
            field,
            delay,
            start: true ,
            disabled: true ,
            message: ''
          });
        }
      }
    }
  }

  handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  showMessage = msg => {
    this.setState({
      message: msg,
      buttonText: "Play Again",
      start: false,
      disabled: false,
    });
  };

  render() {
    const {
      winners,
      message,
      field,
      delay,
      userName,
      start,
      buttonText,
      disabled
    } = this.state;
    return (
      <div className="App">
        <Container>
          <Form onSubmit={e => this.onSubmit(e)} className="mainForm">
            <Row form>
              <Col md={5} className="mb-2">
                <Input
                  type="select"
                  name="selectMode"
                  onChange={e => this.handleChange(e)}
                >
                  <option value="">Pick game mode</option>
                  <option value="easyMode">Easy</option>
                  <option value="normalMode">Normal</option>
                  <option value="hardMode">Hard</option>
                </Input>
              </Col>
              <Col md={5} className="mb-2">
                <Input
                  type="text"
                  name="userName"
                  value={userName}
                  placeholder="Enter your name"
                  onChange={e => this.handleChange(e)}
                />
              </Col>
              <Col md={2}>
                <Button
                  disabled={disabled}
                >
                  {buttonText}
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col>
              <div className="message">
                {message.length ? <h3>{message}</h3> : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {
                ((field !== undefined) || (delay !== undefined))
                ?
                <Game
                  field={field}
                  delay={delay}
                  userName={userName}
                  onShowMessage={this.showMessage}
                  start={start}
                />
                :
                null
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <DataTable winners={winners} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
