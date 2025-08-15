import { Card, Button } from "react-bootstrap"
import { MAX_COMPARISONS } from "../../constants"

const ButtonPane: React.FC<{
  isDisabled: boolean
  comparisonsLength: number
  addComparison: () => void
  loadComparisons: () => void
}> = ({
  isDisabled,
  comparisonsLength,
  addComparison,
  loadComparisons
}) => {
  return (
    <Card className='rounded-4 shadow card p-4 d-flex flex-row'>
      <div className='flex-fill me-2'>
        <Button variant="secondary" className='rounded-3 w-100' disabled={comparisonsLength === MAX_COMPARISONS} onClick={addComparison}>
          Add Vehicle
        </Button>
      </div>
      <div className='flex-fill ms-2'>
        <Button variant="primary" className='rounded-3 w-100' type="submit" disabled={isDisabled} onClick={loadComparisons}>
          Compare
        </Button>
      </div>
    </Card>
  )
}

export default ButtonPane