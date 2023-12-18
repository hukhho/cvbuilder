import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import DataService from '@/app/utils/dataService';
import updateContact from './updateContactService';

import './customtext.css';
import ButtonContact from './ButtonContact';
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { updateExpertConfig } from '@/app/expert/expertServices';
import { updateHrConfig } from '@/app/hr/hrServices';
import { getCookieToken } from '@/app/utils/indexService';
import { format, parse } from 'date-fns';

const HrSub = ({ data }) => {
  const dateStr = data?.expiredDay;
  let parsedStartDate = null;
  let formattedDate = null;

  try {
    parsedStartDate = parse(dateStr, 'yyyy-MM-dd', new Date());
    formattedDate = format(parsedStartDate, 'do MMMM yyyy');
  } catch (error) {
    console.log('error: ', error);
  }

  return (
    <div className="mt-16" style={{ width: '800px' }}>
      <Card>
        <Title>Your subscription</Title>
        <p>
          Your subscription will end in {formattedDate}. After that we will automatically extend
          your subscription
        </p>
      </Card>
    </div>
  );
};

export default HrSub;
