import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = props => {
  return (
    <>
      <p>
        {props.name} {props.excerices}
      </p>
    </>
  );
};

const Content = props => {
  return (
    <div>
      <Part name={props.parts[0].name} excerices={props.parts[0].exercises} />
      <Part name={props.parts[1].name} excerices={props.parts[1].exercises} />
      <Part name={props.parts[2].name} excerices={props.parts[2].exercises} />
    </div>
  );
};

const Total = props => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return (
    <>
      <p>yhteensä {total} tehtävää</p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
