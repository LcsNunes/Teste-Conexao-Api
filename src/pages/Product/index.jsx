

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Header, Item } from "./styles";
import { Button } from '../../components/Button';

import { api } from "../../services/api";

export function Product() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const Products = () => {
    api.post("/product", { price })
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível cadastrar.");
        }
      });
  };

  return (
    <Container>
      <Header>
        <h1>Produtos</h1>

        <nav>
          <Button title="Cadastrar" onClick={() => navigate('/product')}/>
          <Button title="Voltar" onClick={() => navigate('/')} />
        </nav>
      </Header>

      {products.map((product, index) => (
        <Item key={index}>
          <span>{product.name}</span>
        </Item>
      ))}
    </Container>
  )
}
