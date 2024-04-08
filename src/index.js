import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Windmill } from '@windmill/react-ui';
import './assets/css/custom.css';
import './assets/css/tailwind.css';
import { Provider } from 'react-redux';
import App from './App';
import myTheme from './assets/theme/myTheme';
import { AdminProvider } from './context/AdminContext';
import { SidebarProvider } from './context/SidebarContext';
import ThemeSuspense from './components/theme/ThemeSuspense';
import store from './store/store';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
  <Provider store={store}>
    <AdminProvider>
      <SidebarProvider>
        <Suspense fallback={<ThemeSuspense />}>
          <Windmill usePreferences theme={myTheme}>
            <App />
          </Windmill>
        </Suspense>
      </SidebarProvider>
    </AdminProvider>
  </Provider>,

  document.getElementById('root')
);
