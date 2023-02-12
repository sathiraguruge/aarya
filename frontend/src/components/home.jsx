import React, { Component } from "react";
import productService from "../services/productService";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class Home extends Component {
  state = {
    items: [],
  };

  async componentDidMount() {
    const items = await productService.getItems();
    this.setState({ items });
  }

  render() {
    return (
      <div>
        <h1>Arrya</h1>
        {this.state.items.map((item) => (
          <Card style={{ width: "18rem" }} key={item._id}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>{item.price}</Card.Text>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Home;
