import React, { useState } from 'react';
import { Button , Input  } from 'reactstrap';

function Settings() {
  const [subscribe , setSubscribe] = useState('');
  const handleSubscribe = () => {
    setSubscribe('')
  }
  const handleChange = (e) => {
    setSubscribe(e.target.value)
  }
  return (
    <div>
      <h4>CLAN Subscription Fees</h4>
      <div className='settings-style'>
        <Input 
          type='number' 
          className='small-input' 
          onChange={handleChange}
          value={subscribe} />
        <p className='pt-1'>$per month only numbers allowed</p>
      </div>
     
        <Button color="primary" onClick={handleSubscribe}>Subscribe</Button>
    </div>
  )
}
export default Settings;