import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {debounce} from 'lodash';
import loadingIcon from './loading.gif'

function App() {
  const [userInfo, setUserInfo] = useState<Record<string, any>>();
  const [errMsg, setErrMsg] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);


  const getUserInfo = ({target: {value}}) => {
    setErrMsg(undefined);
    setUserInfo(undefined);
    setLoading(true);

    axios.request({
      url: `https://api.uomg.com/api/qq.info?qq=${value}`,
    }).catch((error) => {
      setErrMsg(error.message);
    }).then((response) => {
      if (response?.data.code === 1) {
        setUserInfo(response?.data);
      } else {
        setErrMsg(response?.data.msg);
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <h1>QQ号查询</h1>
      <div>
        <span>QQ</span>
        <input type="text" onChange={debounce(getUserInfo, 1000)} />
      </div>

      {loading && <img src={loadingIcon} className="loading" />}

      {userInfo && (
        <div className="user">
          <img src={userInfo.qlogo} className="user-avatar" />
          <div>
            <p className="user-name">{userInfo.name}</p>
            <p className="user-qq">{userInfo.qq}</p>
          </div>
        </div>
      )}
      
      {errMsg && <div className="error">{errMsg}</div>}
    </div>
  );
}

export default App;
