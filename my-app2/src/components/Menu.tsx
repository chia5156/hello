import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';  
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import { promises } from 'fs';



function refreshToken() {
  
};







function Menu() {
  
    const navigate = useNavigate(); 
    const [token, setToken] = useState('123');


     useEffect(() => {
       // 響應攔截器
       async function fetchToken():Promise<any> {
         const res = await fetch("http://127.0.0.1:8000/login", {
          body: JSON.stringify({grant_type:1,username:"E138552",password:"1234",scope:1}),
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`,
            "user-agent": "Mozilla/4.0 MDN Example",
            "content-type": "application/json",
          },
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // *client, no-referrer       
      });

      if (res.status === 401) {
        // Token 過期，用 Refresh Token 換取新 Token
        const refreshRes = await fetch("/http://127.0.0.1:8000/login", { method: "POST" });
        const newTokenData = await refreshRes.json();
        const newToken = newTokenData.token;
        const expiresIn = newTokenData.expires_in; 

        // 儲存新 Token 到 cookie 並設置過期時間，然後重新發送原請求
        Cookies.set('token', newToken, { expires: expiresIn / 86400 });
        return fetchToken();
      } else {
        const result = await res.json();
        setToken(result);
      }
    }

    
  }, [token]);
    

    const items: MenuItem[] = [
        { 
             label: 'Dashboard',
              icon: 'pi pi-home', 
           command: () => {
             navigate('/contact');
           }
        },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ];
    
  return (
    <div className="Card">
      <TabMenu model={items} />
      <Outlet />      
    </div>
  );
}

export default Menu;
