import React from 'react'
import { Route } from 'react-router'
import { PageContainer as PhenomicPageContainer } from 'phenomic'

import { Page, PageError, Homepage, Post } from './layouts'
import AppContainer from './AppContainer'

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={{
      Page,
      PageError,
      Homepage,
      Post,
    }}
  />
)

function waitTrackPage(oldTitle) {
  setTimeout(() => {
    const title = document.title

    if (title !== oldTitle && title !== 'Loading...') {
      _gauges.push(['track'])
    } else {
      waitTrackPage(oldTitle)
    }
  }, 5)
}

function onRouteChange() {
  waitTrackPage(document.title)
}

export default (
  <Route component={ AppContainer } onChange={onRouteChange}>
    <Route path="*" component={ PageContainer } />
  </Route>
)
