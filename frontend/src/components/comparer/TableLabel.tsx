import { Col } from "react-bootstrap"

const TableLabel: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Col xs={2} md={2} lg={2} className="border d-flex align-items-center text-wrap" title={text}>
      <p className="small m-0 text-truncate">{text}</p>
    </Col>
  )
}

export default TableLabel
