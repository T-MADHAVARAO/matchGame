import {Component} from 'react'
import TabItem from '../TabItems'
import ThumbnailItem from '../ThumbnailItems'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesList: props.imagesList,
      activeCategory: 'FRUIT',
      time: 60,
      timerId: null,
      randomImgId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      score: 0,
      isFinish: false,
      randomImgUrl:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    }
  }

  onChangeTab = category => {
    this.setState({activeCategory: category})
  }

  onSelect = id => {
    const {randomImgId, imagesList, timerId} = this.state
    const listLength = imagesList.length

    const randomImg = imagesList[Math.floor(Math.random() * listLength)]

    if (id === randomImgId) {
      this.setState(old => ({
        score: old.score + 1,
        randomImgUrl: randomImg.imageUrl,
        randomImgId: randomImg.id,
      }))
    } else {
      clearInterval(timerId)
      this.setState(old => ({isFinish: !old.isFinish}))
    }
  }

  runTimer = () => {
    this.setState(old => ({time: old.time - 1}))
  }

  componentDidMount = () => {
    const timerid = setInterval(this.runTimer, 1000)
    this.setState({timerId: timerid})
    console.log('hello')
  }

  playAgain = () => {
    this.setState({
      time: 60,
      timerId: null,
      score: 0,
      isFinish: false,
    })
    const timerid = setInterval(this.runTimer, 1000)
    this.setState({timerId: timerid})
  }

  stopTime = () => {
    const {timerId} = this.state
    clearInterval(timerId)
  }

  render() {
    const {activeCategory, randomImgUrl, time, score, isFinish} = this.state
    const {tabsList, imagesList} = this.props
    const updatedThumbnailList = imagesList.filter(
      each => each.category === activeCategory,
    )

    return (
      <div>
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="appLogo"
          />

          <ul className="headerCont">
            <li className="score">
              <p>Score: </p>
              <p>{score}</p>
            </li>
            <li className="timer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timerIcon"
              />
              <p>{time} sec</p>
            </li>
          </ul>
        </div>

        <div className="gameSec">
          {time === 0 && this.stopTime()}
          {isFinish || time === 0 ? (
            <div className="againSec">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="prize"
              />
              <p>YOUR SCORE</p>
              <p>{score}</p>
              <button
                onClick={this.playAgain}
                className="againBtn"
                type="button"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                />
                <p>PLAY AGAIN</p>
              </button>
            </div>
          ) : (
            <div className="gameSec">
              <img src={randomImgUrl} alt="match" className="randomImg" />
              <ul className="tabsCont">
                {tabsList.map(each => (
                  <TabItem
                    eachTab={each}
                    key={each.tabId}
                    onChangeTab={this.onChangeTab}
                  />
                ))}
              </ul>
              <ul className="thumbnail">
                {updatedThumbnailList.map(each => (
                  <ThumbnailItem
                    eachThumbnail={each}
                    key={each.id}
                    onSelect={this.onSelect}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
