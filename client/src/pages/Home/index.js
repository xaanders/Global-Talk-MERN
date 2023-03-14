import React from 'react'
// import Increase from './components/Increase'
import Intro from './components/Intro'
import Learn from './components/Learn'
import WatchLearn from './components/WatchLearn'
const sections = [
  {
    name: 'increase',
    title: 'Increase your vocabulary',
    text: 'Traditional and new effective approaches to words learning',
    button: 'Textbook',
    img: 'home3.png'
  },
  {
    name: 'watch',
    title: 'Watch your progress every day',
    text: 'Save statistics on your achievements, words learned and mistakes',
    button: 'Statistics',
    reverse: true,
    img: 'home4.jpg'
  },
 
]
function HomePage() {
  return (
    <React.Fragment>
      <Intro />
      <Learn />
      {sections.map(item => {
        return <WatchLearn item={item} key={item.name}/>
      })}
    </React.Fragment>
  )
}

export default HomePage