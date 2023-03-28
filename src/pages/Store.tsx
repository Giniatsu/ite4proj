import React, { useState } from "react";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/items.json";

export function Store() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredItems = storeItems.filter((item) => {
    const nameMatch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory
      ? item.category === selectedCategory
      : true;
    return nameMatch && categoryMatch;
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Store</h1>
          </Col>
          <Col>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <Form.Select
                className="me-2"
                aria-label="Category"
                onChange={handleCategoryChange}
              >
                <option value="">All categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
              </Form.Select>
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Row md={2} xs={1} lg={3} className="g-3">
        {filteredItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
