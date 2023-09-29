"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConfigProvider } from "antd";
import { Button, Card } from "antd";
const { Meta } = Card;

import UserCVBuilderHeader from "@/app/components/UserCVBuilderHeader";
import UserCVBuilderLayout from "@/app/components/Layout/UseCVBuilderLayout";


import DataService from "../../../utils/dataService";
import ContactForm from "@/app/components/Form/ContactForm";

const Certification = ({ params }) => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    CONTACT: true,
  });
  console.log("Data: ", params);

  const cvId = params.id;
  const dataService = new DataService('certifications', cvId);

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
            <ContactForm
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

export default Certification;
