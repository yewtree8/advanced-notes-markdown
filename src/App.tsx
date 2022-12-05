import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";

const AdvancedNotes = () => {
    
  return (
    <Routes>
      <Route path="/" element = { <h1> Hi </h1> }/>
      <Route path ="/new" element = { <h2> Second route </h2>} />
    </Routes>
  )
  
}

export default AdvancedNotes;
