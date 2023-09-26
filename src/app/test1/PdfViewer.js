import React, { useEffect, useRef } from 'react';

export default function PdfViewer({ pdfResponse }) {
  const viewer = useRef(null);

  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/webviewer/lib',
          licenseKey: 'VMeLR5MsW5lX3X9YfqQF', // Replace with your license key
        },
        viewer.current,
      ).then(instance => {
        const { docViewer } = instance;

        // Function to load the PDF content
        const loadPdfFromByteArray = pdfByteArray => {
          const documentId = 'cv.pdf'; // Unique document ID
          const options = {}; // Optional options for loading

          // Load the PDF byte array into the viewer
          docViewer.loadDocument(pdfByteArray, options, documentId);

          // Add the document to the document viewer
          docViewer.on('documentLoaded', () => {
            const pdfDocument = docViewer.getDocument();

            // Perform any additional actions here if needed
          });
        };

        // Convert the ResponseEntity<byte[]> to a Uint8Array
        const pdfByteArray = new Uint8Array(pdfResponse);

        // Load the PDF content into the viewer
        loadPdfFromByteArray(pdfByteArray);
      });
    });
  }, [pdfResponse]);

  return (
    <div className="MyComponent">
      <div className="webviewer" ref={viewer} style={{ height: '100vh' }} />
    </div>
  );
}
