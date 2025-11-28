import React from 'react';
import EssentialsCard from '../../components/EssentialsCard';
import essentials from '../../assets/essentials';
import './EssentialsPage.css';
import Navbar from '../../components/comman/Navbar';
import PhotoUpload from '../../components/PhotoUpload'; 
const EssentialsPage = () => {
  return (
    <>
      <Navbar />
      <div className="essentials-header-section">
        <h2 className="essentials-heading">Shop Daily Essentials</h2>
        <PhotoUpload /> 
      </div>

      <div className="essentials-grid">
        {essentials.map((item) => (
          <EssentialsCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default EssentialsPage;
