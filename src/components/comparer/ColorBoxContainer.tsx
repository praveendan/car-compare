import { Color } from "../../types/common.types"

const ColorBox: React.FC<{ color: Color }> = ({ color }) => {
  return (
    <div title={color.name} style={{
      width: '24px',
      height: '24px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid black',
      padding: '1px',
      margin: '1px'
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        backgroundColor: `rgb(${color.rgb})`,
        borderRadius: '5px',
        border: '1px solid black',
        padding: 0
      }}></div>
    </div>
  )
}

const ColorBoxContainer: React.FC<{ colors: Color[] }> = ({ colors }) => {
  return (
    <div className="d-flex">
      {
        colors.map(color => (<ColorBox color={color} />))
      }
    </div>
  )
}

export default ColorBoxContainer