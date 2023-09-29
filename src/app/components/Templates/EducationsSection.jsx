import { Divider, Radio, Typography } from 'antd';
import './CVTemplates.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import StandardItem from './StandardItem';

const EducationsSection = ({ educations }) => {
  return (
    <div className="educations-section-container">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Educations
        </Typography.Title>
        <Divider />
        <div className="education-items">
          {educations.map(exp => {
            const { degree, collegeName, location, gpa, startDate, endDate } = exp;
            return (
              <StandardItem key={exp.id} title={degree} location={location} startTime={startDate} endTime={endDate} orgName={collegeName} renderRightSubtitle />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EducationsSection;
