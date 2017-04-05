import React from 'react';
import Presence from '../model/Presence';
import { PresenceEvents } from '../model/events';

class EditeurPresence extends React.Component {

  fireEvent(name, value) {
    console.log("Firing " + name + " val " + value);
    if (this.props.eventListener) {
      this.props.eventListener(name, value);
    }
  }

  simpleIntValueEmit(eventToFire, event) {
    let val = parseInt(event.target.value, 10);

    this.fireEvent(eventToFire, val);
  }

  visitChange(event) {
    let checked = event.target.checked;

    this.fireEvent(PresenceEvents.VISIT, checked);
  }

  doublePlayChange(event) {
    let checked = event.target.checked;

    this.fireEvent(PresenceEvents.DOUBLE_PLAY, checked);
  }

  defensivePlayChange(event) {
    let val = event.target.value.split('\n');

    this.fireEvent(PresenceEvents.DEFENSIVE_PLAY, val);
  }

  simpleValueEmit(eventToFire, event) {
    let val = event.target.value;

    this.fireEvent(eventToFire, val)
  }

  renderForm() {
    let defensivePlay = ''

    if (this.props.presence.defensivePlay != null && this.props.presence.defensivePlay.length > 0) {
      defensivePlay = this.props.presence.defensivePlay.join('\n')
    }

    let divStyle = { textAlign: 'left', margin: 'auto', display: 'inline-block' }

    return (
      <table>
        <tbody>

          <tr>
            <td>Frappeur/coureur est au:</td>
            <td>
              <div style={divStyle} >
                <input type="radio" value="0" name="runnerAtRadio" checked={this.props.presence.runnerAt === 0} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.RUNNER_AT)} />Bâton<br />
                <input type="radio" value="1" name="runnerAtRadio" checked={this.props.presence.runnerAt === 1} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.RUNNER_AT)} />1er<br />
                <input type="radio" value="2" name="runnerAtRadio" checked={this.props.presence.runnerAt === 2} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.RUNNER_AT)} />2e<br />
                <input type="radio" value="3" name="runnerAtRadio" checked={this.props.presence.runnerAt === 3} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.RUNNER_AT)} />3e<br />
                <input type="radio" value="4" name="runnerAtRadio" checked={this.props.presence.runnerAt === 4} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.RUNNER_AT)} />Marbre
              </div>
            </td>
          </tr>

          <tr>
            <td>Justifications d'avances sur les buts</td>
            <td>
              1 <input type="text" value={this.props.presence.line1Text} onChange={this.simpleValueEmit.bind(this, PresenceEvents.BASE_LINE_JUSTIFICATION_1)} /><br />
              2 <input type="text" value={this.props.presence.line2Text} onChange={this.simpleValueEmit.bind(this, PresenceEvents.BASE_LINE_JUSTIFICATION_2)} /><br />
              3 <input type="text" value={this.props.presence.line3Text} onChange={this.simpleValueEmit.bind(this, PresenceEvents.BASE_LINE_JUSTIFICATION_3)} /><br />
              4 <input type="text" value={this.props.presence.line4Text} onChange={this.simpleValueEmit.bind(this, PresenceEvents.BASE_LINE_JUSTIFICATION_4)} /><br />
            </td>
          </tr>

          <tr>
            <td>Visite au monticule</td>
            <td><input type="checkbox" checked={!!this.props.presence.visit} onChange={this.visitChange.bind(this)} /></td>
          </tr>

          <tr>
            <td>Double-jeu</td>
            <td><input type="checkbox" checked={!!this.props.presence.doublePlay} onChange={this.doublePlayChange.bind(this)} /></td>
          </tr>

          <tr>
            <td>Jeu défensif</td>
            <td><textarea onChange={this.defensivePlayChange.bind(this)} value={defensivePlay}></textarea></td>
          </tr>

          <tr>
            <td>Retraits</td>
            <td>
              <div style={divStyle} >
                <input type="radio" value="0" name="outRadio" checked={this.props.presence.out === 0} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.OUT)} />Aucun<br />
                <input type="radio" value="1" name="outRadio" checked={this.props.presence.out === 1} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.OUT)} />1<br />
                <input type="radio" value="2" name="outRadio" checked={this.props.presence.out === 2} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.OUT)} />2<br />
                <input type="radio" value="3" name="outRadio" checked={this.props.presence.out === 3} onChange={this.simpleIntValueEmit.bind(this, PresenceEvents.OUT)} />3<br />
              </div>
            </td>
          </tr>

          <tr>
            <td>Point produit</td>
            <td><input type="text" value={this.props.presence.rbi} onChange={this.simpleValueEmit.bind(this, PresenceEvents.RBI)} /></td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    if (this.props.presence) {
      return this.renderForm();
    } else {
      return (
        <span>Sélectionnez une case à gauche pour la modifier.</span>
      )
    }
  }
}

EditeurPresence.propTypes = {
  presence: React.PropTypes.instanceOf(Presence),
  eventListener: React.PropTypes.func,
};

export default EditeurPresence;
