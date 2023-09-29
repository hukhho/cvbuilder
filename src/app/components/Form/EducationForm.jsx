import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Typography, Button } from "antd";
import {
  updateEducation,
  createEducation,
} from "@/app/resume/[id]/education/educationService";
import "./customtext.css";

const stylesInput = {
  width: "769.22px",
  height: "56.19px",
  padding: "17.30px 15.50px 15.89px",
  backgroundColor: "white",
  borderRadius: "4px",
  border: "2px solid #e5e5e5",
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "Source Sans Pro, sans-serif",
};
const EducationForm = ({ cvId, onEducationCreated, education }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  useEffect(() => {
    if (education) {
      form.setFieldsValue(education);
      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [education, form]);

  const handleSubmit = async (values) => {
    try {
      if (isEditMode) {
        await updateEducation(cvId, education.id, values);
        setIsEditMode(false); // Set to create mode after updating
        form.resetFields(); // Reset the form
      } else {
        await createEducation(cvId, values);
        form.resetFields();
      }
      onEducationCreated();
    } catch (error) {
      console.log("Submit EducationForm. Error:", error);
    }
  };

  return (
    <>
      <div className="w-2/3 ">
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="degree"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  What is your <strong>degree</strong> or other{" "}
                  <strong>qualification</strong> and <strong>major</strong>?
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="Sortware Engineer" />
          </Form.Item>
          <Form.Item
            name="collegeName"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  What is your <strong>degree</strong> or other{" "}
                  <strong>qualification</strong> and <strong>major</strong>?
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="FPT University, Thu Duc" />
          </Form.Item>
          <Form.Item
            name="location"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  What is your <strong>degree</strong> or other{" "}
                  <strong>qualification</strong> and <strong>major</strong>?
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="Thu Duc, HCM" />
          </Form.Item>
          <Form.Item
            name="endYear"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  What is your <strong>degree</strong> or other{" "}
                  <strong>qualification</strong> and <strong>major</strong>?
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="2023" />
          </Form.Item>
          <Form.Item
            name="minor"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  What is your <strong>degree</strong> or other{" "}
                  <strong>qualification</strong> and <strong>major</strong>?
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="SE" />
          </Form.Item>
          <Form.Item
            name="gpa"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  What is your <strong>degree</strong> or other{" "}
                  <strong>qualification</strong> and <strong>major</strong>?
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="3.82 GPA" />
          </Form.Item>
          <Form.Item
            name="description"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  What is your <strong>degree</strong> or other{" "}
                  <strong>qualification</strong> and <strong>major</strong>?
                </span>
              </label>
            }
          >
            <Input
              style={stylesInput}
              placeholder="Awarded full schoolarship for 4 years due to grades."
            />
          </Form.Item>
          <Button
            htmlType="submit"
            className="form-button w-full w-[769.22px] h-[47.86px] pl-[313.83px] pr-[315.39px] pt-[17.26px] pb-[17.60px] bg-indigo-500 rounded-md justify-center items-center inline-flex hover:text-white"
            style={{ width: "769.22px", height: "47.86px", backgroundColor: "rgb(77, 112, 235)", color: "white" }}
          >
            <div className="hover:text-white text-center text-white text-opacity-80 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
              {isEditMode ? "UPDATE EDUCATION" : "SAVE TO EDUCATION LIST"}
            </div>
          </Button>
        </Form>

      </div>
    </>
  );
};
export default EducationForm;
