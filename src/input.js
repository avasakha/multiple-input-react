import React, { Component } from 'react';
import Item from './item';
import './App.css';
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExit: false,
      isHold: false,
      isSave: true,
      itemHold: true,
      users: [],

    }
    this.textInput = React.createRef();
    this.valInput = React.createRef();


  }

  changHandler = () => (event) => {
    const { users } = this.state
    const { target: { value } } = event
    console.log(value)

    setTimeout(() => {
      this.setState({
        users: [...users, value],
        isExit: true,
        isSave: false,
        itemHold: false,
      })
    }, 3000)

  }
  componentWillReceiveProps(nextProps) {

     setTimeout(() => {
      this.setState({
        users: [...nextProps.user],
        isHoldInput: !nextProps.isHoldInput,
      });
    }, 1000)


  }

  deleteInput = () => {

    const { users } = this.state
  const index=users.indexOf(this.valInput.current.value)
 users.splice(index,1)
    this.textInput.current.innerHTML = ""
    this.setState({
      users,
    })


  }


  saveInput = () => {

    this.setState({
      isHold: true,
      itemHold: true
    })

  }

  cancleInput = () => {
    this.setState({
      users: [],

    })
  }


  render() {
    const { isExit, users, isHold, isSave, itemHold } = this.state
    console.log(users)
    return <>
      <div ref={this.textInput} >
        <input ref={this.valInput} className="app" onChange={this.changHandler()}></input>
        <button onClick={this.deleteInput}>X</button>
      </div>

      {isExit  ? <div><Item users={users} itemHold={itemHold}  /></div> : ""}

      {isSave ? <div>
        <button onClick={this.saveInput}>Save</button>
        <button onClick={this.cancleInput}> Cancle</button>
      </div> : ""}

      <div >
        {isHold && itemHold ? <ul >{users.map(item => <li>{item}</li>)}</ul> : ""}
      </div>




    </>
  }
}