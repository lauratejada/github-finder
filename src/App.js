import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import './styles/index.css';
import User from './pages/User';

function App() {
  return (
   <main>
    <div className='container'>
      <Routes>
        <Route exact path="/github-finder" element={<Search />} />
        <Route exact path="/github-finder/user/:userName" element={<User />} />       
      </Routes>
    </div>
   </main>
  );
}

export default App;
