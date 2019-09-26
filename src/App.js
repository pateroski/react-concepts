//Classical way of using state with classBased Components
import React, { Component } from 'react';

//Using state with functional Components
// import React, { useState } from 'react';

//Importing css modules as css
import './App.css';
import Person from './Person/Person'

// Classical way of using state with classBased Components
class App extends Component {

  //This is our data source. From here we should present info
  //dinamically, the state. This info should be populated from
  //fetch content
  state = {
    persons: [
      {id: 'firstOne', name: 'Max', age: 22 },
      {id: 'secondOne', name: 'Andrés', age: 33 },
      {id: 'thirdOne', name: 'Stephanie', age: 44 }
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    /**
     * State should never be modified and Objects and arrays are
     * referenced types, so that's not the way
     * const persons = this.state.persons;
     */
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  nameChangedHandler = (event) => {
    const { value } = event.target;
    this.setState({
      persons: [
        { name: 'Programmer1', age: 66 },
        { name: value, age: 33 },
        { name: 'Programmer3', age: 17 }
      ]
    })
  }

  //Here, if we want to use this keyword can lead us to real problems
  // togglePersonsHandler() {
  // }
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  /**
   * Everything inside render method is executed each time
   * React re-render the component
   */
  render() {
    //This is not JSX, just JS code
    //One way of styling button with inline styles
    const buttonStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    /**
     * Better way of conditional rendering content
     */
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <section>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={this.deletePersonHandler.bind(this, index)}
                name={person.name}
                years={person.age}
                /**
                 * This key property is created by React for every component
                 * in order to control which element should be updated in the
                 * virtualDom.
                 * Important!: never use index from map, anti-pattern, it could
                 * change
                 */
                key={person.id}/>
            )
          })}
        </section>
      );
    }

    return (
      //This is JSX
      <article className="App">
        <h1>Hi, i'm a React Developer</h1>
        <p>This is just testing how React Works!</p>
        <button
          //added style to button
          style={buttonStyle}
          onClick={this.togglePersonsHandler }>
            Toggle persons
        </button>
        {persons}
      </article>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

//Classical way of using state with classBased Components
export default App;

// const app = props => {

//   //The actual state and the function used to update the state
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: 'Max', age: 22 },
//       { name: 'Andrés', age: 33 },
//       { name: 'Stephanie', age: 44 }
//     ],
//     otherState: 'Ill be inmmutable even if persons changes and im not'
//   });

//   const [otherState, setOtherState] = useState({
//     otherState: 'Ill be inmmutable even if persons changes and im not'
//   });

//   console.log(personsState, otherState);

//   //You can define another methods inside a functional component
//   const switchNameHandler = () => {
//     //This function will replace the entire state, not merging them
//     //with the actual one, different from a class based component

//     /**
//      * This function will replace the entire state, not merging them
//      * with the actual one, different from a class based component
//      *
//      * Solution: have different instances of useSate, each one with
//      * the state needed
//      */
//     setPersonsState({
//       persons: [
//         { name: 'Programmer1', age: 66 },
//         { name: 'Programmer2', age: 33 },
//         { name: 'Programmer3', age: 17 }
//       ]
//     })

//     setOtherState({
//       otherState: 'Ive been changed'
//     })

//     console.log(personsState, otherState);
//   }

//   return (
//     <article className="App">
//       <h1>Hi, i'm a React Developer</h1>
//       <p>This is just testing how React Works!</p>
//       <button onClick={switchNameHandler}>Switch name!</button>
//       <Person
//         name={personsState.persons[0].name}
//         years={personsState.persons[0].age} />
//       <Person
//         name={personsState.persons[1].name}
//         years={personsState.persons[1].age}>
//         My hobbies are: listening to music
//       </Person>
//       <Person
//         name={personsState.persons[2].name}
//         years={personsState.persons[2].age} />
//     </article>
//   );

//     // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
// };

//Using state with functional Components
// export default app;
