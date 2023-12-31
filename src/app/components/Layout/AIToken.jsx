import React, { useEffect, useState } from 'react';

export default function AiToken({ numberToken }) {
  return (
    <button>
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <div>
          <span>AI credits </span>
        </div>
        <div>
          {numberToken} <i className="fa-nzx fa-c1i" />
        </div>
      </div>
    </button>
  );
}
