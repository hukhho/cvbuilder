// "use client"

// import axios from 'axios';
// import mammoth from 'mammoth';
// import React, { useState, useEffect } from "react";

// function DocxPreview() {
//   const [previewContent, setPreviewContent] = React.useState("");

//   React.useEffect(() => {
//     async function fetchDocx() {
//       // Fetch the DOCX file from your Spring Boot application
//       const response = await axios.get('http://localhost:8080/api/cv/', { responseType: 'blob' });

//       // Convert the DOCX blob to an ArrayBuffer
//       const arrayBuffer = await response.data.arrayBuffer();

//       // Use mammoth.js to convert the DOCX to HTML
//       const conversionResult = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });

//       setPreviewContent(conversionResult.value);
//     }

//     fetchDocx();
//   }, []);

//   return (
//     <div dangerouslySetInnerHTML={{ __html: previewContent }} />
//   );
// }

// export default DocxPreview;

'use client';

import { useEffect, useRef } from 'react';

export default function PDFViewer() {
  return (
    <div className="pdf-viewer">
      <iframe
        src="http://localhost:8080/api/cv/" // Replace with your Spring Boot endpoint
        title="PDF Viewer"
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    </div>
  );
}
