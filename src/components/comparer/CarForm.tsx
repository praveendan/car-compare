import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Comparison } from './types';
import { ChangeEvent, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalProvider';
import { loadAndSetModelData } from '../../api/data';

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
    loadAndSetModelData(brand, state, dispatch)
    updateFunction(index, { brand })
  }

  const onModelChange = (e: ChangeEvent<HTMLSelectElement>) => { 
    updateFunction(index, { model: e.target.value })
  }
  
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Brand</Form.Label>
        <Form.Select
          value={formData.brand}
          aria-label="Default select example"
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
          aria-label="Default select example"
          onChange={onModelChange}
        >
          <option>Select</option>
          {
            (state.brandModels.brandModels.get(formData.brand) || []).map(model => <option value={model.id} key={model.id}>{model.name}</option>)
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