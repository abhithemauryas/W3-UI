import React from 'react';

const BackButton = () => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};

export default BackButton;
