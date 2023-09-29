import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import DataService from "@/app/utils/dataService";

import "./customtext.css";
import "./select.css";

const stylesInput = {
  width: "100%",
  height: "56.19px",
  padding: "17.30px 15.50px 15.89px",
  backgroundColor: "white",
  borderRadius: "4px",
  border: "2px solid #e5e5e5",
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "Source Sans Pro, sans-serif",
};

const ContactForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  const dataService = new DataService("certifications", cvId);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      setIsEditMode(true);
    } else {
      form.resetFields();
      setIsEditMode(false);
    }
  }, [data, form]);

  const handleSubmit = async (values) => {
    try {
      if (isEditMode) {
        await dataService.update(data.id, values);
        setIsEditMode(false);
        form.resetFields();
      } else {
        await dataService.create(values);
        form.resetFields();
      }
      onCreated();
    } catch (error) {
      console.log("Submit. Error:", error);
    }
  };

  return (
    <div className="w-full">
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>FULL NAME</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="Charles Bloomberg" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>EMAIL ADDRESS</strong>
                  </span>
                </label>
              }
            >
              <Input
                style={stylesInput}
                //charlesbloomberg@wisc.edu
                placeholder="charlesbloomberg@wisc.edu"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phone"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>PHONE NUMBER</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="(621) 799-5548" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="linkedIn"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>LINKEDIN</strong> URL
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="in/cbloomberg" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="website"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>PERSONAL WEBSITE</strong> OR RELEVANT LINK
                  </span>
                </label>
              }
            >
              <Input
                style={stylesInput}
                placeholder="https://www.charlesbloomberg.com"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="country"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>COUNTRY</strong>
                  </span>
                </label>
              }
            >
              <Select
                style={{  }}
              >
                <Select.Option value="UnitedState">United State</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="state"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>STATE</strong>
                  </span>
                </label>
              }
            >
              <Select>
                <Select.Option value="UnitedState">United State</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="city"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>CITY</strong>
                  </span>
                </label>
              }
            >
              <Select>
                <Select.Option value="UnitedState">United State</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Button
              htmlType="submit"
              className="form-button"
              style={{
                width: "100%",
                backgroundColor: "rgb(77, 112, 235)",
                color: "white",
              }}
            >
              {isEditMode ? "UPDATE" : "SAVE TO CONTACT"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactForm;
