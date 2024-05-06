import { useState } from "react";
import axios from 'axios'

const BlogPostForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');

  const { title, content } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/blog/uploads/new', {
        title,
        content
      });
      setFormData({ title: '', content: '' });
      setError('');
      alert('Blog post added successfully!');
      onClose();
    } catch (error) {
      console.error(error.response.data);
      setError('Failed to add blog post. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      {error && <div className="error">{error}</div>}
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
          type="text"
            id='content'
            name='content'
            value={content}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Add Post</button>
        <button type='button' onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default BlogPostForm;
