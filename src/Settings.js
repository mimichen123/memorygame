import React,{useState} from 'react';


function Settings() {
  
  const getLocalStorageItem = (key, defaultValue) => {
    
    var s = localStorage.getItem(key);
    return s ? JSON.parse(s) : defaultValue;
  };

  
  const [data, setSettings] = useState(getLocalStorageItem('settings', { guessesAllowed: 10, range: 20 }));

  function store(){
    localStorage.setItem('settings', JSON.stringify(data));
    alert('Your new settings hvae been saved!');
   

    var a =localStorage.getItem('settings');
    console.log(a)
  };

  return (
    <div>
        <form>
      <label>
        Change number of guesses allowed (max 10):<br/>
        <input type="number" value={data.guessesAllowed}
          onChange={(e) => setSettings({ ...data, guessesAllowed: parseInt(e.target.value, 10) })}min={1} max={10}/>
      </label><br/>

      <label><br/>
        Change number range to guess (max 20):<br/>
        <input type="number" value={data.range}
          onChange={(e) => setSettings({ ...data, range: parseInt(e.target.value, 10) })} min={1} max={20}/>
      </label><br /><br/>
      </form>
    

      <button onClick={store}>Save Settings</button>
    

    </div>
  );
};

export default Settings;
