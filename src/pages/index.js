import * as React from "react"
import Header from "../components/Header"

const Index = () => {
  return (
      <div>
          <Header />
          <h1>Gatsby &amp; Contentful</h1>
      </div>
  );
};

export default Index;

export const Head = () => <title>Home Page</title>
