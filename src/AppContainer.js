import React, { PropTypes } from 'react'

import './styles/index.global.css'
import './styles/highlight.global.css'
import './styles/pacifico.global.css'
import './styles/hack.global.css'

import { Container, Content, Header, Footer } from './components'
import DefaultHeadMeta from './components/DefaultHeadMeta'


const AppContainer = ({ children }) => (
  <Container>
    <DefaultHeadMeta />
    <Header />
    <Content>
      {children}
    </Content>
    <Footer />
  </Container>
)

AppContainer.propTypes = {
  children: PropTypes.node
}

export default AppContainer
