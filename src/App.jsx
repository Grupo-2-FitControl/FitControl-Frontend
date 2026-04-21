import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "./components/layout/Layout";
import Homepage from "./pages/homepage/Homepage";
import Activities from "./pages/Activity/Activities";
import Teachers from "./pages/teachers/Teachers";
import Users from "./pages/Users/Users";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="activities" element={<Activities />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}