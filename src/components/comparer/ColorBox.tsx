import { Color } from "../../types/common.types"
import styles from './colorbox.module.css'

const ColorBox: React.FC<{ color: Color }> = ({ color }) => {
  return (
    <div title={color.name} className={styles.swatch_container}>
      <div className={styles.swatch} style={{backgroundColor: `rgb(${color.rgb})`}}></div>
    </div>
  )
}

export default ColorBox