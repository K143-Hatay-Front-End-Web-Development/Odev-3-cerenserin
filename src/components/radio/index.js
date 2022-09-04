import React from 'react'

import Style from './style.module.scss'

const Radio = ({radioName, radioId, title, radioChecked}) => {
    return (
        <div  className={Style.Process}>
            <input type="radio" name={radioName} onClick={radioChecked}  value={radioId} id={radioId} />
            <label htmlFor={radioId}>{title}</label>
        </div>
    )
}

export default Radio