import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import { AuthLayout, Login, Signup } from './components/index.js';
import Home from './components/pages/Home.jsx';
import AllPosts from './components/pages/AllPosts.jsx';
import AddPost from './components/pages/AddPost.jsx';
import EditPost from './components/pages/EditPost.jsx';
import Post from './components/pages/Post.jsx';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
          <Route path="/all-posts" element={<AuthLayout authentication><AllPosts /></AuthLayout>} />
          <Route path="/add-post" element={<AuthLayout authentication><AddPost /></AuthLayout>} />
          <Route path="/edit-post/:slug" element={<AuthLayout authentication><EditPost /></AuthLayout>} />
          <Route path="/post/:slug" element={<Post />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
