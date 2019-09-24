import React from 'react';
import './Person.css';

const person = (props) => {
  return (
    //Passing parent functions to children events
    <section className='Person'>
      <p onClick={props.click}>I'm {props.name} and I'm {props.years} years old </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </section>
  );
}

export default person;