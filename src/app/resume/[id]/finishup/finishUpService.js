// finishUpService.js
import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../../utils/axiosInstance';
import { mockData } from './mockData';
import { notification } from 'antd';
import './gen.css';

export const getFinishUp = async cvId => {
  try {
    const response = await axiosInstance.get(`/user/cv/${cvId}/finish-up`);
    return response.data;
    // return {
    //   sharable: false,
    //   searchable: false,
    //   email: 'cvbuildercandidate@gmail.com',
    //   personalWebsite: null,
    //   phone: '0888888888',
    //   name: 'Pham Viet Thuan Thien',
    //   resumeName: 'Thien Pham - Software Engineer',
    //   companyName: '',
    //   jobTitle: '',
    //   fieldOrDomain: null,
    //   jobDescription: '',
    //   experience: null,
    //   linkin: null,
    //   city: null,
    //   id: 10,
    //   content: null,
    //   summary: null,
    //   theOrder: {
    //     summary: 1,
    //     experiences: 2,
    //     educations: 3,
    //     projects: 4,
    //     certifications: 5,
    //     involvements: 6,
    //     skills: 7,
    //   },
    //   status: 'ACTIVE',
    //   templateType: 'classical',
    //   cvStyle: {
    //     fontSize: '9pt',
    //     lineHeight: 1.4,
    //     fontFamily: 'Merriweather',
    //     fontWeight: 'normal',
    //     zoom: '130%',
    //     paperSize: 'letter',
    //     hasDivider: true,
    //     hasIndent: false,
    //     fontColor: 'rgb(0, 0, 0)',
    //   },
    //   skills: [],
    //   certifications: [],
    //   educations: [],
    //   experiences: [
    //     {
    //       id: 11,
    //       theOrder: 1,
    //       isDisplay: true,
    //       duration: 'June 2023 - Present',
    //       location: null,
    //       companyName: 'FPT Software',
    //       role: 'Software Engineer (Associate)',
    //       description:
    //         '• Led the development of a service that provides automated pen-testing to internal front-office facing teams while managing and mentoring 3 pen-testers (Python, Java Spring Boot, Angular JS, OracleDB).\n• Developed a web application that orchestrates vendor vulnerability scanners to scan over 100,000 cloud and hardware infrastructure within the firm, while also providing metrics via an API and  UI (Java, Spring Boot, Angular JS, OracleDB).\n• Led the analyst peer mentoring committee for Jersey City by conducting event planning, budget analysis, mentor and mentee pairing, and mentor training for over 200 analysts.',
    //     },
    //     {
    //       id: 12,
    //       theOrder: 2,
    //       isDisplay: false,
    //       duration: 'July 2022 - April 2023',
    //       location: null,
    //       companyName: 'NashTech',
    //       role: 'Corporate Technology Analyst Intern',
    //       description:
    //         "• Increased the firm's technology risk oversight by 60% with the development and integration of new infrastructure scanners into the risk reporting engine (C#, T-SQL).\n• Automated 75% of the manual QA testing by developing a new UI test tool for the risk dashboard (Python, Selenium).\n• Improved satisfaction rating by 50% by building documentation and training for the risk dashboard.",
    //     },
    //     {
    //       id: 13,
    //       theOrder: 3,
    //       isDisplay: true,
    //       duration: 'June 2022 - December 2022',
    //       location: null,
    //       companyName: 'MoMo',
    //       role: 'Data Analyst Intern',
    //       description:
    //         '• 123 Led the <comment id="comment_type_experience_id_1_desId_type-experience-dataId-1_1704186313759" class="select-none comment-marker" content="oke">development</comment> of a service that provides automated pen-testing to internal front-office facing teams while managing and mentoring 3 pen-testers (Python, Java Spring Boot, Angular JS, OracleDB).\n• Developed a web application that orchestrates vendor vulnerability scanners to scan over 100,000 cloud and hardware infrastructure within the firm, while also providing metrics via an API and  UI (Java, Spring Boot, Angular JS, OracleDB).\n• Led the analyst peer mentoring committee for Jersey City by conducting event planning, budget analysis, mentor and mentee pairing, and mentor training for over 200 analysts.',
    //     },
    //     {
    //       id: 14,
    //       theOrder: 4,
    //       isDisplay: true,
    //       duration: 'June 2021 - July 2022',
    //       location: null,
    //       companyName: 'NAB Innovation Centre Vietnam',
    //       role: 'Assistant Lab Supervisor',
    //       description:
    //         '• Supervised 60 consultants on campus, led onsite training, and conducted employee recruitment.\n• Created a staff dashboard that serviced over 350 computer lab employees by providing specific tools and metrics based on their lab location (HTML/CSS, JS).\n• Increased the accuracy of recording the student capacity in each lab by 95% with a script that utilized API services to track computer usage and location (Python, Google Script).',
    //     },
    //   ],
    //   involvements: [],
    //   projects: [],
    //   sourceWorks: [],
    //   customSections: [
    //     {
    //       sectionName: 'Custom Section',
    //       sectionData: [
    //         {
    //           id: 1,
    //           theOrder: 1,
    //           isDisplay: false,
    //           duration: 'July 2022 - April 2023',
    //           location: null,
    //           subTitle: 'sub title',
    //           title: 'Custom Title',
    //           description: 'Custom',
    //         },
    //         {
    //           id: 2,
    //           theOrder: 2,
    //           isDisplay: true,
    //           duration: 'July 2022 - April 2023',
    //           location: 'Thu Duc',
    //           subTitle: 'sub title 2',
    //           title: 'Custom Title 2',
    //           description: 'Custom 2',
    //         },
    //         {
    //           id: 3,
    //           theOrder: 3,
    //           isDisplay: true,
    //           duration: 'July 2022 - April 2023',
    //           location: 'Thu Duc',
    //           subTitle: 'sub title 5',
    //           title: 'Custom Title 5',
    //           description: 'Custom 5',
    //         },
    //       ],
    //     },
    //     {
    //       sectionName: 'Custom Section 2',
    //       sectionData: [
    //         {
    //           id: 1,
    //           theOrder: 1,
    //           isDisplay: false,
    //           duration: 'July 2022 - April 2023',
    //           location: null,
    //           subTitle: 'sub title 3',
    //           title: 'Custom Title 3',
    //           description: 'Custom 3',
    //         },
    //         {
    //           id: 2,
    //           theOrder: 2,
    //           isDisplay: true,
    //           duration: 'July 2022 - April 2023',
    //           location: 'Thu Duc',
    //           subTitle: 'sub title 4',
    //           title: 'Custom Title 4',
    //           description: 'Custom 4',
    //         },
    //       ],
    //     },
    //   ],
    // };
  } catch (error) {
    throw error;
  }
};
export const getAts = async cvId => {
  try {
    const response = await axiosInstance.get(`/users/cv/${cvId}/job-description/ats`);
    return response.data;
    // return {
    //   title: 'Associate Product Manager',
    //   description:
    //     'Gather, analyze and create high-level requirements\nParticipate in the product prototyping process, interface mock-up, wireframe, and GUI creation in an Agile environment\nAnalyze market trends and perform competitor analysis\nShare the business value to the development team, so they understand the intent behind the new feature, release, or product\nWork with the assigned Product Managers to define the product roadmap and vision\nPrioritize features by ranking them against the strategic goals and initiatives to make sure the delivery of the product, including managing dependencies in and across releases to complete release phases and milestones\nCoordinating all of the activities required to bring the product to market. This involves bridging gaps between different functions within the company and aligning all of the teams involved (e.g: Marketing, Sales & Sucess, Customer Support, others)\nDetermine which ideas should be promoted into features to push the product strategy forward\nEnsure that feedback and requests are seamlessly integrated into the product planning and development processes\nAt least 1 year of experience in Product Owner, IT Business Analyst, Product Executive or similar roles\nPossess Agile and Scrum practices\nGood presentation and stakeholder management\nAdvanced English and aptitude for learning and understanding new and emerging technologies\nBe familiar with requirement specification techniques: user story, modeling, prototyping.\nPossess great knowledge about requirement elicitation/management\nGood organizational, analytical, as well as oral, and written communication skills',
    //   ats: [
    //     {
    //       ats: 'Product Owner',
    //       status: 'Pass',
    //     },
    //     {
    //       ats: 'Product Manager',
    //       status: 'Pass',
    //     },
    //     {
    //       ats: 'Analyze',
    //       status: 'Pass',
    //     },
    //     {
    //       ats: 'High-level requirements',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Product prototyping',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Agile environment',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Market trends',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Competitor analysis',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Business value',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Product roadmap',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Vision',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Prioritize features',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Strategic goals',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Dependencies',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Product strategy',
    //       status: 'Warning',
    //     },
    //     {
    //       ats: 'Requirement specification techniques',
    //       status: 'Warning',
    //     },
    //   ],
    // };
    // return mockData.data.resume;
  } catch (error) {
    throw error;
  }
};
export const getReview = async cvId => {
  try {
    const response = await axiosInstance.post(`/chat-gpt/cv/${cvId}/review?temperature=0.5`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getVersionsList = async cvId => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}/histories`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVersion = async versionId => {
  try {
    const response = await axiosInstance.get(`/user/cv/history/${versionId}`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const restoreVersion = async (cvId, versionId) => {
  try {
    const response = await axiosInstance.post(`/cv/${cvId}/parse/${versionId}`);
    // return mockData.data.resume;
    // notification.success({
    //   message: 'Restore version successfully',
    // });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAudit = async cvId => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.get(`/user/${userId}/cv/${cvId}/evaluate`);
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const syncUp = async cvId => {
  try {
    const response = await axiosInstance.get(`/cv/synchUp/${cvId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveCv = async (cvId, resumeData) => {
  try {
    const userId = getUserIdFromLocalStorage();

    const response = await axiosInstance.put(`/user/${userId}/cv/${cvId}/cv-body`, resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
