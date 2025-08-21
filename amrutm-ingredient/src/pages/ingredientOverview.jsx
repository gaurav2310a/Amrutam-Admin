import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import '../styles/IngredientForm.css';

// Temporary mock data; replace with API fetch by id later
const baseIngredients = [
  { id: 1, name: 'Khus Khus', status: 'Active', color: '#fef3c7', icon: '🌾' },
  { id: 2, name: 'Rakta Chandan', status: 'Active', color: '#fecaca', icon: '🌿' },
  { id: 3, name: 'Swarn Bhashm', status: 'Active', color: '#fed7aa', icon: '✨' },
  { id: 4, name: 'Giloy', status: 'Active', color: '#bbf7d0', icon: '🌱' },
  { id: 5, name: 'Bhringraj', status: 'Active', color: '#fde68a', icon: '🍃' },
];

function buildIngredientDetails(idNum) {
  const base = baseIngredients.find(b => b.id === idNum);
  if (!base) return null;
  return {
    id: base.id,
    ingredientName: base.name,
    scientificName: 'Plumbago zeylanica',
    sanskritName: 'चित्रक',
    description:
      'Nested in the serene foothills of the Himalayas, our Ayurvedic Healing Retreat offers a perfect blend of ancient traditions and modern wellness practices.',
    image: null, // supply URL if available
    whyItems: [
      'Helps lower blood sugar and boosts digestion',
      'Speeds wound healing with antioxidant and antimicrobial properties',
      'Used in medicines for indigestion',
    ],
    prakriti: {
      vata: 'Balanced',
      vataReason: 'none',
      kapha: 'Balanced',
      kaphaReason: 'none',
      pitta: 'Unbalanced',
      pittaReason: 'if taken in excessive amount',
    },
    benefitItems: [
      'Calms the nervous system and reduces anxiety',
      'Reduces cholesterol and supports weight loss',
      'Manages diabetes by lowering blood sugar levels',
      'Beneficial in hemorrhoids of Vata origin',
    ],
    ayurProps: {
      rasa: 'Katu (Pungent)',
      veerya: 'Ushna (Hot)',
      guna: 'Laghu (Light), Ruksha (Dry), Tikna (Sharp)',
      vipaka: 'Katu (Pungent)',
    },
    formulations: [
      { iconDataUrl: null, text: 'Chitrak Haritaki' },
      { iconDataUrl: null, text: 'Chitrakadi Vati' },
      { iconDataUrl: null, text: 'Kalyanagulam' },
      { iconDataUrl: null, text: 'Chitrakadi Churna' },
    ],
    therapeuticUses: ['Agnimandya', 'Grahani Rog', 'Udara Shula', 'Gudasotha'],
    plantPartsList: [
      { part: 'Root', description: 'Digestion, skin conditions, manage blood sugar level' },
      { part: 'Root bark', description: 'Manage obesity, metabolism and assist in weight loss' },
      { part: 'Leaves', description: 'Used externally for skin conditions and wounds' },
    ],
    bestCombinedWith: 'Pippali, Haritaki, Guggulu, Punarnava, Amla, Giloy',
    geoLocations: 'Tropical and subtropical regions worldwide, including India and Srilanka.',
  };
}

