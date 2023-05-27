const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const sumUp = (total, part) => {
    return total + part.exercises;
  }
  
  console.log(props.parts.reduce(sumUp, 0));

  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Course = ({ name, parts }) => (
  <div>
    <Header course={name} />
    <Content parts={parts}/>
    <Total parts={parts} />
  </div>
)

const Total = (props) => {
  return (
    <b>total of {props.parts.reduce((total, part) => {
      return total + part.exercises;
    }, 0)} exercises</b>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course className='dark-mode' name={course.name} parts={course.parts} /> 
  )
}

export default App;
