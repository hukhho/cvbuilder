/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getContact from '../resume/[id]/contact/contactService';
import { getResumesCvs } from '../utils/indexService';
import useStore from '@/store/store';

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
];

const UserCVBuilderHeader = ({ initialEnabledCategories, cvId }) => {
  const [enabledCategories, setEnabledCategories] = useState(initialEnabledCategories);
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

  const { resumes, refreshResumes } = useStore();
  let isMounted = true;
  useEffect(() => {
    isMounted = true;
    if (!isMounted) {
      return;
    }
    if (resumes.length === 0) {
      refreshResumes();
    }
    return () => {
      isMounted = false;
    };
  }, []); // Dependency array should include cvId.
  console.log('resumes: ', resumes);

  const resumeName = resumes.find(resume => resume.id == cvId)?.resumeName;
  console.log('resumeName: ', resumeName);
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

      <div className="flex items-center space-x-4">
        {categories.map(category => (
          <Link
            key={category.name}
            href={`/resume/${cvId}/${category.link}`} // Use the custom link here
          >
            <div
              className={`text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap ${
                enabledCategories[category.name] ? 'bg-indigo-500 text-white' : 'text-neutral-600'
              } cursor-pointer rounded-[3.15px] p-[4.76px] pl-[6.28px] pr-[5.80px] pt-[4.76px] pb-[5.33px]'`}
              style={{
                fontSize: '11.2px',
                lineHeight: '11.2px',
                textAlign: 'left',
                letterSpacing: 'normal',
              }}
            >
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserCVBuilderHeader;
