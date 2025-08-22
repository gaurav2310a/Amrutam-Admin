import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { IngredientsTable } from '../components/IngredientTable';


const seedIngredients = [
  { id: 1, name: 'Khus Khus', description: 'A versatile herb that enhances fertility and aids in treating insomnia. It has a calming...', status: 'Active', color: '#fef3c7', icon: '🌾' },
  { id: 2, name: 'Rakta Chandan', description: 'Also known as Red Sandalwood, this herb is prized for its skin-enhancing properties. It...', status: 'Active', color: '#fecaca', icon: '🌿' },
  { id: 3, name: 'Swarn Bhashm', description: 'A metallic preparation in Ayurveda, believed to enhance stamina, strength, and overa...', status: 'Active', color: '#fed7aa', icon: '✨' },
  { id: 4, name: 'Giloy', description: 'A powerful immunomodulator that boosts overall immunity. It also aids in digestion a...', status: 'Active', color: '#bbf7d0', icon: '🌱' },
  { id: 5, name: 'Bhringraj', description: 'Known as the "King of Hair", this herb is renowned for preventing hair loss and treating...', status: 'Active', color: '#fde68a', icon: '🍃' }
];

const IngredientList = () => {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ingredients') || 'null');
      if (Array.isArray(stored) && stored.length) {
        setIngredients(stored);
      } else {
        localStorage.setItem('ingredients', JSON.stringify(seedIngredients));
        setIngredients(seedIngredients);
      }
    } catch (e) {
      // fallback to seed on parse error
      localStorage.setItem('ingredients', JSON.stringify(seedIngredients));
      setIngredients(seedIngredients);
    }
  }, []);

  const handleRemove = (id) => {
    setIngredients((prev) => {
      const next = prev.filter((i) => i.id !== id);
      localStorage.setItem('ingredients', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div>
      
      <Sidebar />
      <Header />
      
      <div className="main-content p-4">
        <div className="container-fluid">
          <div className="mb-4">
            <h2 className="mb-2">Ingredients</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small text-muted">
                <li className="breadcrumb-item active fw-medium text-dark">Ingredients List</li>
              </ol>
            </nav>
          </div>
          <IngredientsTable ingredients={ingredients} onRemove={handleRemove} />
        </div>
      </div>
    </div>
  );
};

export default IngredientList;