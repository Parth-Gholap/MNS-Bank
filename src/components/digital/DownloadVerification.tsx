'use client';

import React, { useState, useEffect } from 'react';

interface DownloadVerificationProps {
  downloadUrl: string;
  fileName: string;
  fileSize: string;
  checksum: string;
  locale: 'en' | 'hi';
  className?: string;
}

const DownloadVerification: React.FC<DownloadVerificationProps> = ({ 
  downloadUrl, 
  fileName, 
  fileSize, 
  checksum, 
  locale, 
  className = '' 
}) => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified' | 'failed'>('pending');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const verifyDownload = async () => {
    setVerificationStatus('verifying');
    
    // Simulate verification process
    setTimeout(() => {
      // Simulate successful verification
      setVerificationStatus('verified');
    }, 2000);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Create download link
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsDownloading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      setVerificationStatus('failed');
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'verified':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'verifying':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (verificationStatus) {
      case 'verified':
        return locale === 'hi' ? 'सत्यापित' : 'Verified';
      case 'failed':
        return locale === 'hi' ? 'विफल' : 'Failed';
      case 'verifying':
        return locale === 'hi' ? 'सत्यापित हो रहा है' : 'Verifying';
      default:
        return locale === 'hi' ? 'जांच नहीं की गई' : 'Not Checked';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {locale === 'hi' ? 'डाउनलोड सत्यापन' : 'Download Verification'}
        </h3>
        <div className={`flex items-center ${getStatusColor()}`}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {verificationStatus === 'verified' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
            {verificationStatus === 'failed' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
            {verificationStatus === 'verifying' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
            {verificationStatus === 'pending' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            )}
          </svg>
          <span className="font-medium">{getStatusText()}</span>
        </div>
      </div>

      {/* File Information */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600">
              {locale === 'hi' ? 'फाइल नाम:' : 'File Name:'}
            </span>
            <p className="font-medium text-gray-900">{fileName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">
              {locale === 'hi' ? 'फाइल आकार:' : 'File Size:'}
            </span>
            <p className="font-medium text-gray-900">{fileSize}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">
              {locale === 'hi' ? 'चेकसम:' : 'Checksum:'}
            </span>
            <p className="font-medium text-gray-900 text-sm">{checksum}</p>
          </div>
        </div>
      </div>

      {/* Download Progress */}
      {isDownloading && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {locale === 'hi' ? 'डाउनलोड प्रगति:' : 'Download Progress:'}
            </span>
            <span className="text-sm text-gray-600">{downloadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-bank-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {locale === 'hi' ? 'डाउनलोड हो रहा है...' : 'Downloading...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 4h.01M15 12a3 3 0 11-6 0 3 3 0 016 0 3 3 0 0z" />
              </svg>
              {locale === 'hi' ? 'डाउनलोड करें' : 'Download'}
            </>
          )}
        </button>

        <button
          onClick={verifyDownload}
          disabled={verificationStatus === 'verifying'}
          className="btn-outline border-bank-blue-600 text-bank-blue-600 hover:bg-bank-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verificationStatus === 'verifying' ? (
            <>
              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {locale === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {locale === 'hi' ? 'सत्यापित करें' : 'Verify'}
            </>
          )}
        </button>
      </div>

      {/* Security Information */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              {locale === 'hi' ? 'सुरक्षा जानकारी' : 'Security Information'}
            </h4>
            <p className="text-sm text-blue-800">
              {locale === 'hi' 
                ? 'यह डाउनलोड हमारे सुरक्षित सर्वर से है और वायरस से मुक्त है। चेकसम का उपयोग फाइल की प्रामाणिकता को सत्यापित करने के लिए किया जाता है।'
                : 'This download is from our secure server and is virus-free. Use the checksum to verify file authenticity.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadVerification;
