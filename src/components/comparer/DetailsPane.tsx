import { Row, Col } from "react-bootstrap"
import { Comparison } from "./types"
import { TrimSpecs } from "../../types/common.types"
import React from "react"
import TableLabel from "./TableLabel"
import ComparisonItems from "./ComparisonItems"
import ColorBox from "./ColorBox"

const DetailsPane: React.FC<{
  comparisons: Comparison[]
  comparisonData: Map<string, TrimSpecs>
}> = ({ comparisons, comparisonData }) => {
  console.log(comparisonData)
  return (
    <>
      <Row>
        <TableLabel text='Curb Weight' />
        <ComparisonItems keys={['body', 'curbWeight']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Gross Weight' />
        <ComparisonItems keys={['body', 'grossWeight']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Height' />
        <ComparisonItems keys={['body', 'height']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Length' />
        <ComparisonItems keys={['body', 'length']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Max Payload' />
        <ComparisonItems keys={['body', 'maxPayload']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Max Towing Capacity' />
        <ComparisonItems keys={['body', 'maxTowingCapacity']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Doors' />
        <ComparisonItems keys={['body', 'doors']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='WheelBase' />
        <ComparisonItems keys={['body', 'wheelBase']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Drive Type' />
        <ComparisonItems keys={['driveType']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Cam' />
        <ComparisonItems keys={['engine', 'camType']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Cylinders' />
        <ComparisonItems keys={['engine', 'cylinders']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='cylinders' />
        <ComparisonItems keys={['engine', 'engineType']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Fuel' />
        <ComparisonItems keys={['engine', 'fuel']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='HP' />
        <ComparisonItems keys={['engine', 'hp']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Engine Capacity' />
        <ComparisonItems keys={['engine', 'litres']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='EPA Highway' />
        <ComparisonItems keys={['mileage', 'epaHwy']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='EPA City' />
        <ComparisonItems keys={['mileage', 'epaCity']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='EPA Combined' />
        <ComparisonItems keys={['mileage', 'epaCombined']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='EPA Highway (Electric)' />
        <ComparisonItems keys={['mileage', 'epaHwyE']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='EPA City (Electric)' />
        <ComparisonItems keys={['mileage', 'epaCityE']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='EPA Combined (Electric)' />
        <ComparisonItems keys={['mileage', 'epaCombinedE']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
      <Row>
        <TableLabel text='Colors' />
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className="border d-flex align-items-center flex-wrap"
            >
              {
                (comparisonData.get(comparison.trim)?.colors || []).map(color => (<ColorBox color={color} />))
              }
            </Col>
          ))
        }
      </Row>
      <Row>
        <TableLabel text='Interior Colors' />
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className="border d-flex align-items-center flex-wrap"
            >
              {
                (comparisonData.get(comparison.trim)?.interiorColors || []).map(color => (<ColorBox color={color} />))
              }
            </Col>
          ))
        }
      </Row>
      <Row>
        <TableLabel text='Transmissions' />
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className="border"
            >
              {comparisonData.get(comparison.trim)?.transmissions.join(',')}
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default DetailsPane