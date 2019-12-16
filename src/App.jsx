import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.scss'

class App extends Component {

  render () {
    return (
      <div className="app">
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
