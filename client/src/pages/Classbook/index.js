import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ClassbookFilter from './components/ClassbookFilter'
import ClassbookMenu from './components/ClassbookMenu'
import Dictionary from './components/Dictionary'
import Textbook from './components/Textbook'

function Classbook() {
  const location = useLocation();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/router/words/')
      .then(response => {
        setCards(response.data);
        console.log(response);
      })
      .catch(err => console.log(err));
  }, [setCards]);

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