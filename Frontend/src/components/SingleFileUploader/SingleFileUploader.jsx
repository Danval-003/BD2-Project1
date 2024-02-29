import React, { useState, useEffect } from "react";
import { Input, Button } from '@chakra-ui/react';
import './SingleFileUploader.scss';

const SingleFileUploader = () => {
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const dropContainer = document.getElementById("dropcontainer");
    const fileInput = document.getElementById("jsons");

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDragEnter = () => {
      setDragActive(true);
    };

    const handleDragLeave = () => {
      setDragActive(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setDragActive(false);
      fileInput.files = e.dataTransfer.files;
    };

    dropContainer.addEventListener("dragover", handleDragOver);
    dropContainer.addEventListener("dragenter", handleDragEnter);
    dropContainer.addEventListener("dragleave", handleDragLeave);
    dropContainer.addEventListener("drop", handleDrop);

    return () => {
      dropContainer.removeEventListener("dragover", handleDragOver);
      dropContainer.removeEventListener("dragenter", handleDragEnter);
      dropContainer.removeEventListener("dragleave", handleDragLeave);
      dropContainer.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div className={'singlefileuploader'}>
      <h3 style={{ color: '#809BCE', fontWeight: '600' }}>Upload File</h3>
      <label htmlFor="jsons" className={`drop-container ${dragActive ? 'drag-active' : ''}`} id="dropcontainer">
        <span className="drop-title">Drop files here</span>
        or
        <input type="file" id="jsons" accept="application/json" required onChange={(e) => handleFileUpload(e.target.files[0])} />
      </label>
      <Button fontWeight={'600'} fontSize='14px' style={{ alignSelf: 'center' }} width={'15%'} color="#FAFAFA" bgColor='#95B8D1' margin={'20px'}>
        Submit
      </Button>
    </div>
  );
};

export default SingleFileUploader;
