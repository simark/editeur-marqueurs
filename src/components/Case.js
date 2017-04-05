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
    
    var drawBaseLine = function (from, to) {
      return (
        <line x1={ from.x } y1={ from.y } x2={ to.x } y2={ to.y } stroke="darkblue" strokeWidth="2" />
      );
    };
    
    var drawRbi = function (rbiText, position) {
      if (!rbiText)
        return null;
      
      return (
        <text x={ position.x } y={ position.y } fill="darkblue" textAnchor="middle" alignmentBaseline="middle" fontSize="25">{ rbiText }</text>
      );
    };
    
    var drawOut = function (out, bottomRightPos) {
      if (!out)
        return null
      
      var computeD = function () {
        var radius = 23
        return "M " + (bottomRightPos.x - radius) + " " + bottomRightPos.y + " A " + radius + " " + radius + " 0 0 1 " + ( bottomRightPos.x ) + " " + (bottomRightPos.y - radius);
      };

      return (
        <g>
          <text x={ bottomRightPos.x - 3 } y={ bottomRightPos.y - 3 } fill="darkblue" textAnchor="end" alignmentBaseline="baseline" fontSize="17">{ out }</text>
          <path d={ computeD() } fillOpacity="0" stroke="darkblue" strokeWidth="2" />
        </g>
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
      let boxY = pos.alignmentBaseline === "hanging" ? pos.y - 4  : pos.y - bbox.height + 3
      let boxW = bbox.width + 4
      let boxH = bbox.height 
      let rad = 10;

      let t = "rotate(" + pos.rotation + ", " + pos.x + ", " + pos.y + ")";
      return (
        <g transform={ t }>
          <rect x={boxX} y={boxY} height={boxH} width={boxW} fillOpacity="0" strokeWidth="0" stroke="darkblue" rx={rad} ry={rad} />
          <text x={pos.x} y={pos.y} fill="darkblue" textAnchor="middle" alignmentBaseline={ pos.alignmentBaseline } fontSize="17">{text}</text>
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
          <tspan key={idx} x={centerPos.x} dy={dy} textAnchor="middle" alignmentBaseline="middle" letterSpacing="2">{line}</tspan>
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
        <text x={bottomLeftPos.x + 3} y={bottomLeftPos.y - 3} fill="darkblue" textAnchor="start" alignmentBaseline="baseline" fontSize="17">DJ</text>
      )
    }
    
    var drawVisit = function (hasVisit, topRightPos) {
      if (!hasVisit)
        return null;
        
      return (
        <text x={topRightPos.x - 3} y={topRightPos.y + 3} fill="darkblue" textAnchor="end" alignmentBaseline="hanging" fontSize="17">V</text>
      )
    }

    var distanceDotsToBorderH = this.props.width / 6.0;
    var distanceDotsToBorderV = this.props.height / 6.0;

    var center = {
      x: this.props.origX + this.props.width / 2,
      y: this.props.origY + this.props.height / 2,
    };
    
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
      x: center.x,
      y: this.props.origY + this.props.height - distanceDotsToBorderV,
    };
    var firstBaseCoord = {
      x: this.props.origX + this.props.width - distanceDotsToBorderH,
      y: center.y,
    };
    var secondBaseCoord = {
      x: center.x,
      y: this.props.origY + distanceDotsToBorderV,
    };
    var thirdBaseCoord = {
      x: this.props.origX + distanceDotsToBorderH,
      y: center.y,
    };
    
    let lineTextPosLeft = this.props.origX + this.props.width / 3.0 - 3;
    let lineTextPosRight = this.props.origX + 2 * this.props.width / 3.0 + 3;
    let lineTextPosTop = this.props.origY + this.props.height / 3.0 - 3;
    let lineTextPosBottom = this.props.origY + 2 * this.props.height / 3.0 + 3;
    
    var line1TextPos = {
      x: lineTextPosRight,
      y: lineTextPosBottom,
      alignmentBaseline: "hanging",
      rotation: -45,
    };
    
    var line2TextPos = {
      x: lineTextPosRight,
      y: lineTextPosTop,
      alignmentBaseline: "baseline",
      rotation: 45,
    };
    
    var line3TextPos = {
      x: lineTextPosLeft,
      y: lineTextPosTop,
      alignmentBaseline: "baseline",
      rotation: -45,
    };
    
    var line4TextPos = {
      x: lineTextPosLeft,
      y: lineTextPosBottom,
      alignmentBaseline: "hanging",
      rotation: 45,
    };
    
    return (
      <g>
        <rect x={ this.props.origX } y={ this.props.origY } width={ this.props.width } height={ this.props.height }
          style={{ fill: this.props.presenceCourante ? "white" : "lightgrey", stroke: "darkblue", strokeWidth: 2 }} />

        { drawBase(homePlateCoord) }
        { drawBase(firstBaseCoord) }
        { drawBase(secondBaseCoord) }
        { drawBase(thirdBaseCoord) }
        
        { this.props.presence.runnerAt > 0 && drawBaseLine(homePlateCoord, firstBaseCoord) }
        { this.props.presence.runnerAt > 1 && drawBaseLine(firstBaseCoord, secondBaseCoord) }
        { this.props.presence.runnerAt > 2 && drawBaseLine(secondBaseCoord, thirdBaseCoord) }
        { this.props.presence.runnerAt > 3 && drawBaseLine(thirdBaseCoord, homePlateCoord) }

        { drawRbi(this.props.presence.rbi, center) }
        
        { drawOut(this.props.presence.out, bottomRight) }
        
        { drawLineText(this.props.presence.line1Text, line1TextPos) }
        { drawLineText(this.props.presence.line2Text, line2TextPos) }
        { drawLineText(this.props.presence.line3Text, line3TextPos) }
        { drawLineText(this.props.presence.line4Text, line4TextPos) }

        { drawDefensivePlay(this.props.presence.defensivePlay, center) }

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
  width: 100,
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
