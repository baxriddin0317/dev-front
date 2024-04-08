import React from 'react';
import PathName from '../hooks/pathName';

function Main({ children }) {
  const path = PathName();
  return (
    <main className="h-full overflow-y-auto">
      <div className={`container grid px-6 mx-auto ${path}`}>{children}</div>
    </main>
  );
}

export default Main;
