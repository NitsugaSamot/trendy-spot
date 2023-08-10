import { Container, Row, Col } from "react-bootstrap";

const Cart = ({cart}) => {
    if (!cart || cart.length === 0) {
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>Cart is empty</h1>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <h1>Cart</h1>
                </Col>
            </Row>
            {cart.map(item => (
        <Row key={item.id}>
          <Col>{item.name}</Col>
          <Col>Cantidad: {item.quantity}</Col>
          <Col>Precio: ${item.price * item.quantity}</Col>
        </Row>
      ))}
      <Row>
        <Col>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</Col>
      </Row>
    </Container>
    )
};

export default Cart;