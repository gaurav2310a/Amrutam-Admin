import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Add Link import
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import '../styles/IngredientForm.css';
import { ProgressStepper } from './ProgressStepper';

const IngredientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ingredientName: '',
    scientificName: '',
    sanskritName: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  
  // Progress state
  const steps = [
    { id: 1, label: 'General information' },
    { id: 2, label: 'Benefits' },
    { id: 3, label: 'Properties' },
    { id: 4, label: 'Other' },
    { id: 5, label: 'Overview' },
  ];
  const [currentStep, setCurrentStep] = useState(1);

  // Step 2 state: Why to use, Prakriti impact, Benefits list
  const [whyItems, setWhyItems] = useState(['']);
  const [prakriti, setPrakriti] = useState({ vata: '', kapha: '', pitta: '', vataReason: '', kaphaReason: '', pittaReason: '' });
  const [benefitItems, setBenefitItems] = useState(['']);

  // Step 3 state: Ayurvedic Properties, Important Formulations, Therapeutic Uses
  const [ayurProps, setAyurProps] = useState({ rasa: '', veerya: '', guna: '', vipaka: '' });
  const [formulations, setFormulations] = useState([{ iconDataUrl: null, text: '' }]);
  const [therapeuticUses, setTherapeuticUses] = useState(['']);

  // Step 4 state: Other - Plant parts, Best combined with, Geographical locations
  const plantPartOptions = ['Leaf', 'Root', 'Root Bark', 'Bark', 'Fruits', 'Juice/Extract', 'Pulp'];
  const [plantPart, setPlantPart] = useState('');
  const [plantPartDesc, setPlantPartDesc] = useState('');
  const [plantPartsList, setPlantPartsList] = useState([]); // [{part, description}]
  const [bestCombinedWith, setBestCombinedWith] = useState('');
  const [geoLocations, setGeoLocations] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (currentStep === 1 && (!formData.ingredientName || !formData.scientificName || !formData.sanskritName)) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Create form data for submission (aggregate across steps)
      const submitData = new FormData();
      submitData.append('image', image);
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      submitData.append('whyItems', JSON.stringify(whyItems.filter(Boolean)));
      submitData.append('prakriti', JSON.stringify(prakriti));
      submitData.append('benefitItems', JSON.stringify(benefitItems.filter(Boolean)));
      submitData.append('ayurvedicProperties', JSON.stringify(ayurProps));
      submitData.append('importantFormulations', JSON.stringify(formulations));
      submitData.append('therapeuticUses', JSON.stringify(therapeuticUses.filter(Boolean)));
      submitData.append('plantParts', JSON.stringify(plantPartsList));
      submitData.append('bestCombinedWith', bestCombinedWith);
      submitData.append('geographicalLocations', geoLocations);

      // TODO: Add your API call here
      console.log('Form submitted:', Object.fromEntries(submitData));

      // Persist minimal ingredient in localStorage for the list/table view
      const colorPalette = ['#fef3c7', '#fecaca', '#fed7aa', '#bbf7d0', '#fde68a'];
      const pickColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const newItem = {
        id: Date.now(),
        name: formData.ingredientName || 'Untitled Ingredient',
        description: formData.description || '—',
        status: 'Active',
        color: pickColor,
        icon: '🍃',
      };
      try {
        const current = JSON.parse(localStorage.getItem('ingredients') || '[]');
        const next = Array.isArray(current) ? [...current, newItem] : [newItem];
        localStorage.setItem('ingredients', JSON.stringify(next));
      } catch (err) {
        // if parse fails, overwrite with the single new item
        localStorage.setItem('ingredients', JSON.stringify([newItem]));
      }
      
      // Navigate back to ingredients page after successful submission
      navigate('/ingredients');
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/ingredients');
  };

  const goNext = () => setCurrentStep((s) => Math.min(steps.length, s + 1));
  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));

  // Helpers for dynamic lists
  const updateArrayItem = (arrSetter) => (index, value) => {
    arrSetter(prev => prev.map((it, i) => i === index ? value : it));
  };
  const addArrayItem = (arrSetter) => () => arrSetter(prev => [...prev, '']);
  const removeArrayItem = (arrSetter) => (index) => arrSetter(prev => prev.filter((_, i) => i !== index));

  // Formulations helpers
  const updateFormulationText = (index, value) => {
    setFormulations(prev => prev.map((f, i) => i === index ? { ...f, text: value } : f));
  };
  const addFormulation = () => setFormulations(prev => [...prev, { iconDataUrl: null, text: '' }]);
  const removeFormulation = (index) => setFormulations(prev => prev.filter((_, i) => i !== index));
  const changeFormulationIcon = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormulations(prev => prev.map((f, i) => i === index ? { ...f, iconDataUrl: reader.result } : f));
    };
    reader.readAsDataURL(file);
  };

  // Ayurvedic props handler
  const handleAyurPropChange = (key, value) => {
    setAyurProps(prev => ({ ...prev, [key]: value }));
  };

  // Plant parts handlers
  const addPlantPart = () => {
    if (!plantPart || !plantPartDesc.trim()) return;
    setPlantPartsList(prev => [...prev, { part: plantPart, description: plantPartDesc }]);
    setPlantPart('');
    setPlantPartDesc('');
  };
  const clearPlantPartInputs = () => {
    setPlantPart('');
    setPlantPartDesc('');
  };
  const removePlantPart = (index) => setPlantPartsList(prev => prev.filter((_, i) => i !== index));

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="main-content">
          <div className="ingredient-form-container">
            <div className="mb-4">
              <h2 className="mb-2">Add New Ingredient</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/ingredients" style={{ textDecoration: 'none', color: 'inherit' }}>Ingredients</Link></li>
                  <li className="breadcrumb-item active fw-medium text-dark">Add Ingredient</li>
                </ol>
              </nav>
            </div>
            {/* Progress Stepper */}
            <ProgressStepper
              steps={[
                { id: 1, label: 'General information' },
                { id: 2, label: 'Benefits' },
                { id: 3, label: 'Properties' },
                { id: 4, label: 'Other' },
                { id: 5, label: 'Overview' },
              ]}
              current={currentStep}
              onStepClick={(id) => setCurrentStep(id)}
            />
            
            <form className="ingredient-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              
              {currentStep === 1 && (
                <>
                  <h3>General Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="ingredientName">Ingredient Name<span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="ingredientName" 
                        value={formData.ingredientName}
                        onChange={handleInputChange}
                        placeholder="Enter ingredient name" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="scientificName">Scientific Name<span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="scientificName" 
                        value={formData.scientificName}
                        onChange={handleInputChange}
                        placeholder="Enter scientific name" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sanskritName">Sanskrit Name<span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="sanskritName" 
                        value={formData.sanskritName}
                        onChange={handleInputChange}
                        placeholder="Enter Sanskrit name" 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group description-group">
                      <label htmlFor="description">Description<span className="required">*</span></label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter ingredient description"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="image-upload-group">
                      <label htmlFor="ingredient-image" className="image-upload-label">
                        {preview ? (
                          <img src={preview} alt="Preview" className="image-preview" />
                        ) : (
                          <div className="image-upload-placeholder">
                            <span className="image-upload-icon">&#128247;</span>
                            <span>Upload Image</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          id="ingredient-image"
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h3>Ayurvedic Properties</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Rasa <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        placeholder="Type here..."
                        value={ayurProps.rasa}
                        onChange={(e) => handleAyurPropChange('rasa', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Veerya <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        placeholder="Type here..."
                        value={ayurProps.veerya}
                        onChange={(e) => handleAyurPropChange('veerya', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Guna <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        placeholder="Type here..."
                        value={ayurProps.guna}
                        onChange={(e) => handleAyurPropChange('guna', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Vipaka <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        placeholder="Type here..."
                        value={ayurProps.vipaka}
                        onChange={(e) => handleAyurPropChange('vipaka', e.target.value)}
                      />
                    </div>
                  </div>

                  <h3 className="mt-4">Important Formulations</h3>
                  {formulations.map((f, idx) => (
                    <div key={idx} className="form-row align-items-center mb-2">
                      <div className="form-group" style={{ maxWidth: 190 }}>
                        <label className="w-100">&nbsp;</label>
                        <label className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center" style={{ height: 44 }}>
                          {f.iconDataUrl ? (
                            <img src={f.iconDataUrl} alt="icon" style={{ width: 24, height: 24, objectFit: 'cover' }} />
                          ) : (
                            <span>Upload icon</span>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => changeFormulationIcon(idx, e.target.files && e.target.files[0])}
                          />
                        </label>
                      </div>
                      <div className="form-group flex-grow-1">
                        <label className="d-none d-md-block">&nbsp;</label>
                        <input
                          type="text"
                          placeholder="Lorem Ipsum"
                          value={f.text}
                          onChange={(e) => updateFormulationText(idx, e.target.value)}
                        />
                      </div>
                      <button type="button" className="btn btn-link text-danger" onClick={() => removeFormulation(idx)}>✕</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-link text-success fw-medium" onClick={addFormulation}>Add Another Items</button>

                  <h3 className="mt-4">Therapeutic Uses</h3>
                  {therapeuticUses.map((val, idx) => (
                    <div key={idx} className="form-row align-items-center mb-2">
                      <div className="form-group flex-grow-1">
                        <input
                          type="text"
                          placeholder={idx === therapeuticUses.length - 1 && !val ? 'Enter Here' : 'Lorem Ipsum Is Simply Dummy Text...'}
                          value={val}
                          onChange={(e) => updateArrayItem(setTherapeuticUses)(idx, e.target.value)}
                        />
                      </div>
                      <button type="button" className="btn btn-link text-danger" onClick={() => removeArrayItem(setTherapeuticUses)(idx)}>✕</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-link text-success fw-medium" onClick={addArrayItem(setTherapeuticUses)}>Add Another Items</button>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <h3>Other</h3>

                  <div className="section-card">
                    <h4 className="mb-3">Plant Parts And Its Purpose</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          Plant Part <span className="text-danger">*</span>
                        </label>
                        <select
                          className="select-input"
                          value={plantPart}
                          onChange={(e) => setPlantPart(e.target.value)}
                        >
                          <option value="">Select</option>
                          {plantPartOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>
                          Description <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Type here..."
                          value={plantPartDesc}
                          onChange={(e) => setPlantPartDesc(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <button type="button" className="btn-add-green" onClick={addPlantPart}>+ Add</button>
                      <button type="button" className="btn btn-outline-secondary" onClick={clearPlantPartInputs}>✕</button>
                    </div>

                    <div className="list-table">
                      <div className="list-table-header">
                        <span>Type</span>
                        <span>Description</span>
                      </div>
                      {plantPartsList.map((row, idx) => (
                        <div key={idx} className="list-table-row">
                          <span>{row.part}</span>
                          <span className="text-truncate">{row.description}</span>
                          <button type="button" className="btn btn-link text-danger" onClick={() => removePlantPart(idx)}>✕</button>
                        </div>
                      ))}
                      {plantPartsList.length === 0 && (
                        <div className="list-table-row text-muted"><span>No items added yet</span></div>
                      )}
                    </div>
                  </div>

                  <div className="form-row mt-3">
                    <div className="form-group">
                      <label>Best Combined With <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        placeholder="Type here..."
                        value={bestCombinedWith}
                        onChange={(e) => setBestCombinedWith(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Geographical Locations <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        placeholder="Type here..."
                        value={geoLocations}
                        onChange={(e) => setGeoLocations(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <>
                  <h3>Overview</h3>

                  {/* General Information Card */}
                  <div className="section-card mb-3">
                    <h4 className="mb-3">General Information</h4>
                    {preview && (
                      <div className="mb-3">
                        <img src={preview} alt="ingredient" style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 12 }} />
                      </div>
                    )}
                    <div className="mb-2">
                      <h5 className="m-0">
                        {formData.ingredientName || '-'}
                        {formData.scientificName ? ` – ${formData.scientificName}` : ''}
                        {formData.sanskritName ? `  (Sanskrit – ${formData.sanskritName})` : ''}
                      </h5>
                    </div>
                    <div className="mb-2">
                      <h6 className="m-0">Description</h6>
                      <p className="m-0 text-muted">{formData.description || '-'}</p>
                    </div>
                  </div>

                  {/* Why to use */}
                  <div className="section-card mb-3">
                    <h4 className="mb-2">Why {formData.ingredientName || 'this ingredient'}?</h4>
                    {whyItems.filter(Boolean).length > 0 ? (
                      <ul className="mb-0">
                        {whyItems.filter(Boolean).map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">-</p>
                    )}
                  </div>

                  {/* Prakriti Impact */}
                  <div className="section-card mb-3">
                    <h4 className="mb-2">Prakriti Impact</h4>
                    <ul className="mb-0">
                      <li>
                        <strong>Vata</strong> – {prakriti.vata || '—'}{prakriti.vataReason ? ` – ${prakriti.vataReason}` : ''}
                      </li>
                      <li>
                        <strong>Kapha</strong> – {prakriti.kapha || '—'}{prakriti.kaphaReason ? ` – ${prakriti.kaphaReason}` : ''}
                      </li>
                      <li>
                        <strong>Pitta</strong> – {prakriti.pitta || '—'}{prakriti.pittaReason ? ` – ${prakriti.pittaReason}` : ''}
                      </li>
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="section-card mb-3">
                    <h4 className="mb-2">Benefits</h4>
                    {benefitItems.filter(Boolean).length > 0 ? (
                      <ul className="mb-0">
                        {benefitItems.filter(Boolean).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">-</p>
                    )}
                  </div>

                  {/* Ayurvedic Properties */}
                  <div className="section-card mb-3">
                    <h4 className="mb-2">Ayurvedic Properties</h4>
                    <ul className="mb-0">
                      <li><strong>Rasa</strong> – {ayurProps.rasa || '—'}</li>
                      <li><strong>Veerya</strong> – {ayurProps.veerya || '—'}</li>
                      <li><strong>Guna</strong> – {ayurProps.guna || '—'}</li>
                      <li><strong>Vipaka</strong> – {ayurProps.vipaka || '—'}</li>
                    </ul>
                  </div>

                  {/* Important Formulations */}
                  <div className="section-card mb-3">
                    <h4 className="mb-2">Important Formulations</h4>
                    {formulations.filter(f => f.text || f.iconDataUrl).length > 0 ? (
                      <div className="d-flex flex-column">
                        {formulations.map((f, i) => (
                          (f.text || f.iconDataUrl) && (
                            <div key={i} className="d-flex align-items-center mb-2">
                              {f.iconDataUrl ? (
                                <img src={f.iconDataUrl} alt="icon" style={{ width: 24, height: 24, objectFit: 'cover', marginRight: 8 }} />
                              ) : (
                                <span style={{ width: 24, height: 24, marginRight: 8, opacity: 0.4 }}>🧪</span>
                              )}
                              <span>{f.text || '-'}</span>
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted mb-0">-</p>
                    )}
                  </div>

                  {/* Therapeutic uses */}
                  <div className="section-card mb-3">
                    <h4 className="mb-2">Therapeutic uses</h4>
                    {therapeuticUses.filter(Boolean).length > 0 ? (
                      <ul className="mb-0">
                        {therapeuticUses.filter(Boolean).map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">-</p>
                    )}
                  </div>

                  {/* Plant parts list */}
                  <div className="section-card mb-3">
                    <h4 className="mb-3">Plant parts and its purpose</h4>
                    <div className="list-table">
                      <div className="list-table-header">
                        <span>Type</span>
                        <span>Description</span>
                      </div>
                      {plantPartsList.length > 0 ? (
                        plantPartsList.map((row, idx) => (
                          <div key={idx} className="list-table-row">
                            <span>{row.part}</span>
                            <span className="text-truncate">{row.description}</span>
                          </div>
                        ))
                      ) : (
                        <div className="list-table-row text-muted"><span>No items</span></div>
                      )}
                    </div>
                  </div>

                  {/* Best combined / Geographical locations */}
                  <div className="section-card">
                    <div className="form-group">
                      <label>Best combined with</label>
                      <p className="m-0 text-muted">{bestCombinedWith || '-'}</p>
                    </div>
                    <div className="form-group">
                      <label>Geographical locations</label>
                      <p className="m-0 text-muted">{geoLocations || '-'}</p>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h3>Why To Use?</h3>
                  {whyItems.map((val, idx) => (
                    <div key={idx} className="form-row align-items-center mb-2">
                      <div className="form-group flex-grow-1">
                        <input
                          type="text"
                          placeholder="Enter here"
                          value={val}
                          onChange={(e) => updateArrayItem(setWhyItems)(idx, e.target.value)}
                        />
                      </div>
                      <button type="button" className="btn btn-link text-danger" onClick={() => removeArrayItem(setWhyItems)(idx)}>✕</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-link text-success fw-medium" onClick={addArrayItem(setWhyItems)}>Add Another Items</button>

                  <h3 className="mt-4">Prakriti Impact</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Vata<span className="required">*</span></label>
                      <select className="select-input" value={prakriti.vata} onChange={(e) => setPrakriti(p => ({...p, vata: e.target.value}))}>
                        <option value="">Select</option>
                        <option>Balanced</option>
                        <option>Mildly Increasing</option>
                        <option>Unbalanced</option>
                        <option>Aggravate</option>
                      </select>
                      <label className="mt-2">Vata Reason</label>
                      <input type="text" placeholder="Type here..." value={prakriti.vataReason} onChange={(e) => setPrakriti(p => ({...p, vataReason: e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label>Kapha<span className="required">*</span></label>
                      <select className="select-input" value={prakriti.kapha} onChange={(e) => setPrakriti(p => ({...p, kapha: e.target.value}))}>
                        <option value="">Select</option>
                        <option>Balanced</option>
                        <option>Mildly Increasing</option>
                        <option>Unbalanced</option>
                        <option>Aggravate</option>
                      </select>
                      <label className="mt-2">Kapha Reason</label>
                      <input type="text" placeholder="Type here..." value={prakriti.kaphaReason} onChange={(e) => setPrakriti(p => ({...p, kaphaReason: e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label>Pitta<span className="required">*</span></label>
                      <select className="select-input" value={prakriti.pitta} onChange={(e) => setPrakriti(p => ({...p, pitta: e.target.value}))}>
                        <option value="">Select</option>
                        <option>Balanced</option>
                        <option>Mildly Increasing</option>
                        <option>Unbalanced</option>
                        <option>Aggravate</option>
                      </select>
                      <label className="mt-2">Pitta Reason</label>
                      <input type="text" placeholder="Type here..." value={prakriti.pittaReason} onChange={(e) => setPrakriti(p => ({...p, pittaReason: e.target.value}))} />
                    </div>
                  </div>

                  <h3 className="mt-4">Benefits</h3>
                  {benefitItems.map((val, idx) => (
                    <div key={idx} className="form-row align-items-center mb-2">
                      <div className="form-group" style={{maxWidth: '140px'}}>
                        <button type="button" className="btn btn-outline-secondary w-100">Add Emoji</button>
                      </div>
                      <div className="form-group flex-grow-1">
                        <input type="text" placeholder="Type here..." value={val} onChange={(e) => updateArrayItem(setBenefitItems)(idx, e.target.value)} />
                      </div>
                      <button type="button" className="btn btn-link text-danger" onClick={() => removeArrayItem(setBenefitItems)(idx)}>✕</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-link text-success fw-medium" onClick={addArrayItem(setBenefitItems)}>Add Another Items</button>
                </>
              )}

              <div className="form-actions">
                {currentStep > 1 && (
                  <button type="button" className="btn-cancel" onClick={goPrev}>Back</button>
                )}
                <div style={{marginLeft: 'auto'}}>
                  <button type="button" className="btn-cancel me-2" onClick={handleCancel}>Cancel</button>
                  {currentStep < steps.length ? (
                    <>
                      <button type="button" className="btn-submit me-2" onClick={() => {/* optional draft save */}}>Save</button>
                      <button type="button" className="btn-submit" onClick={goNext}>Next</button>
                    </>
                  ) : (
                    <button type="submit" className="btn-submit">Save Ingredient</button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;