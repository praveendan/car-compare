import { Col } from "react-bootstrap"
import { TrimSpecs } from "../../types/common.types"
import { Comparison } from "./types"

const ComparisonItems: React.FC<{
  keys: string[]
  comparisons: Comparison[]
  comparisonData: Map<string, TrimSpecs>
  children?: React.ReactNode
}> = ({
  keys,
  comparisons,
  comparisonData,
  children
}) => {
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
            xs={true}
            md={true}
            lg={true}
            className="border d-flex align-items-center text-wrap text-truncate"
          >
            {getItem(comparisonData.get(comparison.trim))}
            {children}
          </Col>
        ))
      }
    </>
  )
}

export default ComparisonItems