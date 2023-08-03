import { Route, Routes } from 'react-router-dom';
import { AuthContextProvidere } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <AuthContextProvidere>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Routes>
      </AuthContextProvidere>
    </>
  );
}

export default App;
