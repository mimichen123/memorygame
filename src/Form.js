import React, { useState } from 'react';

function EmailValidator() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(null);

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    const validateEmail = async (email) => {
      try {
          const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=adaa53b1d95b411c8392f17ee5c37cc3&email=${email}`);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setIsValid(data.valid);
      } catch (error) {
          console.error('Failed to validate email:', error);
          setIsValid(false);
      }
  };
  

    return (
        <div>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
            />
            <button onClick={validateEmail}>Validate Email</button>
            {isValid !== null && (
                <p>{isValid ? "Email is valid!" : "Email is not valid or the service cannot be reached."}</p>
            )}
        </div>
    );
}

export default EmailValidator;
