import { Row, Col } from "react-bootstrap"
import { Comparison } from "./types"

const DetailsPane: React.FC<{
  comparisons: Comparison[]
}> = ({ comparisons }) => {
  return (
    <>
      <Row>
        <Col xs={12} md={6} lg={1} className="pb-2 border">
          <p>Detail 1</p>
        </Col>
        {
          comparisons.map((_, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={true}
              className="pb-2 border"
            >
            </Col>
          ))
        }
        <Col xs={12} md={6} lg={1} className="pb-2 d-none d-lg-block"></Col>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={1} className="pb-2 border">
          <p>Detail 2</p>
        </Col>
        {
          comparisons.map((_, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={true}
              className="pb-2 border"
            >
            </Col>
          ))
        }
        <Col xs={12} md={6} lg={1} className="pb-2 d-none d-lg-block"></Col>
      </Row>
    </>
  )
}

export default DetailsPane