import React from 'react';

import Person from './Person/Person';
/**
 * Here we return directly the JSX code in one line
 * as arrow functions let do it
 */
const persons = (props) =>  {
  console.log('[Persons.js] Persons component rendering...');
  return props.persons.map((person, index) => {
    return (
      <Person
        click={props.clicked.bind(this, index)}
        name={person.name}
        years={person.age}
        key={person.id}
        changed={(event) => props.changed(event, person.id)} />
    )
  })
}

export default persons;
