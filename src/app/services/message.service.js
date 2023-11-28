import { callExternalApi } from './external-api.service';
import axiosInstanceAuth from '@/app/utils/axiosInstanceAuth';

const apiServerUrl = 'http://localhost:8080';

export const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getProtectedResource = async accessToken => {
  // const config = {
  //   url: `${apiServerUrl}/api/messages/protected`,
  //   method: 'GET',
  //   headers: {
  //     'content-type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // };

  // const { data, error } = await callExternalApi({ config });
  try {
    const response = await axiosInstanceAuth.get('/api/messages/protected123');
    return {
      data: response.data || null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export const getAdminResource = async accessToken => {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
