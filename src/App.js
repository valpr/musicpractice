import React from 'react';
import './App.css';
import Tone from 'tone'


class App extends React.Component {
  render(){

    return (
      <div className="App">
        <div className="Inner">
          <div className="Metronome">
            <Metronome>

            </Metronome>
          </div>
        </div>
      </div>
    );
  }
}



class Metronome extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      playing:false,
      bpm: Tone.Transport.bpm.value,
    }
    const synth = new Tone.MembraneSynth().toMaster();
    const loop = new Tone.Loop(function(time){
      synth.triggerAttackRelease("C2","4n");
    },"4n").start(0);

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
