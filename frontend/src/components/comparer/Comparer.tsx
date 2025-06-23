import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarForm from './CarForm';
import { Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Comparison } from './types';
import { MAX_COMPARISONS } from '../../constants';
import DetailsPane from './DetailsPane';
import { getComprisons, getVehicleBrandData } from '../../api/data';
import { GlobalContext } from '../../context/GlobalProvider';
import { TrimSpecs } from '../../types/common.types';

const DEFAULT_COMPARISON: Comparison = {
  brand: '',
  model: '',
  trim: '',
  year: ''
}

const getIsDisabled = (comparisons: Comparison[]) => {
  return comparisons.some(comparison => comparison.trim.trim() === '')
}

const Comparer: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false)
  const [comparisons, setComparisons] = useState<Comparison[]>([DEFAULT_COMPARISON, DEFAULT_COMPARISON])
  const [comparisonData, setComparisonData] = useState<Map<string, TrimSpecs>>(new Map())

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

  const loadComparisons = async () => {
    setLoading(true)
    const data = await getComprisons(comparisons.map(comparison => comparison.trim))
    setLoading(false)
    setComparisonData(data)
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
    <Container className='mt-3'>
      <Row>
        <Col xs={2} md={2} lg={2} className="pb-2 px-0 px-sm-1 px-md-2 col-lg-2 col-md-2 col-2 d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            type="submit"
            className='btn btn-primary btn-lg'
            onClick={_ => {
              const comparisonCopy = [...comparisons]
              comparisonCopy.push(DEFAULT_COMPARISON)
              setComparisons(comparisonCopy)
            }}
            disabled={comparisons.length === MAX_COMPARISONS}>+</Button>
        </Col>
        {
          comparisons.map((_, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className="pb-2 px-0 px-sm-1 px-md-2"
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
      </Row>
      <Row className="pb-2">
        <Button variant="primary" type="submit" disabled={getIsDisabled(comparisons) || loading} onClick={loadComparisons}>
          Compare
        </Button>
      </Row>
      <DetailsPane comparisons={comparisons} comparisonData={comparisonData} />
    </Container>
  );
}

export default Comparer;