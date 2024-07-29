import './Home.css'; 
import Notes from '../Notes/Notes';

const Home = (props) => {
  const {showAlert} = props;
  return (
   <div>
     <Notes showAlert={showAlert}/>
   </div>
  );
};

export default Home;
