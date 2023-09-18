"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConfigProvider } from "antd";
import { Button, Card } from "antd";
const { Meta } = Card;
import UserCVBuilderHeader from "@/app/components/UserCVBuilderHeader";
import UserCVBuilderLayout from "@/app/components/Layout/UseCVBuilderLayout";
import ExperienceForm from "@/app/components/Form/ExperienceForm";
const FinishUp = () => {
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/cv/templates/get-template-example"
        );
        const data = await response.json();
        setTemplateData(data);
      } catch (error) {
        console.error("Error fetching the template:", error);
      }
    }

    fetchData();
  }, []);

  

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={<UserCVBuilderHeader />}
          content={
            <div className="flex h-screen">
              <div className="w-2/3  flex flex-col justify-center items-center">


                <div>
                  <h1>Template Data</h1>
                  <div>{templateData}</div>
                </div>
              </div>

              <div className="w-1/3 flex flex-col items-start">
                <div className="h-1/3">
                  <p>
                    <a href="https://app.rezi.ai/dashboard/resume/jnB6pSiIUsbkyJXK4HG8/experience?wvideo=fo7dvqzmxu">
                      <img
                        src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                        width="400"
                        height="225"
                        style={{ width: "400px", height: "225px" }}
                        alt="Video Thumbnail"
                      />
                    </a>
                  </p>
                </div>
                <div className="h-1/3 ">
                  <h1>REZI EXPERT REVIEW</h1>
                  <p>
                    We'll correct all formatting, content, and grammar errors
                    directly in your resume
                  </p>
                  <Button
                    className="form-button w-full"
                    style={{
                      backgroundColor: "rgb(77, 112, 235)",
                      color: "white",
                    }}
                  >
                    ASK FOR REZI EXPERT REVIEW
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default FinishUp;
