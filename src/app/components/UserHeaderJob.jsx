import React, { useState } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'OPPORTUNITIES', link: 'job/list' },
  { name: 'MY APPLICATION', link: 'job/my-application' },
];

const UserHeaderJob = ({ initialEnabledCategories }) => {
  const [enabledCategories, setEnabledCategories] = useState(initialEnabledCategories);

  return (
    <div className="flex items-center space-x-6  mt-10 ml-5">
      {categories.map(category => (
        <Link
          key={category.name}
          href={`/${category.link}`} // Use the custom link here
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

export default UserHeaderJob;
