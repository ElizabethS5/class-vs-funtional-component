import React from "react"; // ALWAYS import React in both functional and class components.
// import other node modules, files, components.
// DO NOT import things that are not used -> warning
// Relative paths should start with "./" if the file you are importing is in the same directory or in a subdirectory of the directory this file is located in
import "./ClassComponentExample.css"; // how you would import a stylesheet in same directory
// otherwise relative paths should start with "../"
import FunctionalComponentExample from "../functionalComponentExamplet/FunctionalComponentExample";

// All components be written as a class components
// Must use a class component if it needs to keep track of state
// Good idea to track state in components that render other components, passing down the relevant data to their children components through props.  (lifting state)
class ClassComponentExample extends React.Component {
  // Only methods can be inside of this code block.

  // The constructor method----------------------------------------------------------------------------

  // Runs only once.  This happens prior to the first time the instance is rendered.
  constructor(props) {
    // CANNOT use this.setState() anywhere in the constructor method

    // Passes props in as an argument to the React.Component constructor call.
    super(props);

    // Instance properties can be initialized here if they do not need updating, or update will not rerender page.
    this.keyA = "value A"; // can access value using `this.keyA``

    // Properties that will be updated with `this.setState()` go inside of the `this.state` object.
    this.state = {
      keyB: "value B", // can access value using `this.state.keyB`

      // In the constructor method, access props through parameter `props.` instead of `this.props.`
      keyC: props.valueC, // later access value using `this.state.keyC`

      keyD: this.keyA,
      condition: true,
      counter: 1,
    };
  }

  // --------------------------------------------------------------------------------------------------

  // Other methods ------------------------------------------------------------------------------------

  // Within the code blocks of the methods...

  // Access data passed down from props with `this.props.`
  // Access data stored in state with `this.state.`

  // NEVER update `this.state.` directly by reassigning it.
  // ALWAYS use `this.setState()` -> triggers a call of render method.

  // A callback function should be the argument if new value depends on previous state
  /* 
    this.setState((currentState, props) => {
       let keyC = currentState.keyC + 1
       return { keyC }
     }) 
  */
  // An object should be the argument the new value does not depend on previous state
  /*
    this.setState({keyB: 'new value'})
  */

  // Methods like componetDidMount and componentWillUnmount will run at specific times
  // Runs right after a component is rendered
  componentDidMount() {
    // Normal JavaScript code can appear here.  Can have conditionals, loops, declare variables, etc.
    // can use this.setState() here
    this.interval = setInterval(() => this.increaseCount(), 1000);
  }

  // Runs right before before component is no longer rendered
  componentWillUnmount() {
    // Normal JavaScript code can appear here.  Can have conditionals, loops, declare variables, etc.
    // good place to do clearInterval so resources are not wasted
    clearInterval(this.interval);
  }

  // write other methods for whatever you need
  handleToggleCondition = (event) => {
    // Normal JavaScript code can appear here.  Can have conditionals, loops, declare variables, etc.
    // can use this.setState() here
    this.setState((currentState, props) => {
      let condition = !currentState.condition;
      return { condition };
    });
  };

  increaseCount = () => {
    this.setState((currentState) => ({ counter: currentState.counter + 1 }));
  };

  //---------------------------------------------------------------------------------------------------

  // The render method --------------------------------------------------------------------------------

  // At bare minimum, a class component needs a render method that returns JSX
  render() {
    // Normal JavaScript code can appear here.  Can have conditionals, loops, declare variables, etc.
    // NEVER use this.setState inside of the render method. Using this.setState triggers render to run again leading to an infinate loop.

    return (
      <div className="ClassComponentExample">
        {/* This is what a comment look like in JSX section */}
        <fieldset>
          <legend>Class Component</legend>
          <p>{this.keyA}</p>{" "}
          {/* access component's instance property value constructor not in this.state */}
          <p>{this.state.keyB}</p> {/* access a value in this.state object */}
          <p>
            "{this.state.keyC}" stored in this.state should be the same as "
            {this.props.valueC}" passed down from this.props
          </p>{" "}
          {/* Note that you can store something passed down from props as the value of a this.state property or other property in the constructor, but you can also still access props outside of the constructor using `this.props.propName` outside of the constructor*/}
          <p>this.state.counter: {this.state.counter}</p>
          <button onClick={this.handleToggleCondition}>Toggle condition</button>
          <p>this.state.condition: {this.state.condition.toString()}</p>
          {/* How to do conditional rendering, within a set of curly brackets a value or expression that will evaluate to something truthy or falsy  followed by `&&` and the then some JSX you would like to render.  It the condtion is truthy the JSX will be rendered, if it is falsey the JSX will not be rendered */}
          {this.state.condition && (
            <div>
              <fieldset>
                <legend>Conditionally rendered div</legend>
                This div is being conditionally rendered because
                this.state.condition is true
              </fieldset>
            </div>
          )}
          <FunctionalComponentExample
            description="This component's condition prop is this.state.condition"
            condition={this.state.condition}
          />
          <FunctionalComponentExample
            description="This component's condition prop is hard coded to always be true"
            condition={true}
          />
          <FunctionalComponentExample
            description="This component's condition prop is hard coded to always be false"
            condition={false}
          />
        </fieldset>
      </div>
    );
  }
}

export default ClassComponentExample;
