import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import Container from './components/Container';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DashboardPage from './components/DashboardPage';
import ProductPage from './components/ProductPage';
function App() {
  return (
    <>
      <div className=" flex min-h-screen" aria-label="Sidebar">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage />}>
            </Route>
            <Route exact path="/product" element={<ProductPage />}>
            </Route>
          </Routes>
        </BrowserRouter>,
      </div>


    </>
  );
}

export default App;
