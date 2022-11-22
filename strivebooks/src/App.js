import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import Welcome from './components/Welcome';
import LatestRelease from './components/LatestRelease';

function App() {
  return (
    <div className="App">
          <MyNav/>
      <header className="App-header">
        <Welcome/>
        <LatestRelease/>
      </header>
      <MyFooter/>
    </div>
  );
}

export default App;
