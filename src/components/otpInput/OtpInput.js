import React, { useState, useRef } from 'react';

import './otpInput.scss';

const OtpInput = ({ length, onChange, error, helperText }) => {
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);

  const handleInputChange = (index, event) => {
    const newOtp = [...otp];

    if (event.target.value === '') {
      // If the input is cleared, move the focus to the previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (event.target.value.match(/^\d$/)) {
      // If a single digit is entered, update the OTP value and move the focus to the next input
      newOtp[index] = event.target.value;
      setOtp(newOtp.join(''));

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    // Call the onChange handler with the updated OTP value
    if (typeof onChange === 'function') {
      onChange(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      const newOtp = [...otp];

      if (event.target.value === '') {
        // If the input is empty and Backspace is pressed, delete the previous input
        if (index > 0) {
          newOtp[index - 1] = '';
          setOtp(newOtp.join(''));
          inputRefs.current[index - 1].focus();
        }
      } else {
        // If there is input, clear the current input
        newOtp[index] = '';
        setOtp(newOtp.join(''));
      }

      // Call the onChange handler with the updated OTP value
      if (typeof onChange === 'function') {
        onChange(newOtp.join(''));
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text/plain');
    const pastedOtp = pastedData.slice(0, length);
    const newOtp = [...otp];

    for (let i = 0; i < newOtp.length; i += 1) {
      if (pastedOtp[i] && pastedOtp[i].match(/^\d$/)) {
        newOtp[i] = pastedOtp[i];
      }
    }

    setOtp(newOtp.join(''));

    // Call the onChange handler with the updated OTP value
    if (typeof onChange === 'function') {
      onChange(newOtp.join(''));
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < length; i += 1) {
      inputs.push(
        <input
          key={i}
          ref={(ref) => {
            inputRefs.current[i] = ref;
            return inputRefs.current[i];
          }}
          type="text"
          value={otp[i] || ''}
          onChange={(event) => handleInputChange(i, event)}
          onKeyDown={(event) => handleKeyDown(i, event)}
          onPaste={(event) => handlePaste(event)}
        />
      );

      if (i < length - 1) {
        inputs.push(<span key={`dash-${i}`} className="dash" />);
      }
    }
    return inputs;
  };

  return (
    <div>
      <div className="otp-input pt-3 pb-1">{renderInputs()}</div>
      {/* <div className="otpError">
        <span>{error && helperText}</span>
      </div> */}
      {error && <div className="invalid-feedback d-block">{helperText}</div>}
    </div>
  );
};

export default OtpInput;