export default function IngredientOverviewPage() {
  const { id } = useParams();
  const idNum = Number(id);
  const ing = buildIngredientDetails(idNum);
  const [status, setStatus] = useState(ing?.status || 'Active');

  // Initialize status from localStorage if ingredient exists there
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ingredients') || '[]');
      const match = Array.isArray(stored) ? stored.find(i => Number(i.id) === idNum) : null;
      if (match && match.status) {
        setStatus(match.status);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idNum]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    try {
      const stored = JSON.parse(localStorage.getItem('ingredients') || '[]');
      if (Array.isArray(stored)) {
        const updated = stored.map(item => Number(item.id) === idNum ? { ...item, status: newStatus } : item);
        localStorage.setItem('ingredients', JSON.stringify(updated));
      }
    } catch {}
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="main-content">
          <div className="ingredient-form-container">
            <div className="mb-4">
              <h2 className="mb-2">Ingredient Overview</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/ingredients" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Ingredients
                    </Link>
                  </li>
                  <li className="breadcrumb-item active fw-medium text-dark">
                    {ing ? ing.ingredientName : 'Not found'}
                  </li>
                </ol>
              </nav>
            </div>

            {!ing ? (
              <div className="section-card"><p className="text-danger mb-0">Ingredient not found.</p></div>
            ) : (
              <div className="ingredient-form">
                {/* General Information */}
                <div className="section-card mb-3">
                  <h4 className="mb-3">General Information</h4>
                  {ing.image && (
                    <div className="mb-3">
                      <img
                        src={ing.image}
                        alt="ingredient"
                        style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 12 }}
                      />
                    </div>
                  )}
                  <div className="mb-2">
                    <h5 className="m-0">
                      {ing.ingredientName || '-'}
                      {ing.scientificName ? ` – ${ing.scientificName}` : ''}
                      {ing.sanskritName ? `  (Sanskrit – ${ing.sanskritName})` : ''}
                    </h5>
                  </div>
                  <div className="mb-2">
                    <h6 className="m-0">Description</h6>
                    <p className="m-0 text-muted">{ing.description || '-'}</p>
                  </div>
                  <div className="mb-2">
                    <h6 className="m-0">Status</h6>
                    <select
                      className="form-select form-select-sm"
                      style={{ maxWidth: 200 }}
                      value={status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Why to use */}
                <div className="section-card mb-3">
                  <h4 className="mb-2">Why {ing.ingredientName || 'this ingredient'}?</h4>
                  {ing.whyItems?.length ? (
                    <ul className="mb-0">
                      {ing.whyItems.map((w, i) => (<li key={i}>{w}</li>))}
                    </ul>
                  ) : (
                    <p className="text-muted mb-0">-</p>
                  )}
                </div>

                {/* Prakriti Impact */}
                <div className="section-card mb-3">
                  <h4 className="mb-2">Prakriti Impact</h4>
                  <ul className="mb-0">
                    <li><strong>Vata</strong> – {ing.prakriti?.vata || '—'}{ing.prakriti?.vataReason ? ` – ${ing.prakriti.vataReason}` : ''}</li>
                    <li><strong>Kapha</strong> – {ing.prakriti?.kapha || '—'}{ing.prakriti?.kaphaReason ? ` – ${ing.prakriti.kaphaReason}` : ''}</li>
                    <li><strong>Pitta</strong> – {ing.prakriti?.pitta || '—'}{ing.prakriti?.pittaReason ? ` – ${ing.prakriti.pittaReason}` : ''}</li>
                  </ul>
                </div>

                {/* Benefits */}
                <div className="section-card mb-3">
                  <h4 className="mb-2">Benefits</h4>
                  {ing.benefitItems?.length ? (
                    <ul className="mb-0">
                      {ing.benefitItems.map((b, i) => (<li key={i}>{b}</li>))}
                    </ul>
                  ) : (
                    <p className="text-muted mb-0">-</p>
                  )}
                </div>

                {/* Ayurvedic Properties */}
                <div className="section-card mb-3">
                  <h4 className="mb-2">Ayurvedic Properties</h4>
                  <ul className="mb-0">
                    <li><strong>Rasa</strong> – {ing.ayurProps?.rasa || '—'}</li>
                    <li><strong>Veerya</strong> – {ing.ayurProps?.veerya || '—'}</li>
                    <li><strong>Guna</strong> – {ing.ayurProps?.guna || '—'}</li>
                    <li><strong>Vipaka</strong> – {ing.ayurProps?.vipaka || '—'}</li>
                  </ul>
                </div>

                {/* Important Formulations */}
                <div className="section-card mb-3">
                  <h4 className="mb-2">Important Formulations</h4>
                  {ing.formulations?.filter(f => f.text || f.iconDataUrl).length ? (
                    <div className="d-flex flex-column">
                      {ing.formulations.map((f, i) => (
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
                  {ing.therapeuticUses?.length ? (
                    <ul className="mb-0">
                      {ing.therapeuticUses.map((t, i) => (<li key={i}>{t}</li>))}
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
                    {ing.plantPartsList?.length ? (
                      ing.plantPartsList.map((row, idx) => (
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
                    <p className="m-0 text-muted">{ing.bestCombinedWith || '-'}</p>
                  </div>
                  <div className="form-group">
                    <label>Geographical locations</label>
                    <p className="m-0 text-muted">{ing.geoLocations || '-'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}