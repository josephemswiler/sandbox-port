import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import ContainerLeft from '../components/containers/ContainerLeft'
import ContainerRight from '../components/containers/ContainerRight'
import MobileCard from '../components/elements/MobileCard'
import AbsoluteSide from '../components/containers/AbsoluteSide'
import Pattern from '../assets/images/background-found.svg'
import Leaf from '../assets/images/tropical-leaf-detail.svg'
import webVR from '../three/index'
import '../index.css'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
        currentWindowHeight: window.innerHeight,
        project: null,
        leafHeight: 500
    }
  }

  componentDidMount () {
    webVR(this.webVR)
    window.addEventListener('resize', this.windowResize)
    // this.setState({
    //   currentWindowHeight: window.innerHeight
    // })
  }

  windowResize = () => {
    this.setState({
      currentWindowHeight: window.innerHeight
    })
  }

  updateBackground = currentProject => {
    this.setState({
      project: currentProject
    })
  }

  style = () => ({
    wrapper: {
      height: this.state.currentWindowHeight
        ? this.state.currentWindowHeight
        : '100%',
      maxWidth: 1220,
      margin: 0
    },
    canvas: {
      width: '100vw',
      height: '100vh',
      display: 'block',
      visibility: this.state.project === 'Spacebnb' ? 'visible' : 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -9999,
      // animationName: 'stretch',
      // animationDuration: '1.5s',
      // animationTimingFunction: 'ease-out',
      // animationDelay: '0s',
      // animationDirection: 'alternate',
      // animationIterationCount: 'infinite',
      // animationFillMode: 'none',
      // animationPlayState: 'running',
    },
    leaf: {
      display: this.state.project === 'Jello' ? 'block' : 'none',
      position: 'absolute',
      height: this.state.leafHeight,
      zIndex: 11,
      right: 240,
      top: -240,
      transform: 'rotate(-120deg)'
    },
    containerLeftRight: {
      height: this.state.currentWindowHeight
        ? this.state.currentWindowHeight - 97
        : '100%',
      margin: 0,
      padding: 0,
      paddingTop: 97
    },
    containerRightWrapper: {
      backgroundImage: this.state.project === 'Found'
        ? `url(${Pattern})`
        : 'none',
      height: this.state.currentWindowHeight
        ? this.state.currentWindowHeight
        : '100%',
      margin: 0,
      padding: 0
    }
  })

  render () {
    return (
      <Container style={this.style().wrapper} fluid>
        <div
          style={this.style().canvas}
          ref={element => {
            this.webVR = element
          }}
        />
        <Row>
          <Col xs='12' sm='12' md='5' lg='4' style={this.style().containerLeftRight}>
            <ContainerLeft project={this.state.project}/>
          </Col>
          <Col
            xs='12'
            sm='12'
            md='7'
            lg='8'
            className='d-none d-md-block'
            style={this.style().containerRightWrapper}
          >
          <img className='leaf' style={this.style().leaf} src={Leaf} alt='a tropical leaf' />
            <Container style={this.style().containerLeftRight}>
              <ContainerRight updateBackground={this.updateBackground}/>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}
