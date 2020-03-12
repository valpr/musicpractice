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
    <div>
        <span>{props.title} </span>
        <select onChange={props.onChange1} value={props.current1}>
              {props.choices1.map((value)=>{
                return <option key={value} value={value}>{value}</option>
              })}
        </select>

        <select onChange={props.onChange2} value={props.current2}>
              {props.choices2.map((value)=>{
                return <option key={value} value={value}>{value}</option>
              })}
        </select>
    </div>
  )
}

function useInput(initialValue){
  const [value, setValue] = useState(initialValue);
  function handleChange(e){
    setValue(e.target.value);
  }
  return [value, handleChange];
}

function Intervals(props){
  const [note, setNote] = useInput("C");
  const [octave, setOctave] = useInput("4")
  const [interval, setInterval] = useInput("Perfect"); 
  const [intervalSize, setIntervalSize] = useInput(5);
  let synth = new Tone.Synth().toMaster();


  function handleClick(){ 
    let modifier = 0;
    let modifiedInterval = interval;
    let modifiedIntervalSize= parseInt(intervalSize);
    const semitoneLibrary= {
      Minor2:1,
      Major2:2,
      Minor3:3,
      Major3:4,
      Perfect4:5,
      Perfect5:7,
      Minor6:8,
      Major6:9,
      Minor7:10,
      Major7:11,
      Perfect8:12,
    }
    if(interval ==="Augmented"){
      modifier = 1;
      if(modifiedIntervalSize === 4 || modifiedIntervalSize===5 || modifiedIntervalSize === 8){
        modifiedInterval= "Perfect";
      }  else{
        modifiedInterval = "Major"
      }
    }else if(interval ==="Diminished"){
      modifier = -1;
      if(modifiedIntervalSize === 4 || modifiedIntervalSize===5 || modifiedIntervalSize === 8){
        modifiedInterval= "Perfect";
      }  else{
        modifiedInterval = "Minor"
      }
    }


    let semitoneSteps = semitoneLibrary[modifiedInterval+modifiedIntervalSize]+modifier;
    console.log(semitoneSteps);
    let secondNote = Tone.Frequency(note+octave).transpose(semitoneSteps);
    


    //play notes
    synth.triggerAttackRelease(note+octave, 0.5);
    setTimeout(() =>{synth.triggerAttackRelease(secondNote, 0.5)},1000)
    


  }
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
      intervalWidths = [2, 3, 4, 5, 6, 7];
      break;
    case "Diminished":
      intervalWidths = [2, 3, 4, 5, 6, 7];
      break;
    default:
      break;
  }
  return (
      <div className="interval">
      <h1>Interval Selection</h1>
        <Choices  onChange1={setNote} onChange2={setOctave} title="Note & Octave" current1={note} current2={octave} choices1={noteSelection} choices2={octaveSelection}/>
        <Choices  onChange1={setInterval} onChange2={setIntervalSize} title="Interval Type and Length:" current1={interval} current2={intervalSize} choices1={intervalSelection} choices2={intervalWidths}/>
        <button onClick={handleClick}> Play</button>

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
    new Tone.Loop(function(time){
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
