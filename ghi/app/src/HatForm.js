import React from "react";

class HatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style_name: '',
      fabric: '',
      color: '',
      picture_url: '',
      location: '',
      locations: []
    };
    this.handleStyleNameChange = this.handleStyleNameChange.bind(this);
    this.handleFabricChange = this.handleFabricChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStyleNameChange(event) { this.setState({ style_name: event.target.value }); }
  handleFabricChange(event) { this.setState({ fabric: event.target.value }); }
  handleColorChange(event) { this.setState({ color: event.target.value }); }
  handlePictureUrlChange(event) { this.setState({ picture_url: event.target.value }); }
  handleLocationChange(event) { this.setState({ location: event.target.value }); }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.locations;

    const url = 'http://localhost:8090/api/hats/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      this.setState({
        style_name: '',
        fabric: '',
        color: '',
        picture_url: '',
        location: '',
      });
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8100/api/locations/');

    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  render() {
    return (
      <div className=" container my-5">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new hat</h1>
              <form onSubmit={this.handleSubmit} id="add-hat-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleStyleNameChange}
                    value={this.state.style_name}
                    className="form-control"
                    placeholder="style_name"
                    required
                    type="text"
                    id="style_name"
                    name="style_name"
                  />
                  <label htmlFor="style_name">Style name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleFabricChange}
                    value={this.state.fabric}
                    className="form-control"
                    placeholder="fabric"
                    required
                    type="text"
                    id="fabric"
                    name="fabric"
                  />
                  <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleColorChange}
                    value={this.state.color}
                    className="form-control"
                    placeholder="color"
                    type="text"
                    id="color"
                    name="color"
                  />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handlePictureUrlChange}
                    value={this.state.picture_url}
                    className="form-control"
                    placeholder="picture_url"
                    type="text"
                    id="picture_url"
                    name="picture_url"
                  />
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={this.handleLocationChange}
                    value={this.state.location}
                    className="form-select"
                    required
                    id="location"
                  >
                    <option value="">Choose a location</option>
                    {this.state.locations.map(location => {
                      return (
                        <option key={location.href} value={location.href}>
                          {location.closet_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HatForm;
