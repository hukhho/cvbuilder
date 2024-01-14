/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getContact from '../resume/[id]/contact/contactService';
import { getResumesCvs } from '../utils/indexService';
import useStore from '@/store/store';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { set } from 'lodash';

// Define the categories outside of the component.
const categories = [
  { name: 'CONTACT', link: 'contact' },
  { name: 'EXPERIENCE', link: 'experience' },
  { name: 'PROJECT', link: 'project' },
  { name: 'EDUCATION', link: 'education' },
  { name: 'CERTIFICATIONS', link: 'certification' },
  { name: 'INVOLVEMENT', link: 'involvement' },
  { name: 'SKILLS', link: 'skill' },
  { name: 'SUMMARY', link: 'summary' },
  { name: 'FINISH UP', link: 'finishup' },
  // { name: 'CUSTOM SECTION 1', link: 'customSection1' },
];
const { confirm } = Modal;

const UserCVBuilderHeader = ({
  isCatchOut = false,
  initialEnabledCategories,
  cvId,
  sectionTypeName = null,
}) => {
  const [enabledCategories, setEnabledCategories] = useState(initialEnabledCategories);
  const [enabledCategoriesForSection, setEnabledCategoriesForSection] = useState();

  // const [data, setData] = useState();

  // const fetchData = async () => {
  //   try {
  //     const fetchedData = await getResumesCvs();
  //     setData(fetchedData);
  //     console.log('fetchedData', fetchedData);
  //   } catch (error) {
  //     console.error('There was an error fetching the data', error);
  //   }
  // };

  const { resumes, refreshResumes, finishUpData, refreshFinishUpData } = useStore();
  let isMounted = true;
  useEffect(() => {
    isMounted = true;
    if (!isMounted) {
      return;
    }
    const findResumeId = finishUpData.find(resume => resume.id == parseInt(cvId, 10));
    console.log('findResumeId: ', findResumeId);
    if (resumes.length === 0) {
      refreshResumes();

      // for (let i = 0; i < resumes.length; i++) {
      //   if (resumes[i].id == cvId) {
      //     refreshFinishUpData(cvId);
      //   }
      // }

      refreshFinishUpData(cvId);
    }
    return () => {
      isMounted = false;
    };
  }, []); // Dependency array should include cvId.
  console.log('resumes: ', resumes);
  // console.log('finishUpDataOfHeader', finishUpData);
  // console.log('finishUpDataOfHeader', finishUpData)
  const resumeName = resumes.find(resume => resume.id == cvId)?.resumeName;
  // console.log('finishUpDataOfHeader', finishUpData)

  finishUpData.forEach(resume => {
    if (resume.id == cvId) {
      console.log('finishUpDataHead: ', resume);

      resume?.customSections?.map((section, index) => {
        console.log('sectionindex: ', index);
        const link = `customSection${index + 1}`;
        //only push if not exist
        if (!categories.find(category => category.link === link)) {
          categories.push({ name: section?.sectionName, link: link });
        }
      });
    }
  });
  if (sectionTypeName) {
    const find = categories.find(category => category.link === sectionTypeName);
    console.log('find: ', find);
    if (!enabledCategoriesForSection) {
      setEnabledCategoriesForSection({ [find?.name]: true });
    }
  }

  console.log('resumeName: ', resumeName);
  const router = useRouter();
  const confirmFinish = async category => {
    try {
      router.push(`/resume/${cvId}/${category.link}`);
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const showPromiseConfirm = category => {
    confirm({
      title: 'If you leave page not save you will loss your change?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, you will loss your change',
      async onOk() {
        await confirmFinish(category);
      },
      onCancel() {},
    });
  };

  const handleLinkClick = async (event, category) => {
    if (isCatchOut && hasUnsavedChanges()) {
      // Prevent the default link behavior
      event.preventDefault();
      // Display confirmation modal
      await showPromiseConfirm(category);
    }
    // Continue with navigation if there are no unsaved changes
  };

  const hasUnsavedChanges = () => {
    // Implement the logic to check for unsaved changes
    // For example, compare the current state with the initial state
    // and return true if changes are detected, false otherwise.
    // You might need to track changes in your state or any other relevant data.
    return true; // Placeholder, replace with actual logic
  };

  return (
    <div className="w-[1255px] h-[25px] relative flex space-x-8">
      <div className="flex items-center">
        <div className="pl-[6.28px] pr-[5.75px] pt-[4.76px] pb-[5.33px] bg-neutral-500 bg-opacity-10 rounded-[3.15px] justify-start items-start inline-flex">
          <div
            className="text-neutral-600 text-xs font-bold uppercase leading-3 truncate ..."
            style={{
              maxWidth: '200px',
              fontFamily: '"Source Sans Pro", sans-serif',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontSize: '11.2px',
              lineHeight: '11.2px',
              textAlign: 'left',
              letterSpacing: 'normal',
            }}
          >
            {resumeName}
          </div>
        </div>
      </div>
      {!sectionTypeName && (
        <div className="flex items-center space-x-4">
          {categories?.map(category => (
            <Link
              key={category?.name}
              href={`/resume/${cvId}/${category?.link}`} // Use the custom link here
            >
              <div
                onClick={event => handleLinkClick(event, category)}
                className={`text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap ${
                  enabledCategories[category?.name]
                    ? 'bg-indigo-500 text-white'
                    : 'text-neutral-600'
                } cursor-pointer rounded-[3.15px] p-[4.76px] pl-[6.28px] pr-[5.80px] pt-[4.76px] pb-[5.33px]'`}
                style={{
                  fontSize: '11.2px',
                  lineHeight: '11.2px',
                  textAlign: 'left',
                  letterSpacing: 'normal',
                }}
              >
                {category?.name}
              </div>
            </Link>
          ))}
        </div>
      )}
      {sectionTypeName && (
        <div className="flex items-center space-x-4">
          {categories?.map(category => (
            <Link key={category?.name} href={`/resume/${cvId}/${category?.link}`}>
              <div
                onClick={event => handleLinkClick(event, category)}
                className={`text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap ${
                  enabledCategoriesForSection?.[category?.name]
                    ? 'bg-indigo-500 text-white'
                    : 'text-neutral-600'
                } cursor-pointer rounded-[3.15px] p-[4.76px] pl-[6.28px] pr-[5.80px] pt-[4.76px] pb-[5.33px]'`}
                style={{
                  fontSize: '11.2px',
                  lineHeight: '11.2px',
                  textAlign: 'left',
                  letterSpacing: 'normal',
                }}
              >
                {category?.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCVBuilderHeader;
