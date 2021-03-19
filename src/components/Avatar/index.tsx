// ** React Imports
import { CSSProperties, ElementType, forwardRef, ReactNode } from 'react'
import { Badge } from 'reactstrap'
import classnames from 'classnames'
import { getInitials } from '@/utils'

type Props = {
  className?: any
  color?: string
  imgClassName?: any
  initials?: boolean
  size?: string
  badgeUp?: string
  content?: string
  icon?: ReactNode
  badgeColor?: string
  badgeText?: string
  img?: string | false
  imgHeight?: number | string
  imgWidth?: number | string
  status?: string
  tag?: ElementType
  contentStyles?: CSSProperties
}

const Avatar = forwardRef<HTMLElement, Props>(
  (
    {
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
      tag: Tag = 'div',
      contentStyles,
      ...rest
    },
    ref,
  ) => {
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
            {initials && content ? getInitials(content) : content}

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
  },
)

export default Avatar
