import { SearchOutlined } from '@mui/icons-material'
import React from 'react'
import '../App.css'

function Search() {
  return (
    <div className='searchbox flex center'>
        <input type={'text'}></input>
        <SearchOutlined className='grey white_hover'/>
    </div>
  )
}

export default Search