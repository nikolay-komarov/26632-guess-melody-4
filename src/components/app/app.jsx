import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  _renderGameScreen() {
    const {errorCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorCount={errorCount}
          onWelcomeButtonClick={() => {
            this.setState({
              step: 0,
            });
          }}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type = {GameType.ARTIST}
            >
              <ArtistQuestionScreen
                question={question}
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type = {GameType.GENRE}
            >
              <GenreQuestionScreen
                question={question}
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <ArtistQuestionScreen
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreen
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
