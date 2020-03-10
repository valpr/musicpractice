import React, {useState} from 'react';
import './App.css';
import Tone from 'tone'


class App extends React.Component {
  render(){

    return (
      <div className="App">
        <div className="Inner">
          <div className="Metronome">
            <Metronome/>
            <Intervals/>
          </div>
        </div>
      </div>
    );
  }
}

function Choices(props){
  return(
    <div class="noteDiv">
        <span>{props.title} </span>
        <select value={props.current1}>
              {props.choices1.map((value)=>{
                return <option value={value}>{value}</option>
              })}
        </select>

        <select value={props.current2}>
              {props.choices2.map((value)=>{
                return <option value={value}>{value}</option>
              })}
        </select>
    </div>
  )
}

function Intervals(props){
  const [note, setNote] = useState("C");
  const [octave, setOctave] = useState("4")
  const [interval, setInterval] = useState("Perfect"); 
  const [intervalSize, setIntervalSize] = useState(5);
  //TONEJS Intervals are set in Hz, so should convert from major, minor, augmented, diminished
//https://www.liveabout.com/table-of-intervals-2455915
//TODO Give state to components
  const noteSelection= ["C","D","E","F","G","A", "B"];
  const octaveSelection = [1, 2, 3, 4, 5, 6, 7];
  const intervalSelection = ["Major", "Minor", "Perfect", "Augmented", "Diminished"];
  let intervalWidths = [];
  switch(interval){
    case "Major":
      intervalWidths = [2,3,6,7];
      break;
    case "Minor":
      intervalWidths = [2,3,6,7];
      break;      
    case "Perfect":
      intervalWidths = [4,5,8];
      break;
    case "Augmented":
      intervalWidths = [2, 3, 4, 5, 6, 7, 8];
      break;
    case "Diminished":
      intervalWidths = [2, 3, 4, 5, 6, 7, 8];
      break;
  }
  return (
      <div class="interval">
      <h1>Interval Selection</h1>
        <Choices title="Note & Octave" current1={note} current2={octave} choices1={noteSelection} choices2={octaveSelection}/>
        <Choices title="Interval Type and Length:" current1={interval} interval2={intervalSize} choices1={intervalSelection} choices2={intervalWidths}/>
        <button> Play</button>

      </div>
    )
}




class Metronome extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      playing:false,
      bpm: Tone.Transport.bpm.value,
    }

  }

  startStop = () =>{
    if (this.state.playing){
      //stop the timer
      this.setState({
        playing : false,
      });
      Tone.Transport.pause();
    } else{
      this.setState({
        playing: true
      })
      Tone.Transport.start();
    }
  }


  handleBpmChange = event =>{
    const bpm = event.target.value;
    if (this.state.playing){
      this.setState( (state) => ({
        bpm: bpm,
      })); 
      Tone.Transport.bpm.value = this.state.bpm;
    }else{
      this.setState((state) => ({
        bpm: bpm,
      }));
      Tone.Transport.bpm.value = this.state.bpm;
    }
  }


  
  render(){
    const synth = new Tone.MembraneSynth().toMaster();
    const loop = new Tone.Loop(function(time){
      synth.triggerAttackRelease("C2","4n");
    },"4n").start(0);
    let bpm = this.state.bpm;
    return(
        <div className="Metronome">
          <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input type = "range" min = "60" 
            max = "240" value = {bpm} 
            onChange={this.handleBpmChange}/>
          </div>
          <button onClick={this.startStop}> {this.state.playing ? 'Stop' : 'Start'}</button>
        </div>
    )}
}


export default App;
