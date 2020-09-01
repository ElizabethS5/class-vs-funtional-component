import React from "react"; // ALWAYS need this import in both functional and class components.
// import node modules, files, components this component needs here
import "./FunctionalComponentExample.css"; // how you would import a stylesheet in same directory
// relative paths should start with "./" if the file you are importing is in the same directory or in a subdirectory of the directory this file is located in
// otherwise relative paths should start with "../"

// Only use if component does not have to maintain its own state
function FunctionalComponentExample(props) {
  // NO constructor, render, or any other methods in a functional component!
  // Normal JavaScript can go here like conditional, loops, declaring varibles
  // props are accessed with `props.propsName` NEVER `this.props.propsName`
  let className = "nottrueCondition";
  if (props.condition) {
    className = "trueCondition";
  }

  return (
    <div className="FunctionalClassComponent">
      <fieldset>
        <legend>FunctionalComponentExample</legend>
        <div className={className}>{props.description}.</div>
      </fieldset>
    </div>
  );
}

export default FunctionalComponentExample;
