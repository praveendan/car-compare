import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Comparison } from './types';
import { ChangeEvent, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalProvider';
import { loadAndSetModelData, loadAndSetModelYearData, loadAndSetModelYearTrimData } from '../../api/data';
import { getTrimStorageKey, getYearStorageKey } from '../../context/helpers';

const CarForm: React.FC<{
  index: number
  formData: Comparison
  removeDisabled: boolean
  removeFunction: () => void
  updateFunction: (index: number, formData: Partial<Comparison>) => void
}> = ({ index, formData, removeDisabled, removeFunction, updateFunction }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const onBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value
    if (brand !== '') {
      loadAndSetModelData(brand, state, dispatch)
    }
    updateFunction(index, { brand })
  }

  const onModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value
    if (formData.brand !== '' && model !== '') {
      loadAndSetModelYearData(formData.brand, model, state, dispatch)
    }
    updateFunction(index, { model })
  }

  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value
    if (formData.brand !== '' && formData.model !== '' && year !== '') {
      loadAndSetModelYearTrimData(formData.brand, formData.model, year, state, dispatch)
    }
    updateFunction(index, { year })
  }

  const onTrimChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateFunction(index, { trim: e.target.value })
  }
  
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Brand</Form.Label>
        <Form.Select
          value={formData.brand}
          aria-label="Brand Select"
          onChange={onBrandChange}
        >
          <option>Select</option>
          {
            state.brands.brands.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Model</Form.Label>
        <Form.Select
          value={formData.model}
          aria-label="Model Select"
          onChange={onModelChange}
          disabled={formData.brand===''}
        >
          <option>Select</option>
          {
            (state.brandModels.brandModels.get(formData.brand) || []).map(model => <option value={model.id} key={model.id}>{model.name}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Year</Form.Label>
        <Form.Select
          value={formData.year}
          aria-label="Year Select"
          onChange={onYearChange}
          disabled={formData.model === ''}
        >
          <option>Select</option>
          {
            (state.brandModelYears.brandModelYears.get(getYearStorageKey(formData.brand, formData.model)) || []).map(year => <option value={year} key={year}>{year}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Trim</Form.Label>
        <Form.Select
          value={formData.trim}
          aria-label="Trim Select"
          onChange={onTrimChange}
          disabled={formData.year === ''}
        >
          <option>Select</option>
          {
            (state.brandModelYearTrims.brandModelYearTrims.get(getTrimStorageKey(formData.brand, formData.model, formData.year)) || []).map(trim => <option value={trim.id} key={trim.id}>{trim.description}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={removeFunction}
        disabled={removeDisabled}
      >
        Remove
      </Button>
    </Form>
  )
}

export default CarForm;