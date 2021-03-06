import React, { Component } from "react";
import PropTypes from "prop-types";

class Game extends Component {
  constructor(props) {
    super(props);
    this.myRef = [];
    this.state = {
      squares: Array.from(Array(props.field ** 2), (x, index) => index),
      userScores: 0,
      computerScores: 0,
      highlight: null,
      clicked: false
    };
  }
  componentDidMount() {
    const { delay } = this.props;
    this.intervalId = setInterval(this.timer, delay);
  }
  componentDidUpdate(prevProps) {
    const { start, delay, field } = this.props;
    if (start && start !== prevProps.start) {
      this.intervalId = setInterval(this.timer, delay);
      this.setState({
        squares: Array.from(Array(field ** 2), (x, index) => index),
        computerScores: 0,
        userScores: 0,
        highlight: null
      });
      for (let i = 0; i < field ** 2; i++) {
        this.myRef[i].style.backgroundColor = "white";
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  timer = () => {
    const {
      squares,
      computerScores,
      userScores,
      clicked,
      highlight
    } = this.state;
    const { field, userName, onShowMessage } = this.props;
    const halfSquares = (field ** 2 / 2).toFixed();
    const item = squares[Math.floor(Math.random() * squares.length)];

    const finishGame = (name, color) => {
      clearInterval(this.intervalId);
      this.myRef[highlight].style.backgroundColor = color;
      onShowMessage(name);
    };
    if (computerScores >= halfSquares) {
      finishGame("Computer", "red");
    } else if (userScores >= halfSquares) {
      finishGame(userName, "green");
    } else {
      this.myRef[item].style.backgroundColor = "blue";
      for (const i of squares) {
        if (squares[i] === item) {
          squares.splice(i, 1);
        }
      }
      this.setState({
        highlight: item,
        squares,
        clicked: false
      });
      if (!clicked) {
        this.setState({
          computerScores: computerScores + 1
        });
        if (highlight) {
          this.myRef[highlight].style.backgroundColor = "red";
        }
      }
    }
  };

  handleClick(index) {
    const { userScores, highlight } = this.state;
    if (index === highlight) {
      this.myRef[index].style.backgroundColor = "green";
      this.setState({
        userScores: userScores + 1,
        clicked: true
      });
    }
  }
  renderSquares(field) {
    let squares = [...Array(field ** 2)];
    return squares.map((item, index) => {
      return (
        <div
          className="game-cell"
          key={index}
          style={{ flexBasis: `${100 / field}%` }}
          ref={ref => {
            this.myRef[index] = ref;
            return true;
          }}
          onClick={() => this.handleClick(index)}
        >
          <div className="game-item" />
        </div>
      );
    });
  }
  render() {
    const { field } = this.props;
    return (
      <div
        className="game-container"
        style={{
          maxWidth: `${
            field === 5 ? "320px" : field === 10 ? "480px" : "640px"
          }`
        }}
      >
        {this.renderSquares(field)}
      </div>
    );
  }
}

Game.propTypes = {
  delay: PropTypes.number,
  start: PropTypes.bool,
  field: PropTypes.number,
  userName: PropTypes.string,
  onShowMessage: PropTypes.func
};

export default Game;
