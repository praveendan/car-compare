import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarForm from '../components/form/CarForm';
import { useContext, useEffect, useState } from 'react';
import { Comparison } from '../components/table/types';
import DetailsPane from '../components/detailsPane/DetailsPane';
import { getComprisons, getVehicleBrandData } from '../api/data';
import { GlobalContext } from '../context/GlobalProvider';
import { TrimSpecs } from '../types/common.types';
import ButtonPane from '../components/buttonPane/buttonPane';

const DEFAULT_COMPARISON: Comparison = {
  brand: '',
  model: '',
  trim: '',
  year: ''
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
      <section>
        <Row className='mb-4'><header><h1 className='text-center'>Car Compare</h1></header></Row>
      </section>
      <section>
        <Row className='mb-4 d-flex justify-content-between'>
          {
            comparisons.map((_, index) => (
              <Col
                key={index}
                xs={true}
                md={true}
                lg={true}
                className={`px-0 ${index < comparisons.length - 1 && 'pe-4'}`}
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
      </section>
      <section>
        <Row className='mb-4'>
          <Col className='p-0'>
            <ButtonPane
              comparisonsLength={comparisons.length}
              addComparison={() => {
                const comparisonCopy = [...comparisons]
                comparisonCopy.push(DEFAULT_COMPARISON)
                setComparisons(comparisonCopy)
              }}
              loadComparisons={async () => {
                setLoading(true)
                const data = await getComprisons(comparisons.map(comparison => comparison.trim))
                setLoading(false)
                setComparisonData(data)
              }}
              isDisabled={comparisons.some(comparison => comparison.trim.trim() === '') || loading} />
          </Col>
        </Row>
      </section>
      <section>
        <Row>
          <DetailsPane comparisons={comparisons} comparisonData={comparisonData} />
        </Row>
      </section>
    </Container>
  );
}

export default Comparer;