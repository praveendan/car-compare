import { Col } from "react-bootstrap"
import { TrimSpecs } from "../../types/common.types"
import { Comparison } from "./types"

const ComparisonItems: React.FC<{
  keys: string[]
  comparisons: Comparison[]
  comparisonData: Map<string, TrimSpecs>
  postFix?: string
}> = ({
  keys,
  comparisons,
  comparisonData,
  postFix
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
        comparisons.map((comparison, index) => {
          const data = getItem(comparisonData.get(comparison.trim))
          return (
            <Col
              key={index}
              xs={true}
              md={true}
              lg={true}
              className="border d-flex align-items-center text-wrap text-truncate"
            >{data} {!data? '': postFix}</Col>
          )
        })
      }
    </>
  )
}

export default ComparisonItems