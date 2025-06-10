import { Row, Col } from "react-bootstrap"
import { Comparison } from "./types"
import { TrimSpecs } from "../../types/common.types"

const TableLabel: React.FC<{ text: String }> = ({ text }) => {
  return (
    <p className="small">{text}</p>
  )
}

const DetailsPane: React.FC<{
  comparisons: Comparison[]
  comparisonData: Map<string, TrimSpecs>
}> = ({ comparisons, comparisonData }) => {
  return (
    <>
      <Row>
        <Col xs={12} md={6} lg={1} className="pb-2 border">
          <TableLabel text='Curb Weight'/>
        </Col>
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={true}
              className="pb-2 border"
            >
              {comparisonData.get(comparison.trim)?.body.curbWeight}
            </Col>
          ))
        }
        <Col xs={12} md={6} lg={1} className="pb-2 d-none d-lg-block"></Col>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={1} className="pb-2 border">
          <TableLabel text='Gross Weight' />
        </Col>
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={true}
              className="pb-2 border"
            >
              {comparisonData.get(comparison.trim)?.body.grossWeight}
            </Col>
          ))
        }
        <Col xs={12} md={6} lg={1} className="pb-2 d-none d-lg-block"></Col>
      </Row>
    </>
  )
}

export default DetailsPane