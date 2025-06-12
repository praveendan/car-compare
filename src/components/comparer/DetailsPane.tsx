import { Row, Col } from "react-bootstrap"
import { Comparison } from "./types"
import { TrimSpecs } from "../../types/common.types"

const TableLabel: React.FC<{ text: String }> = ({ text }) => {
  return (
    <Col xs={2} md={2} lg={1} className="pb-2 border">
      <p className="small">{text}</p>
    </Col>
  )
}

const ComparisonItems: React.FC<{
  keys: string[]
  comparisons: Comparison[]
  comparisonData: Map<string, TrimSpecs>
}> = ({ keys, comparisons, comparisonData }) => {

  const getItem = (trimSpecs: TrimSpecs | undefined) => {
    if (!trimSpecs) return ''

    let data: any = trimSpecs

    keys.forEach(key => {
      data = data[key]
    })
    return data
  }

  return (
    <>
      {
        comparisons.map((comparison, index) => (
          <Col
            key={index}
            xs={5}
            md={5}
            lg={true}
            className="pb-2 border"
          >
            {getItem(comparisonData.get(comparison.trim))}
          </Col>
        ))
      }
    </>
  )
}

const DetailsPane: React.FC<{
  comparisons: Comparison[]
  comparisonData: Map<string, TrimSpecs>
}> = ({ comparisons, comparisonData }) => {
  console.log(comparisonData)
  return (
    <>
      <Row>
        <TableLabel text='Curb Weight' />
        <ComparisonItems keys={['body', 'curbWeight']} comparisons={comparisons} comparisonData={comparisonData}/>
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
      {

      }
      <Row>
        <TableLabel text='Transmissions' />
        <ComparisonItems keys={['transmissions']} comparisons={comparisons} comparisonData={comparisonData} />
      </Row>
    </>
  )
}

export default DetailsPane