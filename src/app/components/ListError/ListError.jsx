import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
  faCaretDown,
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

const ListError = ({ errors }) => {
  console.log('ListError errors: ', errors);

  const [isShow, setIsShow] = useState(true);
  const handleDownButton = () => {
    setIsShow(!isShow);
  };

  const countPass = errors.filter(error => error.status === 'Pass').length;

  return (
    <section
      id="react-collapsed-panel-:r0:"
      aria-hidden="false"
      style={{ maxWidth: '280px', boxSizing: 'border-box' }}
    >
      <div className="mt-4">
        <div>
          {errors
            .filter(error => error.status === 'Error')
            .map((error, index) => (
              <div
                key={index}
                className="flex justify-between pt-2 pb-2.5 border-b border-gray-200 max-w-[280px]"
              >
                <div className="text-sm leading-7 mr-2.5">
                  <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#B91C1C' }} />
                </div>
                <div className="w-full justify-start" style={{ textAlign: 'left' }}>
                  <h6 className="text-gray-600 text-sm align-baseline inline-block m-0 font-normal">
                    {error.title}
                  </h6>
                  <p className="text-gray-600 text-xs leading-4 m-0">{error.result}</p>
                </div>
                <div className="pl-2 font-semibold min-w-[15px]">
                  <span className="text-red-700">1</span>
                </div>
              </div>
            ))}
          {errors
            .filter(error => error.status === 'Warning')
            .map((error, index) => (
              <div
                key={index}
                className="flex justify-between pt-2 pb-2.5 border-b border-gray-200 max-w-[280px]"
              >
                <div className="text-sm leading-7 mr-2.5">
                  <FontAwesomeIcon icon={faExclamationCircle} style={{ color: '#ffa726' }} />
                </div>
                <div className="w-full justify-start" style={{ textAlign: 'left' }}>
                  <h6 className="text-gray-600 text-sm align-baseline inline-block m-0 font-normal">
                    {error.title}
                  </h6>
                  <p className="text-gray-600 text-xs leading-4 m-0">{error.result}</p>
                </div>
                <div className="pl-2 font-semibold min-w-[15px]">
                  <span className="text-orange-400">1</span>
                </div>
              </div>
            ))}

          <div>
            <span
              className="text-teal-400 block font-bold mt-2.5"
              style={{ fontSize: '16px', textAlign: 'left' }}
            >
              {countPass} best practices applied
              <button>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={isShow ? 'transform -rotate-90' : 'transform rotate-0'}
                  style={{ color: '#2DD4BF', marginLeft: '10px' }}
                  onClick={handleDownButton}
                />
              </button>
            </span>
            {isShow && (
              <div
                id="react-collapsed-panel-:r1:"
                aria-hidden="false"
                style={{ boxSizing: 'border-box' }}
              >
                {errors
                  .filter(error => error.status === 'Pass')
                  .map((error, index) => (
                    <div
                      key={index}
                      className="flex justify-between pt-2 pb-2.5 border-b border-gray-200 max-w-[280px]"
                    >
                      <div className="text-sm leading-7 mr-2.5">
                        <i className="fas fa-check-circle text-teal-400" aria-hidden="true" />
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#38A169' }} />
                      </div>
                      <div className="w-full" style={{ textAlign: 'left' }}>
                        <h6 className="text-gray-600 text-sm align-baseline inline-block m-0 font-normal">
                          {error.title}
                        </h6>
                        <p className="text-gray-600 text-xs leading-4 m-0">{error.result}</p>
                      </div>
                      <div className="pl-2 font-semibold min-w-[15px]">
                        <span className="text-teal-400">1</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListError;
