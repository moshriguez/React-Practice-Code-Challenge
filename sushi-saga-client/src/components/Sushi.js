import React from 'react'

const Sushi = (props) => {
  const { id, name, img_url, price, eaten } = props.oneSushi
  return (
    <div className="sushi">
      <div className="plate" onClick={() => props.eatSushi(id, price)} >
        {eaten ? null : <img src={img_url} width="100%" alt={name} />}
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  )
}

export default Sushi
