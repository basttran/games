import { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';

export const App = () => {

const socket = io("http://localhost:3000", {
  // autoConnect: false
});

// useEffect(() => {

//   const connect = () => socket.connect();
// })
const sendEvent = (event: { x: number, y: number }) => {
  console.log('event: ', event);
  socket.emit('message', {
    ...event 
  })
}

  return (
    <div onClick={(e) => sendEvent({x: e.clientX, y: e.clientY})}>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;

