import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarForm from './CarForm';
import { Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Comparison } from './types';
import { MAX_COMPARISONS } from '../../constants';
import DetailsPane from './DetailsPane';
import { getVehicleBrandData } from '../../api/data';
import { GlobalContext } from '../../context/GlobalProvider';

const DEFAULT_COMPARISON: Comparison = {
  brand: '',
  model: '',
  trim: ''
}

const Comparer: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [comparisons, setComparisons] = useState<Comparison[]>([DEFAULT_COMPARISON, DEFAULT_COMPARISON])

  const removeFunction = (index: number) => {
    const comparisonCopy = [...comparisons]
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

  useEffect(() => {
    const dataLoader = async () => {
      const data = await getVehicleBrandData()
      dispatch({ type: 'ADD_BRANDS', payload: data.brands})
    }

    if (state.brands.brands.length === 0) {
      dataLoader()
    }
  }, [dispatch, state.brands.brands.length])

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={1} className="pb-2 border-top d-none d-lg-block"></Col>
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
                formData={comparisons[index]}
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
            className='w-100 h-100'
            onClick={_ => {
              const comparisonCopy = [...comparisons]
              comparisonCopy.push(DEFAULT_COMPARISON)
              setComparisons(comparisonCopy)
            }}
            disabled={comparisons.length === MAX_COMPARISONS}>+</Button>
        </Col>
      </Row>
      <Row className="pb-2">
        <Button variant="primary" type="submit">
          Compare
        </Button>
      </Row>
      <DetailsPane comparisons={comparisons} />
    </Container>
  );
}

export default Comparer;