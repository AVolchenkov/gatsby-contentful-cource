import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { Hero } from "../Hero";
import { PriceGroup } from "../PriceGroup";
import { GatsbyImage } from "gatsby-plugin-image";
import { Wrapper, ImageWrapper } from "./style";

export const RichText = ({raw, references = []}) => {
  const referencesMap = {};

  references.forEach(reference => {
    referencesMap[reference.contentful_id] = reference
    console.log("reference", reference);
  });


  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        console.log("node", node);
        const data = referencesMap[node.data.target.sys.id];
        console.log("data", data);
        return (
          <ImageWrapper>
            <GatsbyImage alt={data.title} image={data.gatsbyImageData}/>
          </ImageWrapper>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const data = referencesMap[node.data.target.sys.id];
        switch(data.__typename) {
          case "ContentfulHero":
            return <Hero heading={data.heading} subHeading={data.subHeading} backgroundImage={data.backgroundImage.gatsbyImageData}/>
          case "ContentfulPriceGroup":
            return <PriceGroup priceOptions={data.priceOptions}/>
          default:
            return null;
        }
      }
    }
  }
  return (
    <Wrapper>
      {documentToReactComponents(JSON.parse(raw), options)}
    </Wrapper>
  )
}