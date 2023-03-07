const Header = ({course}) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  );
};

const Part = ({name, excercies}) => {
  return (
    <>
      <p>
        {name} {excercies}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) => (
        <Part key={p.id} name={p.name} excercies={p.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return (
    <>
      <p>
        <b>total of {total} excercies</b>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default Course;
