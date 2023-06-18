import './Container.css';

const Container = ({children, classes}) => {
  return (
    <div className={`container ${classes ? classes : ''}`}>
       {children}
    </div>
  )
}

export default Container;