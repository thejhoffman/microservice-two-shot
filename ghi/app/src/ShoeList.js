import React from "react";

class ShoeList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            shoes: [],
        };
        this.handleDeleteShoe = this.handleDeleteShoe.bind(this);
    }
   async componentDidMount() {
    const url = 'http://localhost:8080/api/shoes/';

    const response = await fetch(url);

    if (response.ok){
        const data = await response.json();
        this.setState({shoes: data.shoes})
    }
   }
   async handleDeleteShoe(event) {
    const shoeId = event.target.value
    const deleteUrl = `http://localhost:8080/api/shoes/${shoeId}`

    const fetchConfig = {
        method: "delete",


    };
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok){
        window.location.reload(true)
    };
}

   render (){
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th> Model Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.shoes.map((shoe) => {
                        return (
                            <tr key={shoe.id}>
                                <td>{ shoe.manufacturer}</td>
                                <td>{ shoe.model_name }</td>
                                <td><button onClick={this.handleDeleteShoe} value={shoe.id}></button>Delete</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
   }
  }

  export default ShoeList;
