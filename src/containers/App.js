//Classical way of using state with classBased Components
import React, { Component } from 'react';

//Using state with functional Components
// import React, { useState } from 'react';

/**
 * CSS Modules: https://github.com/css-modules/css-modules
 * All styles in a CSS module are scoped locally by default
 *
 * In this case, all classes from App.css are wrapped in an
 * object that you can use.
 *
 * The thing is that webpack, will setup a name for the class
 * used on the CSS Module to a unique CSS className that will
 * be used only when used
 */
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux/Aux';
import withClass from '../hoc/withClass/withClass';

// Classical way of using state with classBased Components
class App extends Component {

  /**
   * First lifecycle hook to be called.
   * Actually (1) is the same as all the constructor definition
   * with the initial state defined.
   */
  constructor(props) {
    super(props);

    console.log('[App.js] constructor')
    // this.state = {
    //   persons: [
    //     {id: 'firstOne', name: 'Max', age: 22 },
    //     {id: 'secondOne', name: 'Andrés', age: 33 },
    //     {id: 'thirdOne', name: 'Stephanie', age: 44 }
    //   ],
    //   showPersons: false
    // }
  }

  //This is our data source. From here we should present info
  //dinamically, the state. This info should be populated from
  //fetch content. More things: this is a modern way to make state
  //to be declared as if it was declared inside the constructor (1).
  state = {
    persons: [
      {id: 'firstOne', name: 'Max', age: 22 },
      {id: 'secondOne', name: 'Andrés', age: 33 },
      {id: 'thirdOne', name: 'Stephanie', age: 44 }
    ],
    changeCounter: 0,
    showPersons: false,
    showCockpit: true
  }

  /**
   * Second lifecycle hook. It's a static method. Here
   * we should return the state;
   */
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  /**
   * Fourth lifecycle hook. Here is the only one where we can
   * cause side effects which could block the JS execution, as
   * an HTTP request, in the previous lifecycle creation hooks
   * should be avoided
   */
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(prevProps, nextProps) {
    console.log('[App.js] componentDidUpdate');
  }

  /**
   * Fifth lifecycle hook. Executed after componentDidMount
   * lifecycle hook. For preparing your state correctly and
   * that's something that you can do in getDerivedStateFromProps
   * or just the constructor. So this lifecycle hook will be removed
   * and actually we receive a warning telling us that only older
   * versions of React, supports it.
   */
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

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

  nameChangedHandlerWithBind = (index, event) => {
    const { value } = event.target;
    const persons = [...this.state.persons];
    persons[index].name = value;
    this.setState({
      persons: persons
    })
  }

  nameChangedHandlerWithArrowFunction = (event, id) => {
    const { value } = event.target;

    const personIndex= this.state.persons.findIndex((person) => {
      return person.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    /**
     * This is not the correct way of updating the state, because
     * it is not guaranteed that the previous state needed for update
     * changeCounter accessed by this.state.changeCounter it's exactly
     * the previous one
     */
    // this.setState({
    //   persons: persons,
    //   changeCounter: this.state.changeCounter + 1
    // })

    /**
     * That's the best practice in case you need the previous state
     * for updating the actual one
     */
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    })

  }

  //Here, if we want to use this keyword can lead us to real problems
  // togglePersonsHandler() {
  // }
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  toggleCockpit = () => {
    const doesShow = this.state.showCockpit;
    this.setState({showCockpit: !doesShow})
  }

  /**
   * Third lifecycle hook
   *
   * Everything inside render method is executed each time
   * React re-render the component
   *
   * What's wrong here?
   * Everything inside becomes re-render each time any state
   * changes even if doesn't affect all the components.
   *
   * For controlling which compoments should update we use
   * the lifecycle Hook shouldComponentUpdate and we check if
   * something changes for class-based components and for
   * functional components React.memo
   */
  render() {

    console.log('[App.js] render')
    /**
     * Better way of conditional rendering content
     */
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <section>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandlerWithArrowFunction} />
        </section>
      );
    }

    let cockpit = null;

    if (this.state.showCockpit) {
      cockpit = (
        <Cockpit
          appTitle={this.props.appTitle}
          personsLength={this.state.persons.length}
          showPersons={this.state.showPersons}
          clicked={this.togglePersonsHandler} />
      );
    }

    return (
      //This is JSX
      <Aux>
        <button onClick={this.toggleCockpit}>Toggle cockpit</button>
        {cockpit}
        {persons}
      </Aux>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

//Classical way of using state with classBased Components
export default withClass(App, classes.App) ;

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
