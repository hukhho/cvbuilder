import React, { useState } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'CONTACT', link: 'contact' },
  { name: 'CONTENT', link: 'content' },
  { name: 'FINISH UP', link: 'finishup' },
];

const UserCoverLetterBuilderHeader = ({
  coverLetterId,
  initialEnabledCategories,
  jobIdParam,
  isApplyProcess,
  coverLetterTitle,
}) => {
  const [enabledCategories, setEnabledCategories] = useState(initialEnabledCategories);

  const link = `?jobId=${jobIdParam}&isApplyProcess=${isApplyProcess}`;

  return (
    <div className="flex items-center space-x-6 ">
      <div className="flex items-center">
        <div className="pr-[5.75px] pt-[4.76px] pb-[5.33px] bg-neutral-500 bg-opacity-10 rounded-[3.15px] justify-start items-start inline-flex">
          <div
            className="text-neutral-600 text-xs font-bold uppercase leading-3 truncate ..."
            style={{
              maxWidth: '400px',
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
            {coverLetterTitle}
          </div>
        </div>
      </div>

      {categories.map(category => (
        <Link
          key={category.name}
          href={
            jobIdParam
              ? `/cover-letter/${coverLetterId}/${category.link}${link}`
              : `/cover-letter/${coverLetterId}/${category.link}`
          } // Use the custom link here
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
  );
};

export default UserCoverLetterBuilderHeader;
