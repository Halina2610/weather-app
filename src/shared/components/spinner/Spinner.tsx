import React from "react";
import { clsx } from 'clsx'
import s from './Spinner.module.css'

type Props = {
  className?: string
  size?: 'large' | 'small'
}

export const Spinner = ({ className, size = 'large' }: Props) => {
  const classes = clsx(s.spinner, className, {
    [s.large]: size === 'large',
    [s.small]: size === 'small',
  })

  return <div className={classes}/>
}

