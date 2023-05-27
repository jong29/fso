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
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </div>
    )
}
  
const Course = ({ courses }) => 
{return (
    <div>
    <h1>Web development curriculum</h1>
    {courses.map(course => 
        <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
        </div>
    )}
    </div>
)}
  
const Total = (props) => {
    return (
      <b>total of {props.parts.reduce((total, part) => {
        return total + part.exercises;
      }, 0)} exercises</b>
    )
}

export default Course;