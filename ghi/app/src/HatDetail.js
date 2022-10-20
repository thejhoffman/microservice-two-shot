import { useParams } from 'react-router-dom';
import React from "react";


class HatDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hat: {},
      location: {},
      isDeleted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { hatID } = this.props.params;
    const url = `http://localhost:8090/api/hats/${hatID}/`;
    const fetchConfig = {
      method: "delete",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      this.setState({
        isDeleted: true
      });
    }
  }

  async componentDidMount() {
    const { hatID } = this.props.params;
    const hat_response = await fetch(`http://localhost:8090/api/hats/${hatID}/`);

    if (hat_response.ok) {
      const hat_data = await hat_response.json();
      this.setState({ hat: hat_data });

      const locationID = hat_data.location.import_href;
      const location_response = await fetch(`http://localhost:8100${locationID}`);

      if (location_response.ok) {
        const location_data = await location_response.json();
        this.setState({ location: location_data });
      }
    }

  }

  render() {
    const hat = this.state.hat;
    const location = this.state.location;

    if (Object.keys(location).length === 0)
      return null;

    return (
      <div className=" container my-5">
        <div className={"row" + (this.state.isDeleted ? " d-none" : "")}>
          <div className="col col-sm-auto">
            <img className="bg-white rounded shadow d-block mx-auto mb-4" src={hat.picture_url} width="300" alt="logo" />
          </div>
          <div className="col">
            <div className="card mb-3 shadow">
              <div className="card-header">
                <h5 className="card-title">{hat.style_name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Fabric: {hat.fabric}</li>
                <li className="list-group-item">Color: {hat.color}</li>
              </ul>
              <div className="card-body">
                <div className="btn btn-primary">See Details</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-3 shadow">
              <div className="card-header">
                <h5 className="card-title">{location.closet_name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Section #{location.section_number}</li>
                <li className="list-group-item">Shelf #{location.shelf_number}</li>
              </ul>
              <div className="card-body">
                <div className="btn btn-primary">See Details</div>
              </div>
            </div>
          </div>
        </div >
        <div className="row justify-content-center">
          <div className="col col-sm-auto">
            <form onSubmit={this.handleSubmit} className={(this.state.isDeleted ? " d-none" : "")} id="add-hat-form">
              <button className="btn btn-danger" style={{ width: '5rem' }}>Delete</button>
            </form>
            <div
              className={
                "alert alert-success mb-0" +
                (this.state.isDeleted ? "" : " d-none")}
              id="success-message">
              Hat has been deleted!
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default (props) => (
  <HatDetail
    {...props}
    params={useParams()}
  />
);
