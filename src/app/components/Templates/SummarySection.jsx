import { Divider, Radio, Typography } from 'antd';
import './CVTemplates.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import DraggableItem from '../DraggableItem';
import DragHandleIcon from './DragHandleIcon';

const SummarySection = ({ summary }) => {
  return (
    <div className="summary-section-container">
      <DraggableItem id="summary-section" index={0} moveItem={() => {}}>
        <div className="drag-handle">
          <DragHandleIcon />
        </div>
        <div className="title">
          <Typography.Title level={2} style={{ margin: 0 }}>
            Summary
          </Typography.Title>
          <Divider />
        </div>
      </DraggableItem>
    </div>
  );
};

export default SummarySection;
