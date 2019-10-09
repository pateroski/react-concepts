import React from 'react';
//Adding CSS modules
import classes from './Person.css';

//Stateless component
//Input has two way binding. onChange invokes whatever function is added on
//changed props and value is received from parent from name prop
const person = (props) => {
  console.log('[Person.js] Person component rendering...');
  return (
    <section className={classes.Person}>
      <p onClick={props.click}>
        I'm {props.name} and I'm {props.years} years old
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </section>
  );
}

export default person;