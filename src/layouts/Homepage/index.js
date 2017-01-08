import React from 'react'

import LatestPosts from '../../components/LatestPosts'
import Page from '../Page'
import styles from './index.css'
import avatar from '../../assets/avatar.jpg'


export default function Homepage(props) {
  const bio = (
    <div className={styles.bio}>
      <img src={avatar}/>
      <h1>Michael Spencer</h1>
      <h2>Software Developer</h2>
    </div>
  )

  return (
    <Page header={bio} hideTitle { ...props }>
      <LatestPosts />
    </Page>
  )
}
