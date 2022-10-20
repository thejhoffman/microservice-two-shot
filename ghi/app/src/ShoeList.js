import React from "react";

class ShoeList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            shoes: [],
        };
    }
   async componentDidMount() {
    const url = 'http://localhost:8080/api/shoes/';

    const response = await fetch(url);

    if (response.ok){
        const data = await response.json();
        this.setState({shoes: data.shoes})
    }
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
