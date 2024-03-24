import './index.css'

const TabItem = props => {
  const {eachTab, onChangeTab} = props
  const {tabId, displayText} = eachTab
  const changeTab = () => {
    onChangeTab(tabId)
  }
  return (
    <li>
      <button value={tabId} type="button" onClick={changeTab}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
