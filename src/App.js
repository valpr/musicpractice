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
        <select value={props.current1}class="note">
              {props.choices1.map((value)=>{
                return <option value={value}>{value}</option>
              })}
        </select>

        <select value={props.current2}class="note">
              {props.choices2.map((value)=>{
                return <option value={value}>{value}</option>
              })}
        </select>
    </div>
  )
}

function Intervals(props){
  const [note, setNote] = useState("C4");
  const [interval, setInterval] = useState("m4"); 
  //TONEJS Intervals are set in Hz, so should convert from major, minor, augmented, diminished
//https://www.liveabout.com/table-of-intervals-2455915
//TODO: implement logic to filter out invalid combinations (music theory)
//2, 3, 6, 7 have major, minor, augmented, diminished
//4, 5, 8 have diminished, augmented, diminished
//perhaps make sub-components?

  return (
      <div class="interval">
      <h1>Interval Selection</h1>
        <div class="noteDiv">
        <span>Note & Octave: </span>
        <select value="C" class="note">
              <option value="C">C</option>
              <option value="D">
                D
              </option>
              <option value="E">
                E
              </option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>

          <select value="4" class="note">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
        </div>
        <div class="intervalDiv">
        <span>Interval Type and Length: </span>

            <select class="type">
              <option value="Major/Perfect">Major/Perfect</option>
              <option value="Minor">
                Minor
              </option>
              <option value="Augmented">
                Augmented
              </option>
              <option value="Diminished">Diminished</option>

            </select>
          <select value="4" class="size">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
        </div>
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
