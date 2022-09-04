import React from 'react'
import Style from './style.module.scss'
const Button = ({ title, click, btnValue, btnName, }) => {

  return (
    <button
      className={Style.Btn}
      onClick={click}
      value={btnValue}
      name={btnName}
    >
      {title}
    </button>
  )
}

export default Button