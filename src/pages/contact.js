import React from "react";
import Layout from "../components/Layout";

const Contact = () => {
  return (
    <Layout>
      <h1>
        Contact Us
      </h1>
      <form action="https://formspree.io/f/mlevkvyd" method="POST">
        <div>
          <label>
            <span>Your email</span>
            <input type="email" name="email" required/>
          </label>
        </div>
        <div>
          <label>
            <span>Your message</span>
            <textarea name="message" required/>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default Contact;