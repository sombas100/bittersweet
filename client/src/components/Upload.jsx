import React, { useState } from 'react';
import axios from 'axios'
import { Button } from '@mui/material'

const Upload = () => {
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(event.target.result);
        setImageSrc(event.target.result); 
      };
      reader.readAsDataURL(file); // 
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.target);
      const content = formData.get('content')
      await axios.post('http://localhost:3000/api/blog/uploads/new', { content });
      console.log('Content submitted', content);
      
    } catch (error) {
      console.error('Error submitting content:', error)
    }
  };

  return (
    <div className='dropbox-container'>
      <h2>What would you like to upload?</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='dropbox-wrapper'>
          {imageSrc ? (
            <img src={imageSrc} alt='Uploaded' />
          ) : (
            <textarea
              id='content'
              name='content'
              value={content}
              onChange={handleContentChange}
              onDrop={handleFileDrop}
              placeholder='Type or drop a file here...'
              rows={10}
              cols={50}
            />
          )}
          <div className='button-wrapper'>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileInputChange}
            />
          </div>
          <Button size='small' color='success' variant='contained' className='submit-btn' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Upload;