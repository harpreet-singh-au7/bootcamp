import Header from './Components/header/Header'
import './App.css';
import PropertyListView from "./Components/PropertyListView/PropertyListView"
import PropertyList from "./Components/PropertyListView/PropertyList/PropertyList"

function App() {
  return (
    <div className="App">
     <Header />
     <PropertyListView />
     <PropertyList />
    </div>
  );
}

export default App;
