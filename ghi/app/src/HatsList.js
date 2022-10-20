import React from "react";
import { Link } from "react-router-dom";

const CreateColumn = (props) => {
  return (
    <div className="col">
      {props.columnList.map((hat, index) => <CreateCard key={index} hat={hat} />)}
    </div>
  );
};

const CreateCard = (props) => {
  return (
    <div className="card mb-3 shadow text-center" style={{ width: '18rem' }}>
      <img src={props.hat.picture_url} className="card-img-top" alt="hat" />
      <div className="card-body">
        <h5 className="card-title">{props.hat.style_name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.hat.location.name}</h6>
        <Link to={`${props.hat.id}`} className="btn btn-primary">See Details</Link>
      </div>
    </div>
  );
};

class HatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [[], [], []],
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8090/api/hats/');
    if (response.ok) {
      const data = await response.json();

      const hatColumns = [[], [], []];
      data.hats.forEach((hat, index) => {
        hatColumns[index % 3].push(hat);
      });
      this.setState({ columns: hatColumns });
    }
  }

  render() {
    return (
      <div className=" container my-5">
        <div className="row">
          {this.state.columns.map((columnList, index) => {
            return < CreateColumn key={index} columnList={columnList} />;
          })}
        </div>
      </div>
    );
  }
}

export default HatsList;
