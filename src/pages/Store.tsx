import { FC } from "react";
import storeItems from "../mocks/products.json"
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

interface StoreProps {

}

const Store: FC<StoreProps> = () => {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {
                    storeItems.map(item => 
                        <Col key={item.id}>
                            <StoreItem {...item} />
                        </Col>
                    )
                }
            </Row>
        </>
    );
}

export default Store;