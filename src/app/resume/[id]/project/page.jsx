"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConfigProvider } from "antd";
import { Button, Card } from "antd";
const { Meta } = Card;

import UserCVBuilderHeader from "@/app/components/UserCVBuilderHeader";
import UserCVBuilderLayout from "@/app/components/Layout/UseCVBuilderLayout";

import ProjectForm from "@/app/components/Form/ProjectForm";

import SortCheckbox from "./SortCheckbox";
import DataService from "../../../utils/dataService";
import ProjectList from "./ProjectList";

const Project = ({ params }) => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    PROJECT: true,
  });
  console.log("Data: ", params);

  const cvId = params.id;
  const dataService = new DataService('projects', cvId);

  const fetchData = async () => {
    try {
      const data = await dataService.getAll();
      console.log("fetchData ", data);
      setData(data);
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditData = (data) => {
    setSelectedData(data);
  };
  const handleDeleteData = async (dataId) => {
    try {
      console.log("delete data id ", dataId);

      await dataService.delete(cvId, experienceId);

      const updatedData = await dataService.getAll(cvId);

      setData(updatedData);

    } catch (error) {
      console.error("There was an error deleting the data", error);
    }
  };
  const [sortByDate, setSortByDate] = useState(true);

  const handleSortChange = () => {
    setSortByDate(!sortByDate);
  };

  return (
    <main>
    <ConfigProvider>
    <UserCVBuilderLayout
          userHeader={<UserCVBuilderHeader               
            initialEnabledCategories={enabledCategories}
            cvId={params.id}
          />}
        content={
          <div className="flex h-screen ">
            <div className="flex flex-col p-4">
              <div className="h-1/3">
                <p>
                  <Image
                    src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                    width={320}
                    height={182}
                    alt="Video"
                  />
                </p>
              </div>
              <div className="h-3/4">
                <div>
                  <div className=" p-[27px] bg-white rounded-[9px] shadow flex-col justify-start items-start gap-[17px] inline-flex">
                    <div className="w-[266px] h-[50.50px] relative border-b border-gray-300">
                      <div className="left-0 top-[1.47px] absolute text-slate-700 text-lg font-bold font-['Source Sans Pro'] leading-7">
                        Your Project
                      </div>
                      {/* <div className="left-[138.20px] top-[9px] absolute text-gray-300 text-lg font-black font-['Font Awesome 5 Free'] leading-[18px]">
                        
                      </div> */}
                    </div>
                    {data.map((item) => (
                      <ProjectList
                        key={item.id}
                        data={item}
                        onDelete={handleDeleteData}
                        onEdit={handleEditData}
                      />
                    ))}
                    <div className="w-[266px] pl-[63.27px] pr-[64.73px] pt-[12.86px] pb-[13.19px] bg-indigo-500 rounded-md justify-center items-center inline-flex">
                      <div className="text-center text-white text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
                        Create new certification
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-4">
              <ProjectForm
                cvId={cvId}
                onCreated={fetchData}
                data={selectedData}
              />
            </div>
          </div>
        }
      />
    </ConfigProvider>
  </main>
  );
};

export default Project;
