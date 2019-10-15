import React, {Component, Fragment} from 'react';
//Adding CSS modules
import classes from './Person.css';

import Aux from '../../../hoc/Aux/Aux';
import withClass from '../../../hoc/withClass/withClass';

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
  render(){
    console.log('[Person.js] Person component rendering...');
    return (
      <Aux>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I'm {this.props.years} years old
        </p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name}/>
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

export default withClass(Person, classes.Person);