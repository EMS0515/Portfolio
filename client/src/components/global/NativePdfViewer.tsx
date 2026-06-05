import React from 'react';

interface PdfViewerProps {
  fileUrl: string;
}

export const NativePdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={`${fileUrl}#toolbar=1`}
        width="100%"
        height="100%"
        title="PDF Viewer"
        style={{ border: 'none' }}
      />
    </div>
  );
};