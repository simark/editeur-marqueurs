import React, { Component } from 'react';
import './App.css';
import Case from './Case';
import Presence from '../model/Presence';
import EditeurPresence from './EditeurPresence';
import { PresenceEvents } from '../model/events';

class App extends Component {
  constructor(props) {
    super(props);

    let presence1 = new Presence()
    presence1.runnerAt = 0;
    let presence2 = new Presence()
    presence2.runnerAt = 1;
    presence2.line1Text = "BB";
    presence2.defensivePlay = ["5-4"];
    let presence3 = new Presence()
    presence3.runnerAt = 2;
    presence3.out = 2;
    presence3.line1Text = "1B";
    presence3.line2Text = "BV";
    presence3.defensivePlay = ["RV", "2-3"];
    let presence4 = new Presence()
    presence4.runnerAt = 3;
    presence4.out = 3;
    presence4.line1Text = "INT E2";
    presence4.line2Text = "MVL";
    presence4.line2Text = "BP";
    presence4.doublePlay = true;
    presence4.visit = true;
    let presence5 = new Presence()
    presence5.runnerAt = 4;
    presence5.rbi = 42;
    presence5.line1Text = "SAC E8";
    presence5.line2Text = "2B";
    presence5.line3Text = "E4";
    let presence6 = new Presence()
    presence6.runnerAt = 4;
    presence6.rbi = 'BV';
    presence6.line1Text = "2B";
    presence6.line2Text = "INT E2";
    presence6.line3Text = "E4";
    presence6.line4Text = "BV";
    presence6.doublePlay = true;
    presence6.visit = true;
    presence6.out = 6;
    let presence7 = new Presence()
    presence7.runnerAt = 4;
    presence7.rbi = 22;
    presence7.line4Text = "CC";
    presence7.out = 8;

    this.state = {
      presences: [
        presence1,
        presence2,
        presence3,
        presence4,
        presence5,
        presence6,
        presence7,
      ],
      presenceCourante: -1,
    }
  }

  selectionnerCasePresence(presence) {
    let idx = this.state.presences.findIndex(function (elem, index) {
      return elem === presence;
    });

    if (this.state.presenceCourante !== idx) {
      this.setState({ presenceCourante: idx })
    } else {
      this.setState({ presenceCourante: -1 })
    }

  }

  effacerPresenceCourante() {
    let presences = this.state.presences.slice();
    let idx = this.state.presenceCourante;

    presences[idx].clear();

    this.setState({ presences: presences });
  }

  updatePresenceCourante(prop, value) {
    let presences = this.state.presences.slice();
    let idx = this.state.presenceCourante;

    presences[idx][prop] = value;

    this.setState({ presences: presences });
  }

  editeurEventListener(name, value) {
    switch (name) {
      case PresenceEvents.VISIT:
        this.updatePresenceCourante('visit', value);
        break;
      case PresenceEvents.RUNNER_AT:
        this.updatePresenceCourante('runnerAt', value);
        break;
      case PresenceEvents.AT_BAT:
        this.updatePresenceCourante('atBat', value);
        break
      case PresenceEvents.DOUBLE_PLAY:
        this.updatePresenceCourante('doublePlay', value);
        break;
      case PresenceEvents.DEFENSIVE_PLAY:
        this.updatePresenceCourante('defensivePlay', value);
        break;
      case PresenceEvents.BASE_LINE_JUSTIFICATION_1:
        this.updatePresenceCourante('line1Text', value);
        break;
      case PresenceEvents.BASE_LINE_JUSTIFICATION_2:
        this.updatePresenceCourante('line2Text', value);
        break;
      case PresenceEvents.BASE_LINE_JUSTIFICATION_3:
        this.updatePresenceCourante('line3Text', value);
        break;
      case PresenceEvents.BASE_LINE_JUSTIFICATION_4:
        this.updatePresenceCourante('line4Text', value);
        break;
      case PresenceEvents.OUT:
        this.updatePresenceCourante('out', value);
        break;
      case PresenceEvents.RBI:
        this.updatePresenceCourante('rbi', value);
        break;
      case PresenceEvents.CLEAR_ALL:
        this.effacerPresenceCourante();
        break;
      case PresenceEvents.JERSEY_NUMBER:
        this.updatePresenceCourante('jerseyNumber', value)
        break;
      default:
        console.warn("Unhandled event in editeurEventListener.");
        break;
    }
  }

  render() {
    let app = this;
    let dispPresence = function (presence, idx) {

      return (
        <Case origX={2} origY={100 * idx} presence={presence} key={idx}
          actionSelection={app.selectionnerCasePresence.bind(app)}
          presenceCourante={idx === app.state.presenceCourante} />
      )
    }

    let svgHeight = 100 * this.state.presences.length + 5;
    let svgStyle = { height: svgHeight + 'px' };

    return (
      <div className="app">
        <div className="app-content">
          <div id="drawing-area-container">
            <svg id="drawing-area" style={svgStyle}>
              {this.state.presences.map(dispPresence)}
            </svg>
          </div>
          <div id="controls-container">
            <EditeurPresence presence={this.state.presenceCourante >= 0 ? this.state.presences[this.state.presenceCourante] : null}
              eventListener={this.editeurEventListener.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
