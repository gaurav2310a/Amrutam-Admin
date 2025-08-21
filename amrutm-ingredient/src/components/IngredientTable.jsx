import React, { useState, useEffect } from 'react';
import { Search, Plus, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const seedIngredients = [
  {
    id: 1,
    name: 'Khus Khus',
    description: 'A versatile herb that enhances fertility and aids in treating insomnia. It has a calming...',
    status: 'Active',
    color: '#fef3c7',
    icon: '🌾'
  },
  {
    id: 2,
    name: 'Rakta Chandan',
    description: 'Also known as Red Sandalwood, this herb is prized for its skin-enhancing properties. It...',
    status: 'Active',
    color: '#fecaca',
    icon: '🌿'
  },
  {
    id: 3,
    name: 'Swarn Bhashm',
    description: 'A metallic preparation in Ayurveda, believed to enhance stamina, strength, and overa...',
    status: 'Active',
    color: '#fed7aa',
    icon: '✨'
  },
  {
    id: 4,
    name: 'Giloy',
    description: 'A powerful immunomodulator that boosts overall immunity. It also aids in digestion a...',
    status: 'Active',
    color: '#bbf7d0',
    icon: '🌱'
  },
  {
    id: 5,
    name: 'Bhringraj',
    description: 'Known as the "King of Hair", this herb is renowned for preventing hair loss and treating...',
    status: 'Active',
    color: '#fde68a',
    icon: '🍃'
  }
];

export function IngredientsTable({ ingredients, onRemove }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const data = (Array.isArray(ingredients) && ingredients.length ? ingredients : seedIngredients);

  const filteredIngredients = data.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredIngredients.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = filteredIngredients.slice(startIndex, endIndex);

  // Reset to first page on new search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clamp page if the total pages shrink (e.g., after filtering/removal)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Selection UI removed

  const handleAddIngredient = () => {
    navigate('/add-ingredient');
  };

  return (
    <div className="bg-white rounded shadow-sm border">
      {/* Header */}
      <div className="p-4 border-bottom">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="mb-0">Ingredients List</h4>
          <button 
            onClick={handleAddIngredient}
            className="btn btn-emerald d-flex align-items-center gap-2"
          >
            <Plus size={18} />
            Add Ingredient
          </button>
        </div>

        {/* Search */}
        <div className="position-relative">
          <Search className="position-absolute text-muted" 
                  style={{left: '12px', top: '50%', transform: 'translateY(-50%)'}} size={4 } />
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control ps-5"
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>
                <div className="d-flex align-items-center">
                  <span>Ingredients</span>
                  <ArrowUpDown size={12} className="ms-1 text-muted" />
                </div>
              </th>
              <th>
                <div className="d-flex align-items-center">
                  <span>Description</span>
                  <ArrowUpDown size={12} className="ms-1 text-muted" />
                </div>
              </th>
              <th>
                <div className="d-flex align-items-center">
                  <span>Status</span>
                  <ArrowUpDown size={12} className="ms-1 text-muted" />
                </div>
              </th>
              <th style={{width: '120px'}}>
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>
                  <div
                    className="d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/ingredients/${ingredient.id}`)}
                    title="View overview"
                  >
                    <div className="ingredient-icon me-3" style={{backgroundColor: ingredient.color}}>
                      {ingredient.icon}
                    </div>
                    <span className="fw-medium text-decoration-underline">{ingredient.name}</span>
                  </div>
                </td>
                <td>
                  <p className="mb-0 text-muted small" style={{maxWidth: '400px'}}>{ingredient.description}</p>
                </td>
                <td>
                  <span className="badge status-active">
                    {ingredient.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onRemove && onRemove(ingredient.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-top">
        <div className="d-flex align-items-center justify-content-between">
          <p className="mb-0 text-muted small">
            {filteredIngredients.length === 0
              ? 'No results'
              : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredIngredients.length)} of ${filteredIngredients.length} results`}
          </p>
          <div className="d-flex align-items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="btn btn-sm btn-outline-secondary"
              disabled={safePage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${safePage === page ? 'btn-emerald' : 'btn-outline-secondary'}`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="btn btn-sm btn-outline-secondary"
              disabled={safePage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}