import {createContext, useContext,useState} from 'react';

const ViewContext = createContext();


export const useView = () => {
  const context = useContext(ViewContext);
  return context;
}

export default function ViewProvider({children,defaultView}) {
  const [currentView, setCurrentView] = useState(defaultView);

  return (
    <ViewContext.Provider value={{currentView, setCurrentView}}>
      {children}
    </ViewContext.Provider>
  )
}
