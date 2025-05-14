import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarForm from './CarForm';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Comparison } from './types';
import { MAX_COMPARISONS } from '../../constants';

const DEFAULT_COMPARISON: Comparison = {
  brand: '',
  model: ''
}

const Comparer: React.FC = () => {
  const [comparisons, setComparisons] = useState<Comparison[]>([DEFAULT_COMPARISON, DEFAULT_COMPARISON])

  const removeFunction = (index: number) => {
    const comparisonCopy = [...comparisons]
    console.log(index)
    comparisonCopy.splice(index, 1)
    setComparisons(comparisonCopy)
  }

  const updateFunction = (index: number, formData: Partial<Comparison>) => {
    const comparisonCopy = [...comparisons]
    comparisonCopy[index] = {
      ...comparisonCopy[index],
      ...formData
    }
    setComparisons(comparisonCopy)
  }

  return (
    <Container>
      <Row>
        {
          comparisons.map((_, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={true}
              className="pb-2 border-top"
            >
              <CarForm
                index={index}
                updateFunction={updateFunction}
                removeFunction={() => removeFunction(index)}
                removeDisabled={comparisons.length === 2}
              />
            </Col>
          ))
        }
        <Col xs={12} md={6} lg={1} className="pb-2 border-top">
          <Button
            variant="primary"
            type="submit"
            className='w-100'
            onClick={_ => {
              const comparisonCopy = [...comparisons]
              comparisonCopy.push(DEFAULT_COMPARISON)
              setComparisons(comparisonCopy)
            }}
            disabled={comparisons.length === MAX_COMPARISONS}>Add one</Button>
        </Col>
      </Row>
      <Row className='pt-2'>
        <Button variant="primary" type="submit">
          Compare
        </Button>
      </Row>
    </Container>
  );
}

export default Comparer;