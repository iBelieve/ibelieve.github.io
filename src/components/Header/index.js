import React, { PropTypes } from 'react'
import { Link } from 'phenomic'
import Svg from 'react-svg-inline'
import cx from 'classnames'

import twitterSvg from '../icons/iconmonstr-twitter-1.svg'
import gitHubSvg from '../icons/iconmonstr-github-1.svg'

import styles from './index.css'

const Header = (props, { metadata: { pkg } }) => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <Link className={styles.link} activeClassName={styles.linkActive} to="/about">About</Link>
      </div>
      <div>
        <Link className={cx(styles.link, styles.title)} activeClassName={styles.linkActive}
              to="/">{'<iBelieve/>'}</Link>
      </div>
      <div className={styles.navRight}>
        {
          pkg.twitter &&
          <a className={styles.link} href={`https://twitter.com/${pkg.twitter}`} target="_blank">
            <Svg svg={twitterSvg} cleanup />
            Twitter
          </a>
        }
        {
          pkg.github &&
          <a className={styles.link} href={`https://github.com/${pkg.github}`} target="_blank">
            <Svg svg={gitHubSvg} cleanup />
            GitHub
          </a>
        }
      </div>
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header
