import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = ({ fourSushi, moreSushi, eatSushi }) => {
  const renderFourSushi = () => {
    return fourSushi.map(sushi => <Sushi oneSushi={sushi} key={sushi.id} eatSushi={eatSushi}/>)
  }
  return (
    <Fragment>
      <div className="belt">
        {renderFourSushi()}
        <MoreButton moreSushi={moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer