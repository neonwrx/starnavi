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
    settings: {},
    field: null,
    delay: null,
    start: false,
    disabled: false
  };

  componentDidMount() {
    this.getWinners();
    axios
      .get(`https://starnavi-frontend-test-task.herokuapp.com/game-settings`, {
        crossdomain: true,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        const settings = res.data;
        this.setState({ settings });
      });
  }

  getWinners() {
    axios
      .get(`https://starnavi-frontend-test-task.herokuapp.com/winners`, {
        crossdomain: true,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        const winners = res.data;
        this.setState({ winners });
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const { userName, selectMode, settings } = this.state;
    if (userName !== "" && selectMode !== "") {
      for (let elem in settings) {
        if (elem === selectMode) {
          const { field, delay } = settings[elem];
          this.setState({
            field,
            delay,
            start: true,
            disabled: true,
            message: ""
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

  showMessage = name => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthsNamed = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${hours}:${minutes}; ${day} ${
      monthsNamed[month]
    } ${year}`;
    this.setState({
      message: `${name} won`,
      buttonText: "Play Again",
      start: false,
      disabled: false
    });
    axios
      .post(
        `https://12starnavi-frontend-test-task.herokuapp.com/winners`,
        { winner: name, date: formattedDate },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.getWinners();
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
                <Button disabled={disabled}>{buttonText}</Button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col>
              <div className="message">
                {message.length > 0 && <h3>{message}</h3>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {(field || delay) && (
                <Game
                  field={field}
                  delay={delay}
                  userName={userName}
                  onShowMessage={this.showMessage}
                  start={start}
                />
              )}
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
