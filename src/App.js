import React from 'react'
import games from './games.js'
import teams from './teams.js'

class Team extends React.Component {
  render() {
    let img = null
    if (Array.isArray(this.props.team.logos)) {
      img = <img src={this.props.team.logos[0]} alt="" style={{
        'objectFit': 'contain',
        'height': '80%',
        'width': '100%',

      }} />
    }
    return <div style={{
      backgroundColor: this.props.team.color,
      height: '200px',
      'textAlign': 'center',
      'alignContent': 'center',
      'width': '100%'
    }}>
      <span>{this.props.team.school} - {this.props.team.mascot}</span>
      <span style={{
        'verticalAlign': 'middle',
        'marginBottom': '0.75em',
        'objectFit': 'contain'
      }}>{img} {this.props.score} </span>
    </div>
  };
}

class Game extends React.Component {
  render() {
    return <div style={{
      'display': 'flex',
      'width': '100%'
    }}>
      <Team team={this.props.home_team} score='13' /> <Team team={this.props.away_team} score='9' />
    </div>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      games: []
    };
  }

  componentDidMount() {
    this.load(false)
  }

  load(live) {
    if (live) {
      fetch("https://api.collegefootballdata.com/teams")
        .then(res => res.json())
        .then(result => this.setState({ teams: result }))
      fetch("https://api.collegefootballdata.com/games?year=2020&seasonType=postseason")
        .then(res => res.json())
        .then(result => this.setState({ games: result }))
    } else {
      console.log(this.index('id', games))
      this.setState({ teams: teams, games: games })
    }
  }

  index(varName, data) {
    return Object.assign({}, ...data.map((x) => ({ [x[varName]]: x })))
  }

  render() {
    const listItems = this.state.teams.map((team) =>
      <Game home_team={team} away_team={team} />
    );
    return <ul style={{
      'listStyle': null,
      'padding': '0%',
      'verticalAlign': 'top'
    }}>{listItems}</ul>
  };
}

export default App;
