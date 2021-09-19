const Card = (props) => { 
  return (
    <div className="individual-card">
      <div className="individual-card-inner">
        <div className="card-header">{props.header}</div>
        {/* <div className="card-number">{props.number}</div> */}
      </div>
    </div>
  );
};

export default Card;
