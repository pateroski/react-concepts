import React, {PureComponent} from 'react';

import Person from './Person/Person';
/**
 * Here we return directly the JSX code in one line
 * as arrow functions let do it
 */
// const persons = (props) =>  {
//   console.log('[Persons.js] Persons component rendering...');
//   return props.persons.map((person, index) => {
//     return (
//       <Person
//         click={props.clicked.bind(this, index)}
//         name={person.name}
//         years={person.age}
//         key={person.id}
//         changed={(event) => props.changed(event, person.id)} />
//     )
//   })
// }

// export default persons;


class Persons extends PureComponent {

  /**
   * First lifecycle hook to be called when the component updates,
   * which means we're doing a re-render cycle
   *
   * We comment out because we're not modifying the state, so
   * we receive a console warning: Persons uses getDerivedStateFromProps
   * but its initial state is undefined. This is not recommended.
   */
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   //It should be an empty object because we're not using it
  //   return state;
  // }

  /**
   * Second lifecycle hook to be called when component updates
   * Here, we decide if the component should update or not based
   * on certain conditions that involves the nextProps to be consumed
   * or nextState
   *
   * That's the most important lifecycle where you can control if
   * the component updates or not.
   *
   * Here we return true or false
   */
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');

  //   /**
  //    * nextProps.persons and props.persons are arrays. So here we
  //    * are comparing the references to the persons array.
  //    *
  //    * Why it's working? -> becuase when we modify the state, always
  //    * we make a new copy with the new persons array, so the references
  //    * are different :)
  //    *
  //    * Another thing. If we should check for all props involving changes
  //    * inside the Persons compoment, that is:
  //    *
  //    * this.props.persons
  //    * this.props.clicked
  //    * this.props.changed
  //    *
  //    * Instead of adding all this checks it's better to extend Persons
  //    * component from PureComponent, which implements the same functionality
  //    */
  //   return nextProps.persons !== this.props.persons ||
  //   nextProps.clicked !== this.props.clicked || nextProps.changed !== this.props.changed ? true : false;
  //   // return true;
  // }

  /**
   * Third lifecycle hook to be called when component updates
   * Here, you can get an object with previous state of the component
   * before update
   *
   * For example: for restoring the scrolling position before updates
   * the DOM as it was before starts the update cycle
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'snapshot' };
  }

  /**
   * Fifth and last lifecycle hook to be called when component updates.
   * Here is where we can receive the snapshot created during that
   * lifecycle hook and then, for example, updates the scroll position
   *
   * You can cause side effects here, but carefully, because if you
   * change props or state, you will see how affects to
   */
  componentDidUpdate(prevProps, nextProps, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  /**
   * Lifecycle hook added for doing some cleaning up work. Let's say
   * that we've some event listeners that we want to remove each
   * time this compoment is removed from DOM. We'll use that lifecycle
   * for that
   */
  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount')
  }

  /**
   * Fourth lifecycle hook to be called when component updates
   */
  render() {
    console.log('[Persons.js] Persons component rendering...');
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={this.props.clicked.bind(this, index)}
          name={person.name}
          years={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)} />
      )
    })
  }
}

export default Persons;