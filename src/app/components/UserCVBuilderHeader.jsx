import React, { useState } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'CONTACT', link: 'contact' },
  { name: 'EXPERIENCE', link: 'experience' },
  { name: 'PROJECT', link: 'project' },
  { name: 'EDUCATION', link: 'education' },
  { name: 'CERTIFICATIONS', link: 'certification' },
  { name: 'COURSEWORK', link: 'coursework' },
  { name: 'INVOLVEMENT', link: 'involvement' },
  { name: 'SKILLS', link: 'skill' },
  { name: 'SUMMARY', link: 'summary' },
  { name: 'FINISH UP', link: 'finishup' },
  { name: 'AI COVER LETTER', link: 'ai-cover-letter' },
];

const UserCVBuilderHeader = ({ initialEnabledCategories, cvId }) => {
  const [enabledCategories, setEnabledCategories] = useState(initialEnabledCategories);

  console.log('cvId: ', cvId);
  console.log('initialEnabledCategories: ', initialEnabledCategories);

  return (
    <div className="w-[1267.01px] h-[28.80px] relative flex space-x-8">
      <div className="flex items-center">
        <div className="w-[150px] h-[23.09px] pl-[6.28px] pr-[5.75px] pt-[4.76px] pb-[5.33px] bg-neutral-500 bg-opacity-10 rounded-[3.15px] justify-start items-start inline-flex">
          <div
            className="text-neutral-600 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3"
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            Pham Viet Thuan Thien - CV
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {categories.map(category => (
          <Link
            key={category.name}
            href={`/resume/${cvId}/${category.link}`} // Use the custom link here
          >
            <div
              className={`text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap ${
                enabledCategories[category.name] ? 'bg-indigo-500 text-white' : 'text-neutral-600'
              } cursor-pointer rounded-[3.15px] p-[4.76px] pl-[6.28px] pr-[5.80px] pt-[4.76px] pb-[5.33px]'`}
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
