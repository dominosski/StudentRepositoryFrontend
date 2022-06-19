import './App.css';
import Appbar from './components/Appbar';

import Student from './components/student';


function App() {
  return (
    <div className="App">
      <main>
        <Appbar />
        <Student />
      </main>
    </div>
  );
}

export default App;
