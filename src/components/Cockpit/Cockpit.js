import React, {useEffect, useRef} from 'react';

import classes from './Cockpit.css'

const cockpit = (props) => {

  const toggleBtnRef = useRef(null);
  /**
   * This is how you manage main lifecycle hooks with
   * functional components.
   *
   * Actually the most important lifecycle hooks which
   * are componentDidMount and componentDidUpdate (the
   * final ones for each phase, creation and update),
   * can be combined in only one effect.
   *
   * 1) useEffect is called every time a render cycle is
   * done in the compoment. Check it out.
   */
  // useEffect(() => {
  //   console.log('[Cockpit.js] useEffect');
  // })

  /**
   * 2) What happens if always runs on every rendery cycle?
   * How we control when useEffect should be called?
   */
  // useEffect(() => {
  //   console.log('[Cockpit.js] useEffect');
  //   setTimeout(() => {
  //     alert('data saved to cloud!')
  //   }, 1000);
  // })

  /**
   * For that, you can specify when useEffect should change
   * as a second parameter (first one is the function). Everything
   * which makes useEffect being called can be passed as an argument
   * Toggle the Toggle persons button and check what happens after the
   * first cycle render
   */
  // useEffect(() => {
  //   console.log('[Cockpit.js] useEffect');
  //   setTimeout(() => {
  //     alert('data saved to cloud!')
  //   }, 1000);
  // }, [props.persons])

  /**
   * 3) What if we only want to run the useEffect hook the first
   * render cycle?
   *
   * Well, in that case, yo should not pass any dependency which
   * makes calls useEffect each time the render cycle is called
   *
   * Important!: btw, you can have as many useEffect as you want.
   */
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    /**
     * We're doing it here, because the ref is executed in the render method,
     * so assigned to the button element we're interested in. After that,
     * we're ready to click it.
     */
    toggleBtnRef.current.click();
    //This will be executed each time the component ins unmounted
    return () => {
      console.log('[Cockpit.js] cleanup work with useEffect');
    }
  }, []);

  /**
   * This second useEffect doesn't have a second parameter specifying
   * when should run, so it will run everytime.
   *
   * The thing here is that the cleanup function will run everytime
   * before the second useEffect in case we want to cancel some action
   * before re-render, or after it updated it
   */
  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');

    return () => {
      console.log('[Cockpit.js] cleanup work with 2nd useEffect');
    }
  })


  const paragraphClassList = [];
  let btnClass = null;

  if(props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    //Using classes object
    paragraphClassList.push(classes.red); //classList = ['red']
  }

  if (props.personsLength <= 1) {
    paragraphClassList.push(classes.bold) //classList = ['red', 'bold']
  }

  return (

    <section className={classes.Cockpit}>
      <h1>{props.appTitle}</h1>
      <p className={paragraphClassList.join(' ')}>This is just testing how React Works!</p>
      <button
        className={btnClass}
        ref={toggleBtnRef}
        onClick={props.clicked}>
        Toggle persons
        </button>
    </section>
  );
}

export default React.memo(cockpit);