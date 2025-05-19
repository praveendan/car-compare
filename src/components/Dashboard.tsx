import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Comparer from './comparer/Comparer';
import { GlobalProvider } from '../context/GlobalProvider';

const Dashboard = () => {
  return (
    <GlobalProvider>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Car-Compare</Navbar.Brand>
        </Container>
      </Navbar>
      <Comparer />
    </GlobalProvider>
  );
}

export default Dashboard;