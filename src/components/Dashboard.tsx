import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Comparer from './comparer/Comparer';

const Dashboard = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Car-Compare</Navbar.Brand>
        </Container>
      </Navbar>
      <Comparer />
    </>
  );
}

export default Dashboard;