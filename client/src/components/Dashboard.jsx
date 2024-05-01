import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogPostForm from './BlogPostForm'
import LogoutButton from './LogoutButton'

const Dashboard = () => {
    return (
    <div>
      <h1>Dashboard</h1>
      <BlogPostForm />
      <LogoutButton />
    </div>
  )
}

export default Dashboard