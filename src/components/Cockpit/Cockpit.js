import React from 'react';

import classes from './Cockpit.css'

const cockpit = (props) => {
  const paragraphClassList = [];
  let btnClass = null;

  if(props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.persons.length <= 2) {
    //Using classes object
    paragraphClassList.push(classes.red); //classList = ['red']
  }

  if (props.persons.length <= 1) {
    paragraphClassList.push(classes.bold) //classList = ['red', 'bold']
  }

  return (

    <section className={classes.Cockpit}>
      <h1>{props.appTitle}</h1>
      <p className={paragraphClassList.join(' ')}>This is just testing how React Works!</p>
      <button
        className={btnClass}
        onClick={props.clicked}>
        Toggle persons
        </button>
    </section>
  );
}

export default cockpit;