import React, { useState } from 'react'
import axios from 'axios'

const BlogPostForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
    });

    const [ title, content ] = formData;

    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async e => {
      e.preventDefault();
      try {
        await axios.post('/api/blog', {
          title,
          content
        });
        setFormData({ title: '', content: '' })
        alert('Blog post added successfully!');
      } catch (error) {
        console.error(error.res.data)
      }
    }
  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input 
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label htmlFor='content'>Content:</label>
          <textarea 
          id='content'
          name='content'
          value={content}
          onChange={handleChange}
          required
          />
        </div>
        <button type='submit'>Add Post</button>
      </form>
    </div>
  )
}

export default BlogPostForm