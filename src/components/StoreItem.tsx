import { FC, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

interface StoreItemProps {
    id: number
    name: string
    price: number
    imgUrl: string
}

const StoreItem: FC<StoreItemProps> = ({ id, name, price, imgUrl }) => {

    const { getItemQuantity, addItemIntoCart, deleteItemFromCart } = useContext(ShoppingCartContext)

    const quantity = getItemQuantity(id)

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} height={200} className="object-fit-cover" />

            <Card.Body className="d-felx flex-colum">

                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">

                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>

                </Card.Title>

                <div className="mt-auto">
                    {
                        quantity === 0 ? (
                            <Button className="w-100" onClick={() => addItemIntoCart(id) }>
                                + Add To Cart
                            </Button>
                        ) :
                            (
                                <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                    
                                    <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                        
                                        <Button variant="outline-primary" onClick={() => deleteItemFromCart(id) }>-</Button>

                                        <div>
                                            <span className="fs-3">{quantity}</span> in cart
                                        </div>

                                        <Button variant="outline-primary" onClick={() => addItemIntoCart(id) }>+</Button>
                                    </div>

                                    <Button variant="outline-danger" size="sm" onClick={() => deleteItemFromCart(id, true)}>Remove</Button>
                                </div>
                            )
                    }
                </div>

            </Card.Body>
        </Card>
    );
}

export default StoreItem;