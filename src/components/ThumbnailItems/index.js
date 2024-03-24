import './index.css'

const ThumbnailItem = props => {
  const {eachThumbnail, onSelect} = props
  const {thumbnailUrl, id} = eachThumbnail
  const selectThumbnail = () => {
    onSelect(id)
  }
  return (
    <li className="thumbnailItem">
      <button className="thumbBtn" type="button" onClick={selectThumbnail}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnailImg" />
      </button>
    </li>
  )
}

export default ThumbnailItem
