import React from 'react'
import { useLocation } from 'react-router-dom'
import ClassbookFilter from './components/ClassbookFilter'
import ClassbookMenu from './components/ClassbookMenu'
import Dictionary from './components/Dictionary'
import Textbook from './components/Textbook'
 
function Classbook({cards = []}) {
  const location = useLocation();


  return (
    <React.Fragment>
      <ClassbookMenu />
      <ClassbookFilter />
      {location.pathname.match(/\/textbook/ig) && <Textbook words={cards} />}
      {location.pathname.match(/\/dictionary/ig) && <Dictionary words={cards} />}
    </React.Fragment>
  )
}

export default Classbook