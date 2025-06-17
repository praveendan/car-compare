import { Col } from "react-bootstrap"

const TableLabel: React.FC<{ text: String }> = ({ text }) => {
  return (
    <Col xs={2} md={2} lg={1} className="border d-flex align-items-center">
      <p className="small m-0">{text}</p>
    </Col>
  )
}

export default TableLabel
