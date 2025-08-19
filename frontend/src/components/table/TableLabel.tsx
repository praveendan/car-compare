import { Col } from "react-bootstrap"

const TableLabel: React.FC<{ text: string, className?: string }> = ({ text, className = '' }) => {
  return (
    <Col xs={2} md={2} lg={2} className="d-flex align-items-center text-wrap border-end" title={text}>
      <p className={`m-0 text-truncate ${className}`}>{text}</p>
    </Col>
  )
}

export default TableLabel
