import logo from './logo.svg';
import './App.css';
import Search from '../Search/Search';
//import firebase from 'firebase/app';
//import 'firebase/database'; 
//import { initializeApp } from 'firebase/app';


//import {DB_CONFIG} from '../../Config/Firebase/db_config';

function App() {
  //this.app = firebase.initializeApp(DB_CONFIG);
  //this.database = this.app.database().ref().child('flashcards');
  return (
    
    <div className="App">
      <Search/>
    </div>
  );
}

export default App;
