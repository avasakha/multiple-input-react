import React, { Component } from 'react';
import './App.css';
import Input from './input'
export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExitInput: false,
            isHoldInput: false,
            isSaveInput: true,
            inputHold: true,
            user: [],

        }
        this.textInput = React.createRef();
        this.valInput = React.createRef();
    }





    changHandler = () => (event) => {
        const { user } = this.state
        const { target: { value } } = event
         setTimeout(() => {
            this.setState({
                isExitInput: true,
                user: [...user, value],
                isSaveInput: false,
                inputHold: false
            })

        }, 3000)
    }
    componentWillReceiveProps(nextProps) {


        setTimeout(() => {
            this.setState({
                user: [...nextProps.users],
                inputHold: nextProps.itemHold,



            })
        }, 1000)

    }
    deleteInput = () =>(value)=> {
        const { user } = this.state
        const index = user.indexOf(value)
        console.log(index)
        user.splice(index, 1)
        console.log(this.valInput)
        this.textInput.current.innerHTML = ""
        this.setState({
            user,
        })

    }


    saveInput = () => {

        this.setState({
            isHoldInput: true,
            inputHold: true
        })
    }

    cancleInput = () => {
        this.setState({
            user: []
        })
    }

    render() {
        const { isExitInput, user, isHoldInput, isSaveInput,inputHold } = this.state
        console.log(user)



        return <>
            <div ref={this.textInput} idy="app-init">
                <div>
                    <input ref={this.valInput} onChange={this.changHandler()}></input>
                    <button onClick={this.deleteInput(this.valInput.current.value)}>X</button>
                </div>
            </div>

            {isExitInput ? <Input user={user} inputHold={inputHold}  /> : ""}

            {isSaveInput ? <div>
                <button onClick={this.saveInput}>save</button>
                <button onClick={this.cancleInput}>Cancle</button>
            </div> : ""}

            <div> {isHoldInput && inputHold ? <ul>{user.map(item => <li key={item}>{item}</li>)}</ul> : ""}</div>
        </>
    }
}