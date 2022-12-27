import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <div>
            <Route exact path='/' component={Fib} />
            <Route exact path='/otherpage' component={OtherPage} />
          </div>
          <Link to='/'>Fibonacci</Link>
          <Link to='/otherpage'>Other Page</Link>
        </header>
      </div>
    </Router>
  );
}

export default App;
