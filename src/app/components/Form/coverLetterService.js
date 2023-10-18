/* eslint-disable no-restricted-syntax */
import axiosInstance from '../../utils/axiosInstance';

const fakeData = {
  data: 'I am writing to express my interest in the job position of [Job Title] at [Company]. After reviewing the job description, I am confident that my skills and experiences make me a strong candidate for this role.First and foremost, I would like to highlight my experience in [relevant experience]. In my previous role at [Previous Company], I was responsible for [specific responsibilities]. This experience has equipped me with a deep understanding of [specific skills or knowledge] and has honed my ability to [specific action or achievement]. I believe that these skills will directly translate to success in the [Job Title] position at [Company].Furthermore, I am proud to have developed a strong proficiency in [specific software or tools] throughout my career. In my previous roles, I consistently utilized [specific software or tools] to streamline processes, improve efficiency, and drive results. I am confident that my expertise in [specific software or tools] will enable me to quickly adapt and excel in the technology-driven environment at [Company].Additionally, I have a proven track record of [specific achievement or accomplishment]. For instance, in my previous role, I successfully [specific achievement or accomplishment], which resulted in [positive outcome or impact]. This experience has taught me the importance of [specific skill or value], and I am eager to apply this knowledge to contribute to the success of [Company].Moreover, I am a highly motivated and proactive individual who thrives in fast-paced environments. I am known for my strong problem-solving skills and my ability to effectively collaborate with cross-functional teams. I am confident that my strong work ethic and my ability to adapt to new challenges will make me a valuable asset to the team at [Company].Thank you for considering my application. I am excited about the opportunity to contribute to the success of [Company] and I am confident that my skills and experiences align perfectly with the requirements of the [Job',
};

export const createCoverLetter = async (userId, contactData) => {
  try {
    const queryString = convertContactDataToQueryString(contactData);

    // const response = await axiosInstance.post(`/chat-gpt/cover-letter?${queryString}`, {
    //   timeout: 20000,
    // });
    const response1 = await axiosInstance.post(
      'https://api-cvbuilder.monoinfinity.net/api/v1/chat-gpt/cover-letter?temperature=0.2&company=1&title=1&cvId=1&dear=1&name=1&description=1',
      {
        timeout: 20000,
      },
    );

    console.log('createCoverLetter:response ', response);
    return fakeData;
    // return response.data;
  } catch (error) {
    throw error;
  }
};
const convertContactDataToQueryString = contactData => {
  const queryStringParams = [];

  for (const [key, value] of Object.entries(contactData)) {
    queryStringParams.push(`${key}=${encodeURIComponent(value)}`);
  }

  return queryStringParams.join('&');
};
