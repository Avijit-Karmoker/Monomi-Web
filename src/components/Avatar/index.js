// ** React Imports
import { forwardRef } from 'react'

// ** Third Party Components
import Proptypes from 'prop-types'
import { Badge } from 'reactstrap'
import classnames from 'classnames'

const Avatar = forwardRef((props, ref) => {
  // ** Props
  const {
    color,
    className,
    imgClassName,
    initials,
    size,
    badgeUp,
    content,
    icon,
    badgeColor,
    badgeText,
    img,
    imgHeight,
    imgWidth,
    status,
    tag: Tag,
    contentStyles,
    ...rest
  } = props

  // ** Function to extract initials from content
  const getInitials = (str) => {
    const results = []
    const wordArray = str.split(' ')
    wordArray.forEach((e) => {
      results.push(e[0])
    })
    return results.join('')
  }

  return (
    <Tag
      className={classnames('avatar', {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp,
          })}
          style={contentStyles}
        >
          {initials ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge
              color={badgeColor ? badgeColor : 'primary'}
              className='badge-sm badge-up'
              pill
            >
              {badgeText ? badgeText : '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName]: imgClassName,
          })}
          src={img}
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </Tag>
  )
})

export default Avatar

// ** Default Props
Avatar.defaultProps = {
  tag: 'div',
}
