import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { defaultParser } from './helpers/parser'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      code: "",
      buildState: null,
      output: null,
      error: null
    }

    this.parserCode = this.parserCode.bind(this)
    this.print = this.print.bind(this)
    window._app = this
  }

  print(output) {
    this.setState({ output })
  }

  parserCode(e) {
    try {
      this.setState({
        code: e.target.value,
        buildState: defaultParser.parse(e.target.value),
        error: null
      })
    } catch(ex) {
      this.setState({ error: ex.message })
    }
  }

  render () {
    const { buildState, output } = this.state
    return (
      <div className="app">
        <input onChange={this.parserCode} />
        <span style={{height: "30px"}}>{ buildState && buildState.toString() }</span>
        <span style={{height: "30px"}}>{ output && output.toString() }</span>
        <span style={{color: "red", height: "30px"}}>{ this.state.error }</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  route: state.route
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (App)
