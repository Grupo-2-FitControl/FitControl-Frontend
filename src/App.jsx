import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/layout/Layout.jsx";
import Activities from "./pages/Activity/Activities.jsx";
import ActivityDetail from "./pages/Activity/ActivityDetail.jsx";
import Users from "./pages/Users/Users.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/activities" />} />
        <Route path="activities" element={<Activities />} />
        <Route path="activities/:id" element={<ActivityDetail />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;