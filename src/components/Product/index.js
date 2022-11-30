import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { PriceBox } from "../../templates/BlogPost/style";

const Product = ({props}) => {
  console.log("TEST", props);
  return (
    <div style={{display: "flex"}}>
      <div style={{width: "50%", flexShrink: 0}}>
        {props.data.allShopifyProduct.nodes[0].media.map((image, index) => (
          <GatsbyImage key={props.data.allShopifyProduct.nodes[0].id + index} alt={image.preview.image.altText} image={image.preview.image.gatsbyImageData}/>
        ))}
      </div>
      <div style={{padding: "0 40px", width: "50%"}}>
        <h1>{props.data.allShopifyProduct.nodes[0].title}</h1>
        <div style={{margin: "0 0 30px"}}>{props.data.allShopifyProduct.nodes[0].description}</div>
        <PriceBox>
          <ins>${props.data.allShopifyProduct.nodes[0].variants[0].price}</ins>
          <del>${props.data.allShopifyProduct.nodes[0].variants[0].compareAtPrice}</del>
        </PriceBox>
        <button type="submit" style={{margin: "20px 0 0", width: "100%", padding: "10px 20px", background: "#fff", border: "1px solid black", cursor: "pointer"}}>Add to card</button>
      </div>
    </div>
  )
}

export default Product;