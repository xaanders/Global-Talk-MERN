import React from 'react'
import { Link } from 'react-router-dom'
import UserChart from './UserChart';
import UserInfo from './UserInfo';
import classes from './UserStatistics.module.css'
import todayDate from '../../../utils/date';
import { removeDuplicates } from '../../../utils/arrayMethods';
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function sortingByDate(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    const { date, answers } = arr[i];
    const current = result.find(item => item.date === date);
    if (current) {
      result.map(item => item.date === date ? item.answers += answers : item);
    } else {
      result = [...result, { date, answers }];
    }
  }

  return result;
}

function dateSetter(arr) {
  return arr.map(item => {
    const [day, month, year] = item.date.split('-');
    return `${year} ${monthNames[parseInt(month) - 1]} ${day}`
  })
}
function dayFilter(arr) {
  
  const current = arr.filter(item => item.date === todayDate)
    .map(item => {
      return item.answers.filter(elem => elem.answer === true).reduce((a, b) => a + b.answer, 0)
    });

  return current;
}
function filters(arr) {
  const newArr = arr.map(item => {
    const currentAnswers = item.answers.filter(item => item.answer).length;
    return {
      date: item.date,
      answers: currentAnswers
    }
  })
  return newArr;

}


function UserStatistics({ profile, location }) {

  const currentStats = location[location.length - 1];
  let currentAudioData;
  let currentSprintData;
  let games;
  if (currentStats === 'day') {
    currentAudioData = dayFilter(profile.dayStatistics.AudioCall);
    currentSprintData = dayFilter(profile.dayStatistics.Sprint);
    const currentAudioGames = currentAudioData.map((item, i) => i + 1);
    const currentSprintGames = currentSprintData.map((item, i) => i + 1);

    games = removeDuplicates([...currentAudioGames, ...currentSprintGames]).map(item => `Game ${item}`);
  }
  if (currentStats === 'alltime') {
    const audio = filters(profile.dayStatistics.AudioCall)
    const sprint = filters(profile.dayStatistics.Sprint)

    const audioSorted = sortingByDate(audio);
    const sprintSorted = sortingByDate(sprint);

    const currentAudioGames = dateSetter(audioSorted);
    const currentSprintGames = dateSetter(sprintSorted);

    currentAudioData = audioSorted.map(item => item.answers)
    currentSprintData = sprintSorted.map(item => item.answers)

    games = removeDuplicates([...currentAudioGames, ...currentSprintGames]);
  }
  return (
    <div className={classes['user-statistics']}>
      <div className={`d-flex gap-4 pb-5 justify-content-center align-items-center ${classes.filter}`}>
        <Link
          to="day"
          className={`${classes.title} ${location.includes('day') ? classes.active : ''}`}>For the day</Link>
        <Link
          to="alltime"
          className={`${classes.title} ${location.includes('alltime') ? classes.active : ''}`}>For all the time</Link>
      </div>

      <div className={`${classes.statistics} flex-column flex-xl-row`}>
        <UserInfo loc={currentStats} dictionary={profile.dictionary} dayStats={profile.dayStatistics} />
        <UserChart
          currentAudioData={currentAudioData}
          currentSprintData={currentSprintData} games={games} />
      </div>

    </div>
  )
}

export default UserStatistics