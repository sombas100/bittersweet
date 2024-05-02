import React, { useState } from 'react';

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Content submitted', content);
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
          <button className='submit-btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;