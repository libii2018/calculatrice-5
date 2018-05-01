import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  state ={
    value: null,
    displayValue:'0',
    waitingForOperand:false,
    operator:null,
  }

  clearDisplay() {
    this.setState({
      displayValue: '0'
    })
  }

  inputDigit( digit ){
    const { displayValue,waitingForOperand } = this.state
  
    if(waitingForOperand){
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      })
    }else{
      this.setState({
        displayValue : displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }

  inputDot(){
    const { displayValue,waitingForOperand } = this.state

    if (waitingForOperand){
      this.setState({
        displayValue: '-',
        waitingForOperand: false,
      })
    }else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false,
      })
    }
  }

  toggleSign(){
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

inputPercent(){
  const { displayValue } = this.state
  const value = parseFloat(displayValue)

  this.setState({
      displayValue:String(value / 100)
  })
}

performOperation(nextOperator) {
  
  const { displayValue, operator, value } = this.state

  const nextValue = parseFloat(displayValue)

  const operations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue,
  }

  if (value == null){
    this.setState({
      value: nextValue
    })
  }else if (operator) {
    const currentValue = value || 0
    const newValue = operations[operator](currentValue, nextValue)

    this.setState({
      value:newValue,
      displayValue: String(newValue)
    })
  }

    //const computedValue = operations[operator](prevValue,nextValue)
 
    this.setState({
    waitingForOperand: true,
    operator:nextOperator,
  })
}


  render() {
    const { displayValue } = this.state


    return (
            <div id="calculatrice">
              <div id="resultat">
                <div id="doingMath"><p></p></div>
                <div id="answers"><p>{displayValue}</p></div>
              </div>
              <div id="mathtable">
                <div  class="rows">
                    <div class="numoperan" onClick={() =>this.clearDisplay()}>C</div>
                    <div class="numoperan" onClick={() => this.toggleSign()}>±</div>
                    <div class="numoperan" onClick={() => this.inputPercent()}>%</div>
                    <div class="numoperan" onClick={() => this.performOperation('/')} >÷</div>
                  </div>
                  <div class="rows">
                    <div class="numoperan" onClick={() => this.inputDigit(7)}>7</div>
                    <div class="numoperan" onClick={() => this.inputDigit(8)}>8</div>
                    <div class="numoperan" onClick={() => this.inputDigit(9)}>9</div>
                    <div class="numoperan" onClick={() => this.performOperation('-')}>-</div>
                  </div>
                  <div class="rows">
                    <div class="numoperan" onClick={() => this.inputDigit(4)}>4</div>
                    <div class="numoperan" onClick={() => this.inputDigit(5)}>5</div>
                    <div class="numoperan" onClick={() => this.inputDigit(6)}>6</div>
                    <div class="numoperan" onClick={() => this.performOperation('+')} >+</div>
                  </div>
                  <div class="rows">
                    <div class="numoperan" onClick={() => this.inputDigit(1)}>1</div>
                    <div class="numoperan" onClick={() => this.inputDigit(2)}>2</div>
                    <div class="numoperan" onClick={() => this.inputDigit(3)}>3</div>
                    <div class="numoperan" onClick={() => this.performOperation('*')} >x</div>
                  </div> 
                  <div class="rows">
                    <div class="numoperan" onClick={() => this.inputDigit(0)}>0</div>
                    <div class="numoperan"> </div>
                    <div class="numoperan" onClick={() => this.inputDot()}>.</div>
                    <div class="numoperan" id="pink" onClick={() => this.performOperation('=')}>=</div>
                  </div>

              </div>
            
            </div>



    );
  }
}

export default App;
