'use client';
// @ts-nocheck
import React from 'react';
import { useRouter } from 'next/navigation';

;
import './ComingSoon.css';

const ComingSoon = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="coming-soon-container">
      <button className="back-button" onClick={handleBack}>
        <span className="back-icon">←</span>
        Back
      </button>

      <div className="coming-soon-content">
        <div className="animated-background">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="content-wrapper">
          <h1 className="main-heading">Coming Soon</h1>
          <p className="subtitle">Kings 11 Sports Academy</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;