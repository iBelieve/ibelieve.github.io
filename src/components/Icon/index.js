import React, { PropTypes } from 'react'
import cx from 'classnames'
import 'mdi/css/materialdesignicons.css'


const Icon = ({ name, className }) => (
  <i className={cx('mdi', `mdi-${name}`, className)} />
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Icon
