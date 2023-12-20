'use client';

import Link from 'next/link';
import Image from 'next/image';
import '../styles/login.module.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './login.css';
import '@/app/styles/card.css';
import { LoginButton } from '../components/Button/LoginButton';
import { useState } from 'react';
import { Select } from 'antd';

const Login = () => {
  const [value, setValue] = useState('CANDIDATE');
  const handleChange = data => {
    setValue(data);
    console.log(`selected ${data}`);
  };
  return (
    <div className="column-wrapper">
      <main className="content">
        <div>
          <a className="flex absolute logoWrapper" href="/" aria-label="Logo">
            {/* <Image src="/images/CVbuilder-05.png" width={100} height={80} /> */}
          </a>
          <div className="auth-box" style={{ marginTop: '100px' }}>
            <div className="form card">
              <div className="">
                {value === 'CANDIDATE' && (
                  <>
                    <h1 className="heading">Continue with CANDIDATE </h1>
                    <div className="social mt-8">
                      <LoginButton roleName="CANDIDATE" />
                    </div>
                  </>
                )}

                {value === 'HR' && (
                  <>
                    <h1 className="heading">Continue with HR </h1>
                    <div className="social mt-8">
                      <LoginButton roleName="HR" />
                    </div>
                  </>
                )}
                {value === 'EXPERT' && (
                  <>
                    <h1 className="heading">Continue with EXPERT </h1>
                    <div className="social mt-8">
                      <LoginButton roleName="EXPERT" />
                    </div>
                  </>
                )}
                {value === 'ADMIN' && (
                  <>
                    <h1 className="heading">Continue with ADMIN </h1>
                    <div className="social mt-8">
                      <LoginButton roleName="ADMIN" />
                    </div>
                  </>
                )}

                <Select
                  defaultValue="CANDIDATE"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'CANDIDATE',
                      label: 'CANDIDATE',
                    },
                    {
                      value: 'HR',
                      label: 'HR',
                    },
                    {
                      value: 'EXPERT',
                      label: 'EXPERT',
                    },
                    {
                      value: 'ADMIN',
                      label: 'ADMIN',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div />
      </main>
    </div>
  );
};

export default Login;
