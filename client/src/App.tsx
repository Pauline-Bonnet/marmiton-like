import './App.css'
import Header from './components/header/Header.tsx';
import Accueil from './pages/accueil/Accueil.tsx';

function App() {
  return (
    <>
      <Header />
      <div className='mainContainer'>
        {/* <Outlet /> */}
        <Accueil />
      </div>
    </>
  )
}

export default App
