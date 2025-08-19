import { PropsWithChildren } from 'react';
import { Row } from 'react-bootstrap';

const CustomRow: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Row className="border-bottom m-0">
      {children}
    </Row>
  )
}

export default CustomRow
