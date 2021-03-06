import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
//Adding CSS modules
import classes from './Person.css';

import Aux from '../../../hoc/Aux/Aux';
import withClass from '../../../hoc/WithClass/WithClass';

//Stateless component
//Input has two way binding. onChange invokes whatever function is added on
//changed props and value is received from parent from name prop
// const person = (props) => {
//   console.log('[Person.js] Person component rendering...');
//   return (
//     <section className={classes.Person}>
//       <p onClick={props.click}>
//         I'm {props.name} and I'm {props.years} years old
//       </p>
//       <p>{props.children}</p>
//       <input type="text" onChange={props.changed} value={props.name}/>
//     </section>
//   );
// }

// export default person;

class Person extends Component {

  /**
   * React new way of using refs for selecting certain elements
   * inside the DOM.
   */
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  componentDidMount() {
    /**
     * React old version of using refs
     * It will focus the last input in the last person component
     */
    // this.inputElement.focus();

    /**
     * React new way of using refs for selecting certain elements
     * inside the DOM.
     */
    this.inputElementRef.current.focus();
  }
  render(){
    console.log('[Person.js] Person component rendering...');
    return (
      <Aux>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I'm {this.props.years} years old
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          /**
           * Old React versions style of using refs. Actually it could
           * be even an ID, and use the document.querySelector, but that's
           * not the React style.
           */
          // ref={(inputElem) => this.inputElement = inputElem}
          ref={this.inputElementRef}
          onChange={this.props.changed}
          value={this.props.name}/>
      </Aux>

      /**
       * You can use Fragment the same way you use Aux for grouping adjacent JSX
       * elements, because you can only return one expression (one element so to say).
       */
      // <Fragment>
      //   <p onClick={this.props.click}>
      //     I'm {this.props.name} and I'm {this.props.years} years old
      //   </p>
      //   <p>{this.props.children}</p>
      //   <input type="text" onChange={this.props.changed} value={this.props.name}/>
      // </Fragment>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  changed: PropTypes.func,
  name: PropTypes.string,
  years: PropTypes.number
}

export default withClass(Person, classes.Person);