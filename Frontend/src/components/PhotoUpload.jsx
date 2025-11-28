import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?worker';
import './PhotoUpload.css';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

const PhotoUpload = () => {
  const { addToCart } = useCart();
  const [files, setFiles] = useState([]); // { file, pages }
  const [copyType, setCopyType] = useState('bw');
  const [totalPages, setTotalPages] = useState(0);
  const [cost, setCost] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pages = pdf.numPages;

      const updatedFiles = [...files, { file: selectedFile, pages }];
      const updatedTotalPages = updatedFiles.reduce((sum, f) => sum + f.pages, 0);
      const pricePerPage = copyType === 'color' ? 10 : 2;
      const updatedCost = updatedTotalPages * pricePerPage;

      setFiles(updatedFiles);
      setTotalPages(updatedTotalPages);
      setCost(updatedCost);
    } catch (err) {
      console.error('Error reading PDF:', err);
      alert('Failed to read PDF file.');
    } finally {
      setIsProcessing(false);
      e.target.value = ''; // reset input
    }
  };

  const handleCopyTypeChange = (e) => {
    const type = e.target.value;
    setCopyType(type);
    const pricePerPage = type === 'color' ? 10 : 2;
    setCost(pricePerPage * totalPages);
  };

  const handleAddToCart = () => {
    if (files.length === 0) {
      alert('Please upload at least one file.');
      return;
    }

    addToCart({
      id: Date.now(),
      name: `Photocopy (${copyType === 'color' ? 'Color' : 'B/W'}) - ${totalPages} pages`,
      price: cost,
      quantity: 1,
      description: `Uploaded ${files.length} file(s)`
    });

    alert('Photocopy added to cart!');
    setFiles([]);
    setTotalPages(0);
    setCost(0);
  };

  return (
    <div className="mini-photocopy-upload">
      <h3>Quick Photocopy Upload</h3>

      <label>Copy Type:</label>
      <select value={copyType} onChange={handleCopyTypeChange}>
        <option value="bw">B/W (₹2/page)</option>
        <option value="color">Color (₹10/page)</option>
      </select>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isProcessing}
      />

      {files.length > 0 && (
        <div className="file-list">
          <p><strong>Uploaded Files:</strong></p>
          <ul>
            {files.map((f, i) => (
              <li key={i}>{f.file.name} - {f.pages} pages</li>
            ))}
          </ul>
        </div>
      )}

      {totalPages > 0 && (
        <div className="summary">
          <p><strong>Total Pages:</strong> {totalPages}</p>
          <p><strong>Total Cost:</strong> ₹{cost}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
