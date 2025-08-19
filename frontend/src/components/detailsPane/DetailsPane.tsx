import { Row, Col, Card } from "react-bootstrap"
import { Comparison } from "../table/types"
import { TrimSpecs } from "../../types/common.types"
import React from "react"
import TableLabel from "../table/TableLabel"
import ComparisonItems from "../table/ComparisonItems"
import ColorBox from "../table/ColorBox"
import CustomRow from "../ui/CustomRow"

const DetailsPane: React.FC<{
  comparisons: Comparison[]
  comparisonData: Map<string, TrimSpecs>
}> = ({ comparisons, comparisonData }) => {
  return (
    <Card className='rounded-4 shadow px-0 mb-4'>
      <CustomRow >
        <TableLabel text='Spec' className="h6 py-2"/>
        {
          comparisons.map((_, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className={`d-flex align-items-center flex-wrap m-0 py-2 ${index < comparisons.length - 1 && 'border-end'}`}
            >
              <p className="m-0 h6">Vehicle {index + 1}</p>
            </Col>
          ))
        }
      </CustomRow>
      <CustomRow >
        <TableLabel text='Curb Weight' />
        <ComparisonItems keys={['body', 'curbWeight']} comparisons={comparisons} comparisonData={comparisonData} postFix="lb"/>
      </CustomRow>
      <CustomRow >
        <TableLabel text='Gross Weight' />
        <ComparisonItems keys={['body', 'grossWeight']} comparisons={comparisons} comparisonData={comparisonData} postFix="lb" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Height' />
        <ComparisonItems keys={['body', 'height']} comparisons={comparisons} comparisonData={comparisonData} postFix="in" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Length' />
        <ComparisonItems keys={['body', 'length']} comparisons={comparisons} comparisonData={comparisonData} postFix="in" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Max Payload' />
        <ComparisonItems keys={['body', 'maxPayload']} comparisons={comparisons} comparisonData={comparisonData} postFix="lb" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Max Towing Capacity' />
        <ComparisonItems keys={['body', 'maxTowingCapacity']} comparisons={comparisons} comparisonData={comparisonData} postFix="lb" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Doors' />
        <ComparisonItems keys={['body', 'doors']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='WheelBase' />
        <ComparisonItems keys={['body', 'wheelBase']} comparisons={comparisons} comparisonData={comparisonData} postFix="in" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Drive Type' />
        <ComparisonItems keys={['driveType']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Cam' />
        <ComparisonItems keys={['engine', 'camType']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Cylinders' />
        <ComparisonItems keys={['engine', 'cylinders']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Engine type' />
        <ComparisonItems keys={['engine', 'engineType']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Fuel' />
        <ComparisonItems keys={['engine', 'fuel']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='HP' />
        <ComparisonItems keys={['engine', 'hp']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Engine Capacity' />
        <ComparisonItems keys={['engine', 'litres']} comparisons={comparisons} comparisonData={comparisonData} postFix="l" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='EPA Highway' />
        <ComparisonItems keys={['mileage', 'epaHwy']} comparisons={comparisons} comparisonData={comparisonData} postFix="mpg" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='EPA City' />
        <ComparisonItems keys={['mileage', 'epaCity']} comparisons={comparisons} comparisonData={comparisonData} postFix="mpg" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='EPA Combined' />
        <ComparisonItems keys={['mileage', 'epaCombined']} comparisons={comparisons} comparisonData={comparisonData} postFix="mpg" />
      </CustomRow>
      <CustomRow >
        <TableLabel text='EPA Highway (Electric)' />
        <ComparisonItems keys={['mileage', 'epaHwyE']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='EPA City (Electric)' />
        <ComparisonItems keys={['mileage', 'epaCityE']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='EPA Combined (Electric)' />
        <ComparisonItems keys={['mileage', 'epaCombinedE']} comparisons={comparisons} comparisonData={comparisonData} />
      </CustomRow>
      <CustomRow >
        <TableLabel text='Colors' />
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className={`d-flex align-items-center text-wrap text-truncate ${index < comparisons.length - 1 && 'border-end'}`}
            >
              {
                (comparisonData.get(comparison.trim)?.colors || []).map((color, i) => (<ColorBox key={i} color={color} />))
              }
            </Col>
          ))
        }
      </CustomRow>
      <CustomRow >
        <TableLabel text='Interior Colors' />
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className={`d-flex align-items-center text-wrap text-truncate ${index < comparisons.length - 1 && 'border-end'}`}
            >
              {
                (comparisonData.get(comparison.trim)?.interiorColors || []).map((color, i) => (<ColorBox key={i} color={color} />))
              }
            </Col>
          ))
        }
      </CustomRow>
      <Row className="m-0">
        <TableLabel text='Transmissions' />
        {
          comparisons.map((comparison, index) => (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className={`d-flex align-items-center text-wrap text-truncate ${index < comparisons.length - 1 && 'border-end'}`}
            >
              {comparisonData.get(comparison.trim)?.transmissions.join(',')}
            </Col>
          ))
        }
      </Row>
    </Card>
  )
}

export default DetailsPane