import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Comparison } from './types';
import { ChangeEvent } from 'react';

const CarForm: React.FC<{
  index: number
  removeDisabled: boolean
  removeFunction: () => void
  updateFunction: (index: number, formData: Partial<Comparison>) => void
}> = ({ index, removeDisabled, removeFunction, updateFunction }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Brand</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => updateFunction(index, {brand: e.target.value})}
        >
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Model</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => updateFunction(index, { model: e.target.value })}
        >
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
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