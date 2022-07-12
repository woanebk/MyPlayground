import { SearchOutlined } from '@mui/icons-material'
import React from 'react'
import '../App.css'

function Search({placeHolder, value, onChange}) {
  return (
    <div className='searchbox flex center'>
        <input value={value} onChange={onChange} placeholder={placeHolder} type={'text'}></input>
        <SearchOutlined className='grey white_hover'/>
    </div>
  )
}

export default Search