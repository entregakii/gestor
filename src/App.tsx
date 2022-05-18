import { Route } from 'react-router-dom';
import MainProvider from './contexts/main';
import OrdersProvider from './contexts/orders';
import AlertProvider from './hooks/alert/provider';
import PrintProvider from './hooks/usePrint';
import InitializationPage from './pages/Initilization';
import LoginPage from './pages/Login';
import Routes from './routes';

function App() {
  return (
   
    <AlertProvider>
      <MainProvider>
        <PrintProvider>
           <Routes/> 
        </PrintProvider>
      </MainProvider>
    </AlertProvider>
  );
}

export default App;
