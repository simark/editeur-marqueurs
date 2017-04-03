import React from 'react';
import Presence from '../model/Presence';
import { PresenceEvents } from '../model/events';

class EditeurPresence extends React.Component {

  fireEvent(name, value) {
    console.log ("Firing " + name + " val " + value);
    if (this.props.eventListener) {
      this.props.eventListener(name, value);
    }
  }
  
  runnerAtChange(event) {
    let val = parseInt(event.target.value, 10);

    this.fireEvent(PresenceEvents.RUNNER_AT, val);
  }
  
  visitChange(event) {
    let checked = event.target.checked;
    
    this.fireEvent(PresenceEvents.VISIT, checked);
  }
  
  renderForm() {
    return (
      <table>
        <tbody>
        
          <tr>
            <td>Frappeur/coureur est au:</td>
            <td>
              <input type="radio" value="0" name="runnerAtRadio" checked={this.props.presence.runnerAt===0} onChange={this.runnerAtChange.bind(this)} />Bâton
              <input type="radio" value="1" name="runnerAtRadio" checked={this.props.presence.runnerAt===1} onChange={this.runnerAtChange.bind(this)} />1er
              <input type="radio" value="2" name="runnerAtRadio" checked={this.props.presence.runnerAt===2} onChange={this.runnerAtChange.bind(this)} />2e
              <input type="radio" value="3" name="runnerAtRadio" checked={this.props.presence.runnerAt===3} onChange={this.runnerAtChange.bind(this)} />3e
              <input type="radio" value="4" name="runnerAtRadio" checked={this.props.presence.runnerAt===4} onChange={this.runnerAtChange.bind(this)} />Marbre
            </td>
          </tr>
        
          <tr>
            <td>Visite au monticule?</td>
            <td><input type="checkbox" checked={!!this.props.presence.visit} onChange={this.visitChange.bind(this)} /></td>
          </tr>
        </tbody>
      </table>
    )
  }  
  
  render () {
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
