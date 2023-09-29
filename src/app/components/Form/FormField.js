// FormField.js
import React from "react";
import { Form, Input } from "antd";

const FormField = ({ name, label, placeholder, initialValue }) => (
  <Form.Item name={name} label={label}>
    <Input
      style={{
        width: "769.22px",
        height: "56.19px",
        padding: "17.30px 15.50px 15.89px",
        backgroundColor: "white",
        borderRadius: "4px",
        border: "2px solid #e5e5e5",
        fontSize: "16px",
        fontWeight: "600",
        fontFamily: "Source Sans Pro, sans-serif",
      }}
      placeholder={placeholder}
      initialValue={initialValue}
    />
  </Form.Item>
);

export default FormField;