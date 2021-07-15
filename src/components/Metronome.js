import React,{Component} from "react";
import '../styles/metronome.css';
import click1 from '../sound/click1.wav'


class Metronome extends Component {
    constructor(props){
        super(props);
        this.state={
            play:false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };
        this.click1 = new Audio(click1);
    }
    handleBpmChange = (e) => {
        const bpm = e.target.value
        if(this.state.play) {
            clearInterval(this.timer)
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000)

            this.setState({
                count: 0,
                bpm
            })
        } else {
            this.setState({ bpm })
        }
    }
    startStop = () =>{
        if(this.state.play) {
            clearInterval(this.timer);
            this.setState({
                play: false
            });

        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    play: true
                },
                this.playClick
            );
        }

    };
    playClick = ()=>{
        this.click1.play();
    }
    render(){ 
    const{play, bpm} = this.state;

    return (
        <div className='container'>
            <div className='slider'>
            <div>{bpm} BPM</div>
            <input type='range' min='40' max='240' value={bpm} onChange={this.handleBpmChange} />
            </div>
            <button onClick={this.startStop} className='btn'>{play ? 'Stop' : 'Start'}</button>
        </div>
    )


}
}

export default Metronome;