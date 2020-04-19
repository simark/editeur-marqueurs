import React from 'react';
import Presence from '../model/Presence';

class Case extends React.Component {
  
  selectionner (e) {
    if (this.props.actionSelection) {
      this.props.actionSelection(this.props.presence);
    }
  }
  
  render() {
    
    var drawBase = function (basePos) {
      return (
        <circle cx={ basePos.x } cy={ basePos.y } r="2" fill="darkblue" />
      );
    };

    var drawHitNumber = function (text, x, y) {
      return (
        <g>
          <text x={ x } y={ y } textAnchor="middle" dominantBaseline="middle" fontSize="12">{ text }</text>
        </g>
      );
    };

    var drawNotAnAB = function (text, x, y) {
      return (
        <g>
          <text x={ x } y={ y } textAnchor="start" dominantBaseline="middle" fontSize="12">{ text }</text>
        </g>
      );
    };

    var drawAtBatCircle = function (value, positions) {
      console.log(value);
      if (value === "") {
        return;
      }
      var position = positions[value];

      return <circle cx={ position.x } cy={ position.y } r="7" fillOpacity="0" stroke="darkblue" strokeWidth="2"  />
    };

    var drawBaseLine = function (from, to) {
      return (
        <line x1={ from.x } y1={ from.y } x2={ to.x } y2={ to.y } stroke="darkblue" strokeWidth="2" />
      );
    };
    
    var drawRbi = function (rbiText, position) {
      if (!rbiText)
        return null;
      
      return (
        <text x={ position.x } y={ position.y } fill="darkblue" textAnchor="middle" dominantBaseline="middle" fontSize="25">{ rbiText }</text>
      );
    };

    var drawOutCircle = function (bottomRightPos) {
      var computeD = function () {
        var radius = 23
        return "M " + (bottomRightPos.x - radius) + " " + bottomRightPos.y + " A " + radius + " " + radius + " 0 0 1 " + ( bottomRightPos.x ) + " " + (bottomRightPos.y - radius);
      };

      return (
          <path d={ computeD() } fillOpacity="0" stroke="darkblue" strokeWidth="2" />
      )
    }
    
    var drawOut = function (out, bottomRightPos) {
      if (!out)
        return null
      
      return (
          <text x={ bottomRightPos.x - 3 } y={ bottomRightPos.y - 3 } fill="darkblue" textAnchor="end" dominantBaseline="baseline" fontSize="17">{ out }</text>
      )
    }
    
    var drawLineText = function (text, pos) {
      if (!text)
        return null;
        
      let svgTest = document.getElementById('testing');
           
      while (svgTest.hasChildNodes()) {
        svgTest.removeChild(svgTest.lastChild);
      }
      
      let testText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      testText.setAttribute('x', 20);
      testText.setAttribute('y', 40);
      testText.setAttribute('fill', 'red')
      testText.setAttribute('font-size', "17px");
      testText.setAttribute('font-family', "sans-serif");

      testText.textContent = text;
      
      svgTest.appendChild(testText);
      
      let bbox = testText.getBoundingClientRect();
      
      while (svgTest.hasChildNodes()) {
        svgTest.removeChild(svgTest.lastChild);
      }

      let boxX = pos.x - bbox.width / 2 - 2
      let boxY = pos.dominantBaseline === "hanging" ? pos.y - 4  : pos.y - bbox.height + 3
      let boxW = bbox.width + 4
      let boxH = bbox.height 
      let rad = 10;

      let t = "rotate(" + pos.rotation + ", " + pos.x + ", " + pos.y + ")";
      return (
        <g transform={ t }>
          <rect x={boxX} y={boxY} height={boxH} width={boxW} fillOpacity="0" strokeWidth="0" stroke="darkblue" rx={rad} ry={rad} />
          <text x={pos.x} y={pos.y} fill="darkblue" textAnchor="middle" dominantBaseline={ pos.dominantBaseline } fontSize="17">{text}</text>
        </g>
      )
    };
    
    var drawDefensivePlay = function (text, centerPos) {
      if (!text)
        return null
        
      var drawOneLine = function (line, idx) {
        var dy = "1em";

        // Place the first tspan relatively to <text>.  Subsequent tspans will be placed relatively to this one (thus the 1em).
        if (idx === 0)
          dy = -((text.length - 1) / 2) + "em"

        return (
          <tspan key={idx} x={centerPos.x} dy={dy} textAnchor="middle" dominantBaseline="middle" letterSpacing="2">{line}</tspan>
        );
      }
        
      return (
        <text  x={centerPos.x} y={centerPos.y} fill="darkblue" fontSize="17">
          {text.map(drawOneLine)}
        </text>
      )
    }
    
    var drawDoublePlay = function (hasDoublePlay, bottomLeftPos) {
      if (!hasDoublePlay)
        return null;
        
      return (
        <text x={bottomLeftPos.x + 3} y={bottomLeftPos.y - 3} fill="darkblue" textAnchor="start" dominantBaseline="baseline" fontSize="17">DJ</text>
      )
    }
    
    var drawVisit = function (hasVisit, topRightPos) {
      if (!hasVisit)
        return null;
        
      return (
        <text x={topRightPos.x - 3} y={topRightPos.y + 3} fill="darkblue" textAnchor="end" dominantBaseline="hanging" fontSize="17">V</text>
      )
    }

    var bottomRight = {
      x: this.props.origX + this.props.width,
      y: this.props.origY + this.props.height,
    };

    var bottomLeft = {
      x: this.props.origX,
      y: this.props.origY + this.props.height,
    };

    var topRight = {
      x: this.props.origX + this.props.width,
      y: this.props.origY,
    };

    var homePlateCoord = {
      x: this.props.origX + Math.floor(this.props.width * 72 / 133),
      y: this.props.origY + Math.floor(this.props.height * 84 / 100),
    };
    var firstBaseCoord = {
      x: this.props.origX + Math.floor(this.props.width * 103 / 133),
      y: this.props.origY + Math.floor(this.props.height * 54 / 100),
    };
    var secondBaseCoord = {
      x: this.props.origX + Math.floor(this.props.width * 72 / 133),
      y: this.props.origY + Math.floor(this.props.height * 24 / 100),
    };
    var thirdBaseCoord = {
      x: this.props.origX + Math.floor(this.props.width * 43 / 133),
      y: this.props.origY + Math.floor(this.props.height * 54 / 100),
    };

    var fieldCenter = {
      x: secondBaseCoord.x,
      y: thirdBaseCoord.y,
    };

    let lineTextPosFuzz = 5;
    let lineTextPosLeft = Math.floor((thirdBaseCoord.x + secondBaseCoord.x) / 2) - lineTextPosFuzz;;
    let lineTextPosRight = Math.floor((secondBaseCoord.x + firstBaseCoord.x) / 2) + lineTextPosFuzz;

    let lineTextPosTop = Math.floor((secondBaseCoord.y + thirdBaseCoord.y) / 2) - lineTextPosFuzz;
    let lineTextPosBottom = Math.floor((thirdBaseCoord.y + homePlateCoord.y) / 2) + lineTextPosFuzz;
    
    var line1TextPos = {
      x: lineTextPosRight,
      y: lineTextPosBottom,
      dominantBaseline: "hanging",
      rotation: -45,
    };
    
    var line2TextPos = {
      x: lineTextPosRight,
      y: lineTextPosTop,
      dominantBaseline: "baseline",
      rotation: 45,
    };
    
    var line3TextPos = {
      x: lineTextPosLeft,
      y: lineTextPosTop,
      dominantBaseline: "baseline",
      rotation: -45,
    };
    
    var line4TextPos = {
      x: lineTextPosLeft,
      y: lineTextPosBottom,
      dominantBaseline: "hanging",
      rotation: 45,
    };

    var hitNumberY = this.props.origY + Math.floor(this.props.height * 13 / 100);
    var hitNumber1X = this.props.origX + Math.floor(this.props.width * 35 / 133);
    var hitNumber2X = this.props.origX + Math.floor(this.props.width * 55 / 133);
    var hitNumber3X = this.props.origX + Math.floor(this.props.width * 73 / 133);
    var hitNumberCCX = this.props.origX + Math.floor(this.props.width * 96 / 133);

    var notAnABX = this.props.origX + Math.floor(this.props.width * 4 / 133);
    var notAnAbBBY = this.props.origY + Math.floor(this.props.height * 35 / 100);
    var notAnAbFAY = this.props.origY + Math.floor(this.props.height * 53 / 100);
    var notAnAbSACY = this.props.origY + Math.floor(this.props.height * 70 / 100);
    var notAnAbINTY = this.props.origY + Math.floor(this.props.height * 87 / 100);

    var positionsAtBat = {
      '1': {
        x: hitNumber1X,
        y: hitNumberY,
      },
      '2': {
        x: hitNumber2X,
        y: hitNumberY,
      },
      '3': {
        x: hitNumber3X,
        y: hitNumberY,
      },
      'CC': {
        x: hitNumberCCX,
        y: hitNumberY,
      },
      'BB': {
        x: notAnABX,
        y: notAnAbBBY,
      },
      'FA': {
        x: notAnABX,
        y: notAnAbFAY,
      },
      'SAC': {
        x: notAnABX,
        y: notAnAbSACY,
      },
      'INT': {
        x: notAnABX,
        y: notAnAbINTY,
      },
    };

    return (
      <g>
        <rect x={ this.props.origX } y={ this.props.origY } width={ this.props.width } height={ this.props.height }
          style={{ fill: this.props.presenceCourante ? "white" : "lightgrey", stroke: "darkblue", strokeWidth: 2 }} />

        { drawBase(homePlateCoord) }
        { drawBase(firstBaseCoord) }
        { drawBase(secondBaseCoord) }
        { drawBase(thirdBaseCoord) }

        { drawHitNumber("1", hitNumber1X, hitNumberY) }
        { drawHitNumber("2", hitNumber2X, hitNumberY) }
        { drawHitNumber("3", hitNumber3X, hitNumberY) }
        { drawHitNumber("CC", hitNumberCCX, hitNumberY) }

        { drawNotAnAB("BB", notAnABX, notAnAbBBY) }
        { drawNotAnAB("FA", notAnABX, notAnAbFAY) }
        { drawNotAnAB("SAC", notAnABX, notAnAbSACY) }
        { drawNotAnAB("INT", notAnABX, notAnAbINTY) }

        { drawAtBatCircle(this.props.presence.atBat, positionsAtBat) }

        { this.props.presence.runnerAt > 0 && drawBaseLine(homePlateCoord, firstBaseCoord) }
        { this.props.presence.runnerAt > 1 && drawBaseLine(firstBaseCoord, secondBaseCoord) }
        { this.props.presence.runnerAt > 2 && drawBaseLine(secondBaseCoord, thirdBaseCoord) }
        { this.props.presence.runnerAt > 3 && drawBaseLine(thirdBaseCoord, homePlateCoord) }

        { drawRbi(this.props.presence.rbi, fieldCenter) }
        
        { drawOutCircle(bottomRight) }
        { drawOut(this.props.presence.out, bottomRight) }
        
        { drawLineText(this.props.presence.line1Text, line1TextPos) }
        { drawLineText(this.props.presence.line2Text, line2TextPos) }
        { drawLineText(this.props.presence.line3Text, line3TextPos) }
        { drawLineText(this.props.presence.line4Text, line4TextPos) }

        { drawDefensivePlay(this.props.presence.defensivePlay, fieldCenter) }

        { drawDoublePlay(this.props.presence.doublePlay, bottomLeft) }
        { drawVisit(this.props.presence.visit, topRight) }

        <rect x={ this.props.origX } y={ this.props.origY } width={ this.props.width } height={ this.props.height }
          fillOpacity="0" onClick={this.selectionner.bind(this)} />
      </g>
    );
  }
}

Case.defaultProps = {
  origX: 0,
  origY: 0,
  width: 133,
  height: 100,
};

Case.propTypes = {
  origX: React.PropTypes.number,
  origY: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  
  presence: React.PropTypes.instanceOf(Presence).isRequired,
  
  actionSelection: React.PropTypes.func,
  
  presenceCourante: React.PropTypes.bool,
};

export default Case;
