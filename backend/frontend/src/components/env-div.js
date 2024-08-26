import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EnvDiv = () => 
{
  const [apiEnv, setApiEnv] = useState(null);
  const [nodeEnv, setNodeEnv] = useState(null);
  const [nodeUrl, setNodeurl] = useState(null);
  const [chainID, setChainID] = useState(null);
  const initialized = useRef(false);
  let whichEnv = process.env.NODE_ENV;
  if (whichEnv === 'development')
  {
    whichEnv = 'NPM';
  }
  else if (whichEnv === 'production')
  {
    whichEnv = 'WEBSERVER';
  }
  let bgColor;
  switch (process.env.REACT_APP_ENV)
  {
    case 'dev':
      bgColor = 'green';
      break;
    case 'testing':
      bgColor = 'orange';
      break;
    default:
      bgColor = 'blue'; // Default color if no match
  }

  useEffect(() => 
  {
    if (process.env.REACT_APP_ENV === 'prod')
    {
      return;
    }
    const fetchData = async () => 
    {
      try 
      {
        if (process.env.REACT_APP_CHAIN_ENV == "prod")
          {
            return;
          }
          else if (process.env.REACT_APP_CHAIN_ENV == "dev")
          {
            const whichNode = process.env.REACT_APP_CHAIN_ADDRESS_DEV.replace(/:\w+@/, ':XXXX@');
            setNodeurl(whichNode);
            const which_chain = process.env.REACT_APP_CHAIN_ID_DEV;
            setChainID(which_chain);
            if (process.env.REACT_APP_CHAIN_ADDRESS_DEV.includes('testnode.metaqueer.store'))
            {
              const node_url = process.env.REACT_APP_CHAIN_ADDRESS_DEV
                                .replace('ws://', 'http://')
                                .replace('wss://', 'https://');
              let res = await axios.get(node_url + '/env.html');
              setNodeEnv("(" + res.data.toUpperCase() + ")");
            }
          }
          else if (process.env.REACT_APP_CHAIN_ENV == "testing")
          {
            const whichNode = process.env.REACT_APP_CHAIN_ADDRESS_TESTING;
            setNodeurl(whichNode);
            const which_chain = process.env.REACT_APP_CHAIN_ID_TESTING;
            setChainID(which_chain);
          }
          let res = await axios.get(process.env.REACT_APP_API_ADDRESS + '/env/');
          setApiEnv(res.data.result.data.env.toUpperCase());
      } 
      catch (error) 
      {
        console.error('Error fetching data:', error);
      }
    };
    if (!initialized.current) 
    {
      initialized.current = true;
      fetchData();
    }
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return process.env.REACT_APP_ENV !== 'prod' && (
    <>
      <div className="fixed rounded-md z-10 bottom-5 flex" style={{ padding: '5px', backgroundColor: bgColor }}>
        <p>
          SITE: <span style={{color: 'yellow', fontWeight: 'bold'}}>{whichEnv.toUpperCase()} ENV ({process.env.REACT_APP_ENV.toUpperCase()})</span><br />        
          API: <span style={{color: 'yellow', fontWeight: 'bold'}}>{process.env.REACT_APP_API_ADDRESS} ({apiEnv})</span><br />
          {/*Chain ID: {process.env.REACT_APP_CHAIN_ID_DEV}<br />*/}
          CHAIN URL: <span style={{color: 'yellow', fontWeight: 'bold'}}>{nodeUrl} {nodeEnv}</span><br />
          CHAIN ID: <span style={{color: 'yellow', fontWeight: 'bold'}}>{chainID}</span><br />
          CHAIN ENV: <span style={{color: 'yellow', fontWeight: 'bold'}}>{process.env.REACT_APP_CHAIN_ENV.toUpperCase()}</span><br />
        </p>
      </div>
    </>
  )
};

export default EnvDiv;
