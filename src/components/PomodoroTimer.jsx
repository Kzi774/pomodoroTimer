import React from 'react';
import Start from '../assets/start.svg'
import Stop from '../assets/stop.svg'
import Reset from '../assets/reset.svg'

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 0,
      isActive: false,
      isWork: true
    };
    this.timer = null;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (this.timer === null) {
      this.timer = setInterval(this.tick, 1000);
    }
    this.setState({ isActive: true });
  }

  pauseTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({ isActive: false });
  }

  resetTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({
      minutes: 25,
      seconds: 0,
      isActive: false,
      isWork: true
    });
  }

  tick = () => {
    const { minutes, seconds, isWork } = this.state;
    if (minutes === 0 && seconds === 0) {
      this.pauseTimer();
      this.setState(prevState => ({
        isWork: !prevState.isWork,
        minutes: !prevState.isWork ? 25 : 5,
        seconds: 0
      }));
    } else if (seconds === 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59
      }));
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1
      }));
    }
  }

  render() {
    const { minutes, seconds, isActive, isWork } = this.state;
    const { size = 490 } = this.props; // デフォルトサイズを200pxに設定
    const totalSeconds = isWork ? 25 * 60 : 5 * 60;
    const currentSeconds = minutes * 60 + seconds;
    const progress = 1 - (currentSeconds / totalSeconds);
    const color = isWork ? '#BBCD9B' : '#4682b4';
    const strokeWidth = size * 0.02; // サイズに応じて線の太さを調整
    const radius = (size / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;

    const styles = {
            svg: {
                transform: 'rotate(-90deg)',
            },
          circle: {
            fill: 'none',
            stroke: '#e0e0e0',
            strokeWidth: `${strokeWidth}px`,
          },
          progress: {
            fill: 'none',
            stroke: color,
            strokeWidth: `${strokeWidth}px`,
            strokeLinecap: 'round',
            strokeDasharray: circumference,
            strokeDashoffset: circumference * (1 - progress),
            transition: 'stroke-dashoffset 0.5s ease',
          },
    
    }

    return (
        <>
        <h1>ポモドーロタイマー</h1>
      <div className='contentWrapper'>
        <div className='circleContainer'>
          <svg width={size} height={size} style={styles.svg}>
            <circle cx={size / 2} cy={size / 2} r={radius}  style={styles.circle} />
            <circle cx={size / 2} cy={size / 2} r={radius} style={styles.progress} />
          </svg>
          <div className='time'>
            <div className='isWork'>{isWork ? '作業中' : '休憩中'}</div>
            <div>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
          </div>
        </div>
        <div className='buttonContainer'>
          <button onClick={isActive ? this.pauseTimer : this.startTimer}>
            {isActive ? <img src={Stop} /> : <img src={Start} />}
          </button>
          <button onClick={this.resetTimer}><img src={Reset} /></button>
        </div>
      </div>
      </>
    );
  }
}

export default PomodoroTimer;