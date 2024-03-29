// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Card, ConfigProvider, notification, Space } from 'antd';

// import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
// import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

// import CertificationForm from '@/app/components/Form/CertificationForm';
// import CertificationList from './CertificationList';
// import SortCheckbox from './SortCheckbox';
// import DataService from '../../../utils/dataService';
// import VideoComponent from '@/app/components/VideoComponent';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { updateCertification } from './certificationService';
// import StandarList from '@/app/components/List/StandarList';
// import UserLayout from '@/app/components/Layout/UserLayout';
// import useStore from '@/store/store';
// import CertiSort from './CertiSort';

// const Certification = ({ params }) => {
//   const [data, setData] = useState([]);
//   const [selectedData, setSelectedData] = useState(null);

//   const { avatar, email, userRole } = useStore();
//   const enabledCategories = { CERTIFICATIONS: true };

//   const [isShow, setIsShow] = useState(true);
//   const [isSetData, setIsSetData] = useState(false);

//   const handleDownButton = () => {
//     setIsShow(!isShow);
//   };
//   const cvId = params.id;
//   const dataService = new DataService('certifications', cvId);

//   const fetchData = async () => {
//     try {
//       const newData = await dataService.getAll();
//       setSelectedData(null);

//       newData.sort((a, b) => a.theOrder - b.theOrder);

//       setData(newData);
//     } catch (error) {
//       console.error('There was an error fetching the data', error);
//     }
//   };

//   useEffect(() => {
//     if (!isSetData) {
//       fetchData();
//       setIsSetData(true);
//     }
//   }, []);

//   const handleEditData = item => {
//     setSelectedData(item);
//     console.log('handleEditData', item);
//   };

//   const handleDeleteData = async itemId => {
//     try {
//       await dataService.delete(itemId);
//       const updatedData = await dataService.getAll();
//       setData(updatedData);
//     } catch (error) {
//       console.error('There was an error deleting the data', error);
//     }
//   };

//   const handleOrderChange = async newOrder => {
//     // Create a new JSON with updated "theOrder" property
//     const updatedOrder = newOrder.map((item, index) => ({
//       ...item,
//       theOrder: index + 1,
//     }));
//     console.log('updatedOrder', updatedOrder);

//     setData(updatedOrder);
//     try {
//       await dataService.sortOrder(updatedOrder);
//       notification.success({
//         message: 'Save changed',
//       });
//     } catch (error) {
//       notification.success({
//         message: 'Save order error',
//       });
//       console.error('There was an error updating the data', error);
//     }
//   };

//   return (
//     <main>
//       <ConfigProvider>
//         <UserLayout
//           isCollapsed
//           avatar={avatar}
//           email={email}
//           userRole={userRole}
//           userHeader={
//             <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
//           }
//           content={
//             <div className="flex h-screen w-full">
//               <div
//                 className="flex flex-col p-4 pl-0"
//                 style={{ width: '320px', marginRight: '36px' }}
//               >
//                 <div style={{ height: '185px', width: '320px' }}>
//                   <div style={{ maxHeight: '185px' }}>
//                     <VideoComponent videoUrl="https://fast.wistia.net/embed/iframe/owet1h3scu" />
//                   </div>
//                 </div>
//                 <Card
//                   style={{
//                     width: '320px',
//                     marginTop: '16px',
//                     textAlign: 'left',
//                     borderRadius: '8px',
//                     boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
//                   }}
//                 >
//                   <span className="flex block pb-3 text-md font-bold border-b border-gray-300 list-shown-true">
//                     <Space align="center">
//                       Your Certifications
//                       <div className="text-gray-300 align-middle cursor-pointer leading-3 outline-0 ">
//                         <FontAwesomeIcon
//                           icon={faCaretDown}
//                           className={isShow ? 'transform -rotate-90' : 'transform rotate-0'}
//                           onClick={handleDownButton}
//                         />
//                       </div>
//                     </Space>
//                   </span>
//                   <div>
//                     {/* {isShow && selectedEducation && <ListError errors={selectedEducation?.bulletPointDtos} />} */}
//                   </div>
//                   <div style={{ paddingTop: '0px' }}>
//                     {isShow &&
//                       data.map(project => (
//                         <StandarList
//                           key={project.id}
//                           data={project}
//                           selectedExperience={selectedData}
//                           cvId={cvId}
//                           onDelete={handleDeleteData}
//                           onEdit={handleEditData}
//                           title={project.name}
//                           subtitle=""
//                           updateExperience={updateCertification}
//                         />
//                       ))}
//                     {/* {isShow && (
//                       <CertiSort
//                         cvId={cvId}
//                         selectedExperience={selectedData}
//                         onEdit={handleEditData}
//                         updateExperience={updateCertification}
//                         handleDeleteData={handleDeleteData}
//                         handleEditData={handleEditData}
//                         skills={data}
//                         onChangeOrder={handleOrderChange}
//                       />
//                     )} */}
//                   </div>
//                 </Card>
//               </div>
//               <div className="flex flex-col px-4 w-full">
//                 <CertificationForm
//                   cvId={cvId}
//                   onEducationCreated={fetchData}
//                   education={selectedData}
//                 />
//               </div>
//             </div>
//           }
//         />
//       </ConfigProvider>
//     </main>
//   );
// };

// export default Certification;

import React from 'react';
import ExperiencePage from '../experience/ExperiencePage';

const Certification = ({ params }) => {
  const sectionTypeName = 'certifications';
  const titleHeader = 'Your Certifications';
  const enabledCategories = { CERTIFICATIONS: true };
  const videoUrl = 'https://fast.wistia.net/embed/iframe/owet1h3scu';
  return (
    <ExperiencePage
      params={params}
      sectionTypeName={sectionTypeName}
      titleHeader={titleHeader}
      enabledCategories={enabledCategories}
      videoUrl={videoUrl}
    />
  );
};

export default Certification;
