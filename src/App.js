import React from 'react';
import './App.css';
import EditableList from './EditableList';
import Loading from './Loading';
import CountdownTimer from './CountdownTimer';
import {getTranslation} from './TranslationAPI';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words1: [],
      words2: ['Eat Vegetables', 'Finish 404', 'Sing along to Linkin Park'],
      yodaSentence: [],
      done2: [],
      loading: false,
      startTimer: false,
      startTimer2: true,
      timer1Length: 30,
      timer2Length: 120,
      blockInput: false,
    };
  }

  handleAppendList1 = (item) => {
    this.setState({
      words1: this.state.words1.concat(item)
    });
  }

  handleAppendList2 = (item) => {
    this.setState({
      words2: this.state.words2.concat(item)
    });
  }

  handleAppendList3 = async (item) => {
    this.setState({
      loading: true,
    });
    let translation = await getTranslation(encodeURI(item));
    this.setState({
      yodaSentence: [translation],
      loading: false,
    });
  }

  handleClickItem1 = (item) => {
    let firstHalf = this.state.words1.slice(0, this.state.words1.indexOf(item));
    let secondHalf = this.state.words1.slice(this.state.words1.indexOf(item) + 1);
    this.setState({
      words1: firstHalf.concat(secondHalf)
    });
  }

  handleClickItem2 = (item) => {
    let firstHalf = this.state.words2.slice(0, this.state.words2.indexOf(item));
    let secondHalf = this.state.words2.slice(this.state.words2.indexOf(item) + 1);
    this.setState({
      done2: this.state.done2.concat(item),
      words2: firstHalf.concat(secondHalf)
    });
  }

  handleKeyDown = () => {
    this.setState({
      startTimer: true
    });
  }

  handleTimerFinish = () => {
    this.setState({
      // startTimer: false,
      blockInput: true
    });
  }

  render () {
    return (
      <div className="mainContainer">
        <h1>Editable List Reusable Component</h1>
        <hr/>
        <div className="row">
          <div className="col">
            <h3>Description</h3>
            <p>
              With custom onSubmitInput and onClick, this appendable list has many uses.
              It can be used for creating to do lists, remembering what the user enters
              as input, and even act as an medium for the user to communicate with APIs.
            </p>
          </div>
          <div className="col">
            <h3>Motivation</h3>
            <p>
              This reusable component has so many uses, since it combines an input text
              box with a dynamic list.  The contents of the list can come directly or
              indirectly from the input, as is shown in the below examples.  The optional
              onClick function provides additional functionality for the user.
            </p>
          </div>
          <div className="col">
            <h3>Nomenclature</h3>
            <p>
              The name listItems represents the list of items (type array) the component displays.
              The items can take any form, as long as they
              are all contained in a list.  The function onSubmitInput has this name since it executes
              when the form containing the input field edited by the user
              is submitted.  Similarly for the function onClick, clicking
              on one of the list items triggers it.
            </p>
          </div>
        </div>

        <h3>Required Parameters:</h3>
        <ul>
          <li>Array listItems (array to be displayed)</li>
          <li>Function onSubmitInput (when submit input value)</li>
          <li>Function onClick (when click on an item)</li>
        </ul>
        <h3>Optional Parameters:</h3>
        <ul>
          <li>Function onClick (when click on an item)</li>
        </ul>
        <hr/>
        <h2>Examples</h2>
        <div className="row">
          <div className="col card">
            <h3>User Populated List</h3>
            <h5>
              User can enter any values they want.
              <br/>As a creative exercise, type as many words as you can think of in thirty seconds
            </h5>
            { this.state.startTimer ?
              <CountdownTimer
                totalTime={this.state.timer1Length}
                start={this.state.startTimer}
                onFinish={this.handleTimerFinish} />
              : `${this.state.timer1Length} Seconds Left`

            }
            <EditableList
              listItems={this.state.words1}
              onSubmitInput={this.handleAppendList1}
              onClick={this.handleClickItem1}
              placeholder={"phenomenal..."}>
              {
                (listItems, inputVal, handleInputChange, handleSubmit, onClick, placeholder) => {
                  return(
                    <div>
                      { this.state.blockInput ? undefined :
                        <form onSubmit={handleSubmit} >
                          <input
                            value={inputVal}
                            onChange={handleInputChange}
                            onKeyDown={this.handleKeyDown}
                            placeholder={placeholder ? placeholder : undefined} />
                        </form>
                      }

                      {listItems.map((item, index) => {
                        return (
                          <div
                            className="item"
                            key={index}
                            onClick={onClick ? onClick.bind(this, item) : undefined}>{item}</div>
                        );
                      })}
                    </div>
                  );
                }
              }
            </EditableList>
          </div>
          <div className="col card">
            <h3>To Do List</h3>
            <h5>Type items to add to list, clicking on items removes from the list and adds to "Completed" section</h5>
            <div id="editable2">
              <EditableList
                listItems={this.state.words2}
                onSubmitInput={this.handleAppendList2}
                onClick={this.handleClickItem2} />
            </div>
            <h3>Items Completed:</h3>
            {this.state.done2.map((term, index) => {
              return (
                <div key={index}>{term}</div>
              );
            })}
          </div>
          <div className="col card" id="editable3">
            <h3>Translations into Yoda</h3>
            <h5>Enter a sentence to translate to Yoda</h5>
            <EditableList
              listItems={this.state.yodaSentence}
              onSubmitInput={this.handleAppendList3} />
            { this.state.loading ? <Loading/> : undefined }
          </div>
        </div>

        <hr/>

        <h1>But wait!  There's more...</h1>
        <h1>Countdown Timer Reusable Component</h1>
        <hr/>
        <h3>Accidentally in the development of List Reusable Component and
          with some guidance from a very handy StackOverFlow post,
          this Countdown Timer also came into existence.
          <br/>Use the countdown timer to create any timer with a callback
          function of your choice and for the duration that you want.
        </h3>
        <h3>Required Parameters:</h3>
        <ul>
          <li>Number totalTime (how long timer should run for)</li>
          <li>Boolean start (set to true to begin timer)</li>
        </ul>
        <h3>Optional Parameters:</h3>
        <ul>
          <li>Function onFinish (executes when timer finishes)</li>
        </ul>
        <hr/>
        <h2>Examples</h2>
        <CountdownTimer
          totalTime={this.state.timer2Length}
          start={this.state.startTimer2}>
          {
            (secondsLeft) => {
              return (
                <div>
                  {this.state.timer2Length - secondsLeft} Seconds Elapsed Since Page Load!
                </div>
              );
            }
          }
        </CountdownTimer>
        <h3>Also see example 1 above</h3>
      </div>
    );
  };
}
