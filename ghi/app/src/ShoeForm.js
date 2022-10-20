import React from 'react';

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bins: [],
            manufacturer: "",
            model: "",
            color: "",
            pictureUrl: "",
            bin: "",
        };
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleBinChange = this.handleBinChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.img_url = data.imgUrl;
        delete data.pictureUrl;
        delete data.bins;

        const shoeUrl = 'http://localhost:8080/api/shoes/'
        const fetchConfig = {
            method: 'DELETE',

        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const cleared = {
                manufacturer: "",
                model: "",
                color: "",
                imgUrl: "",
                bin: ""
            };
            this.setState(cleared);
        }
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer: value })
    }
    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model: value })
    }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value })
    }
    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({ pictureUrl: value })
    }
    handleBinChange(event) {
        const value = event.target.value;
        this.setState({ bin: value })
    }
    async componentDidMount() {
        const response = await fetch('http://localhost:8100/api/bins')

        if (response.ok) {
            const data = await response.json();
            this.setState({ bins: data.bins })
        }
    }
    render (){
        return (
        <div className="row">
            <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
            <h1>Create a new Shoe!</h1>
            <form onSubmit={this.handleSubmit} id="create-shoe-form">
            <div className='form-floating mb-3'>
                <input value={this.state.manufacturer} onChange={this.handleManufacturerChange} required placeholder="manufacturer" type="text" id="manufacturer" name="manufacturer" className='form-control' />
                <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <div className='form-floating mb-3'>
                <input value={this.state.model} onChange={this.handleModelChange} required placeholder="model" type="text" id="model" name="model" className='form-control' />
                <label htmlFor="model">Model</label>
            </div>
            <div className='form-floating mb-3'>
                <input value={this.state.color} onChange={this.handleColorChange} required placeholder="color" type="text" id="color" name="color" className='form-control' />
                <label htmlFor="color">Color</label>
            </div>
            <div className='form-floating mb-3'>
                <input value={this.state.imgUrl} onChange={this.handlePictureUrlChange} required placeholder="picture" type="text" id="picture_url" name="picture_url" className='form-control' />
                <label htmlFor="imgUrl">Picture</label>
            </div>
            <div className="mb-3">
                <select value={this.state.bin} onChange={this.handleBinChange} name="bin" id="bin" className="form-select" required>
                    <option>Bin</option>
                    {this.state.bins.map(bin => {
                        return (
                                <option key={bin.href} value={bin.href}>
                                {bin.closet_name}
                    </option>
                    );
                    })}
                </select>
            </div>
            <button className="btn btn-primary">Submit</button>
            </form>
            </div>
            </div>
        </div>



        );
    }
}
export default ShoeForm;
