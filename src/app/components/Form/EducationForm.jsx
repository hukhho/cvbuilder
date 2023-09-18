    import React,  { useState, useEffect } from 'react';
    import { Form, Input, InputNumber, Typography, Button } from 'antd';
    import { updateEducation, createEducation } from '@/app/resume/[id]/education/educationService';

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
                    <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
                        <Form.Item name="degree" label="WHAT IS YOUR DEGREE OR OTHER QUALIFICATION AND MAJOR?">
                            <Input style={{}} placeholder="Sortware Engineer" />
                        </Form.Item>
                        <Form.Item name="collegeName" label="WHERE DID YOU EARN YOUR DEGREE/QUALIFICATION?">
                            <Input style={{}} placeholder="FPT University, Thu Duc" />
                        </Form.Item>
                        <Form.Item name="location" label="WHERE IS THE INSTITUTION LOCATED?">
                            <Input style={{}} placeholder="Thu Duc, HCM" />
                        </Form.Item>
                        <Form.Item name="endYear" label="WHEN DID YOU EARN YOUR DEGREE/QUALIFICATION?">
                            <Input style={{}} placeholder="2023" />
                        </Form.Item>
                        <Form.Item name="minor" label="DID YOU MINOR IN ANYTHING?">
                            <Input style={{}} placeholder="SE" />
                        </Form.Item>
                        <Form.Item name="gpa" label="GPA(IF APPLOCABLE)?">
                            <Input style={{}} placeholder="3.82 GPA" />
                        </Form.Item>
                        <Form.Item name="description" label="OPEN FIELD FOR ADDITIONAL INFORMATION">
                            <Input style={{}} placeholder="Awarded full schoolarship for 4 years due to grades." />
                        </Form.Item>
                        <Button htmlType="submit" className="form-button w-full" style={{ backgroundColor: 'rgb(77, 112, 235)', color: 'white' }} >
                            {isEditMode ? 'UPDATE EDUCATION' : 'SAVE TO EDUCATION LIST'}
                        </Button>
                    </Form>
                </div>
            </>
        );
    };
    export default EducationForm;