// finishUpService.js
import { getUserIdFromLocalStorage } from '@/app/utils/indexService';
import axiosInstance from '../../../utils/axiosInstance';
import { mockData } from './mockData';

export const getFinishUp = async cvId => {
  try {
    // const response = await axiosInstance.get(`/user/cv/${cvId}/finish-up`);
    return mockData.data.resume;
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewResponse = async requestId => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.get(
      `/cv/expert/${userId}/review-request/${requestId}/review-response`,
    );
    return response.data;
    // return {
    //   id: 12,
    //   overall: null,
    //   feedbackDetail: {
    //     templateType: 'classical',
    //     cvStyle: {
    //       fontSize: '9pt',
    //       lineHeight: 1.4,
    //       fontFamily: 'Merriweather',
    //       fontWeight: 'normal',
    //       zoom: '130%',
    //       paperSize: 'letter',
    //       hasDivider: true,
    //       hasIndent: false,
    //       fontColor: 'rgb(0, 0, 0)',
    //     },
    //     name: 'Le Van Cuong',
    //     address: 'Ho Chi Minh City',
    //     phone: '0888888888',
    //     personalWebsite: 'http://mywebsite.com',
    //     email: 'cvbuildercandidate@gmail.com',
    //     linkin: 'in/cv',
    //     summary: 'Product Owner',
    //     theOrder: {
    //       summary: 3,
    //       experiences: 1,
    //       educations: 2,
    //       projects: 4,
    //       certifications: 5,
    //       involvements: 6,
    //       skills: 7
    //   },
    //     skills: [
    //       {
    //         id: 1,
    //         theOrder: 1,
    //         isDisplay: true,
    //         description: 'Java, JVM',
    //       },
    //       {
    //         id: 2,
    //         theOrder: 2,
    //         isDisplay: true,
    //         description: 'Java Core, Spring Frameworks',
    //       },
    //     ],
    //     certifications: [
    //       {
    //         isDisplay: true,
    //         id: 1,
    //         theOrder: 1,
    //         name: 'Project Management',
    //         certificateSource: 'Project Management Institute',
    //         endYear: 2023,
    //         certificateRelevance: '• Certified',
    //       },
    //     ],
    //     educations: [
    //       {
    //         id: 1,
    //         isDisplay: true,
    //         theOrder: 1,
    //         location: 'New York, NY',
    //         degree: 'Bachelors of Science, Computer Science',
    //         collegeName: 'New York University',
    //         minor: 'SE',
    //         gpa: 3.3,
    //         description: '• Award full',
    //         endYear: 2017,
    //       },
    //     ],
    //     experiences: [
    //       {
    //         id: 2,
    //         theOrder: 1,
    //         isDisplay: true,
    //         duration: 'February 2023 - December 2023',
    //         location: 'Ho Chi Minh City',
    //         companyName: 'Google',
    //         role: 'Java Developer',
    //         description:
    //           '• Experience with develop API for backend in Java\n• Experience in JVM/Kotlin',
    //       },
    //       {
    //         id: 3,
    //         theOrder: 2,
    //         isDisplay: true,
    //         duration: 'June 2020 - Present',
    //         location: 'New York, NY',
    //         companyName: 'Company A',
    //         role: 'Software Engineer (Associate)',
    //         description:
    //           '• Led the development of a service that provides automated pen-testing to internal front-office facing teams while managing and mentoring 3 pen-testers (Python, Java Spring Boot, Angular JS, OracleDB).\nDeveloped a web application that orchestrates vendor vulnerability scanners to scan over 100,000 cloud and hardware infrastructure within the firm, while also providing metrics via an API and  UI (Java, Spring Boot, Angular JS, OracleDB).\nLed the analyst peer mentoring committee for Jersey City by conducting event planning, budget analysis, mentor and mentee pairing, and mentor training for over 200 analysts.',
    //       },
    //     ],
    //     involvements: [
    //       {
    //         id: 1,
    //         theOrder: 1,
    //         isDisplay: true,
    //         duration: 'February 2023 - Present',
    //         college: 'FPT University, Ho Chi Minh City',
    //         description: '• Implemented',
    //         organizationRole: 'Selected Member',
    //         organizationName: 'Economics Students',
    //       },
    //     ],
    //     projects: [
    //       {
    //         id: 1,
    //         theOrder: 1,
    //         isDisplay: true,
    //         duration: 'June 2018 - January 2019',
    //         title: 'R.Exposed',
    //         description:
    //           '• Increased security awareness of public code repositories with a monitoring service that scanned and reported 2,500+ PII and sensitive data in public code repositories such as Github and Bitbucket (Python, PostgreSQL).\nSent over 100+ emails to repository owners to notify them of potentially sensitive data breaches in their codebase.',
    //         organization: 'Founder',
    //         projectUrl: 'https://exposed.com',
    //       },
    //     ],
    //     sourceWorks: null,
    //   },
    //   score: null,
    //   comment: null,
    //   dateComment: null,
    //   request: {
    //     id: 20,
    //     resumeName: 'Thien Pham - Product Manager',
    //     avatar:
    //       'https://firebasestorage.googleapis.com/v0/b/cvbuilder-dc116.appspot.com/o/81142b48-d53c-49b8-b393-f321edf58756.jpeg?alt=media&token=81142b48-d53c-49b8-b393-f321edf58756.jpeg',
    //     name: 'Pham Viet Thuan Thien',
    //     note: '123',
    //     price: 200000,
    //     status: 'Waiting',
    //     receivedDate: '2023-12-20T19:34:44.961+00:00',
    //     deadline: '2023-12-22T19:34:44.961+00:00',
    //   },
    //   user: {
    //     id: 2,
    //     name: 'Pham Viet Thuan Thien',
    //     avatar:
    //       'https://firebasestorage.googleapis.com/v0/b/cvbuilder-dc116.appspot.com/o/81142b48-d53c-49b8-b393-f321edf58756.jpeg?alt=media&token=81142b48-d53c-49b8-b393-f321edf58756.jpeg',
    //   },
    // };
  } catch (error) {
    throw error;
  }
};

export const updateReviewResponse = async (responseId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(
      `/cv/expert/${userId}/review-response/${responseId}/overall`,
      data,
    );
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateReviewResponsePublic = async (responseId, data) => {
  try {
    const userId = getUserIdFromLocalStorage();
    const response = await axiosInstance.put(
      `/cv/expert/${userId}/review-response/${responseId}/public`,
      data,
    );
    // return mockData.data.resume;
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAudit = async cvId => {
  try {
    // const response = await axiosInstance.get(`/user/1/cv/${cvId}/evaluate`);
    return mockData.data.resume;
    // return response.data;
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
