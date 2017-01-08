import React, { PropTypes } from 'react'
import cx from 'classnames'

import styles from './index.css'
import Icon from '../Icon'


const Footer = (props, { metadata: { pkg } }) => (
  <footer className={styles.footer}>
    <p className={styles.copyright}>&copy; Copyright 2017 Michael Spencer.</p>

    <p className={styles.contact}>
      <a className={cx(styles.button, styles.github)} href={`https://github.com/${pkg.github}`}
         target="_blank"><Icon name="github-circle"/></a>
      <a className={cx(styles.button, styles.twitter)} href={`https://twitter.com/${pkg.twitter}`}
         target="_blank"><Icon name="twitter"/></a>
      <a className={cx(styles.button, styles.googlePlus)} href={`https://plus.google.com/+${pkg.googlePlus}`}
         target="_blank"><Icon name="google-plus"/></a>
      <a className={cx(styles.button, styles.email)} href={`mailto:${pkg.email}`}
         target="_blank"><Icon name="email"/></a>
    </p>
  </footer>
)

Footer.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Footer
