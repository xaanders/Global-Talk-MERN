import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import classes from './ClassbookCards.module.css'

function ClassbookPagItem({level, item}) {
  const params = useParams();
  const currentActive = !params.pageNumber ? 1 : params.pageNumber;
  return (
    <li className={`m-0 ${classes['pag-item']}`}>
      <Link to={`${level}/${item}`} className={`m-0 ${classes.pagLink} ${item === +currentActive ? classes.active : ''}`}>{item}</Link>
    </li>
  )
}

export default ClassbookPagItem