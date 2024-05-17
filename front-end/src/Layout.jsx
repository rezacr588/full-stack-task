import React, { useState, useEffect, useRef } from 'react';
import { useTasksContext } from './context';
import { SidebarIcon, SearchIcon, AddIcon } from './icons';

const Layout = ({ children }) => {
  const { deleteAllTasks, searchTask } = useTasksContext();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen">
      <aside
        ref={sidebarRef}
        className={`fixed sm:relative transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
        style={{
          borderRight: '1px solid #EFEFEF',
          padding: '40px',
          top: '0',
          width: '250px',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
        <h4
          style={{
            fontSize: '25px',
            lineHeight: '32.5px',
            fontWeight: 500,
            marginBottom: 80,
          }}
        >
          Task Manager
        </h4>
        <button
          style={{
            height: 40,
            background: '#2563DC',
            padding: '8px 28px',
            borderRadius: 8,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            width: '200px',
            gap: 12,
          }}
        >
          <AddIcon />
          Tasks
        </button>
        <button
          style={{
            height: 40,
            background: '#FDF0EC',
            padding: '8px 28px',
            borderRadius: 8,
            color: '#81290E',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 16,
            fontWeight: 500,
            width: '200px',
            position: 'absolute',
            bottom: '40px',
          }}
          onClick={deleteAllTasks}
        >
          Delete All Tasks
        </button>
      </aside>
      <div className="flex-1">
        <header
          style={{
            borderBottom: '1px solid #EFEFEF',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 40px',
          }}
          className="text-gray-800"
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <button
              onClick={toggleSidebar}
              className="sm:hidden"
              style={{
                background: 'none',
                border: 'none',
                marginRight: '16px',
                cursor: 'pointer',
              }}
            >
              <SidebarIcon />
            </button>
            <div style={{ position: 'relative', width: '80%' }}>
              <input
                type="text"
                placeholder="Filter Tasks"
                style={{
                  background: 'white',
                  border: '1px solid #EFEFEF',
                  padding: '8px 16px',
                  borderRadius: 8,
                  width: '100%',
                  paddingRight: '40px',
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  searchTask(value);
                }}
              />
              <SearchIcon
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg"
            style={{ width: '44px', height: '44px', borderRadius: '50%' }}
          />
        </header>
        <main
          style={{
            padding: '20px 40px',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
