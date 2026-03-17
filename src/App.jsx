import React, { useState, useMemo, useEffect } from 'react'
import './App.css'

function App() {
  const [allDrops, setAllDrops] = useState([])
  const [filter, setFilter] = useState('all')
  const [showHelp, setShowHelp] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    loadDrops()
  }, [])

  const loadDrops = async () => {
    try {
      const response = await fetch('drops.json', { cache: 'no-store' })
      if (!response.ok) throw new Error('Failed to fetch drops')
      const drops = await response.json()
      setAllDrops(drops)
    } catch (err) {
      console.error('Error loading drops:', err)
      try {
        const decodedData = atob(__SECRET_DATA__)
        const drops = JSON.parse(decodedData)
        setAllDrops(drops)
      } catch (fallbackErr) {
        console.error('Error loading fallback data:', fallbackErr)
      }
    }
  }

  const filteredDrops = useMemo(() => {
    return filter === 'all' ? allDrops : allDrops.filter(i => i.type === filter)
  }, [filter, allDrops])

  const stats = useMemo(() => ({
    total: allDrops.length,
    ultra: allDrops.filter(i => i.type === 'ultra-rare').length,
    blue: allDrops.filter(i => i.type === 'blue-rare').length
  }), [allDrops])

  return (
    <div className="container">
      <h1>
        <img src="https://b.thumbs.redditmedia.com/geuGUsn_TJnfI89uiZFI5mMcZwyXGxFMx1SFMJVtZ4k.png" className="logo" alt="Rucoy Logo" />
        Xzydanzz Boss Drop
      </h1>

      <div className="card">
        <div className="toggle-row" onClick={() => setShowHelp(!showHelp)}>
          <input type="checkbox" checked={showHelp} readOnly />
          <label><i className="fa-solid fa-circle-info"></i> View Help / Info</label>
        </div>

        {showHelp && (
          <div className="info-box">
            <p><b>Boss Drop Tracker</b><br />Catatan item drop dari boss milik <a href="https://www.rucoyonline.com/characters/Xzydanzz" target="_blank" rel="noreferrer">Xzydanzz</a>. Klik item untuk melihat detail.</p>
          </div>
        )}

        <div className="divider"></div>

        <label>Filter by Rarity</label>
        <div className="filter-row">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Rarity</option>
            <option value="ultra-rare">Ultra Rare</option>
            <option value="blue-rare">Blue Rare</option>
          </select>
        </div>

        <button onClick={loadDrops}>
          <span></span>
          <i className="fa-solid fa-refresh"></i> Refresh
        </button>
      </div>

      <div className="card">
        <div className="stats">
          <div className="stats-item">
            <span className="stats-label">Total Drops:</span>
            <span className="stats-value">{stats.total}</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">Ultra Rare:</span>
            <span className="stats-value">{stats.ultra}</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">Blue Rare:</span>
            <span className="stats-value">{stats.blue}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="drop-list">
          {filteredDrops.map((item, index) => (
            <div 
              key={index} 
              className={`drop-item ${item.type} ${expandedId === index ? 'expanded' : ''}`}
              onClick={() => setExpandedId(expandedId === index ? null : index)}
            >
              <div className="drop-header">
                <div className={`drop-icon ${item.noIconBg ? 'no-bg' : ''}`}>
                  <img src={item.img} alt={item.nama} />
                </div>
                <div className="drop-info">
                  <p className="drop-name">{item.nama}</p>
                  <p className="drop-date">{item.tanggal}</p>
                </div>
                <div className={`drop-badge ${item.type === 'ultra-rare' ? 'ultra' : 'blue'}`}>
                  {item.type === 'ultra-rare' ? 'Ultra Rare' : 'Blue Rare'}
                </div>
                <div className="drop-toggle">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <div className="drop-details">
                <div className="drop-details-content">
                  <div className="detail-row">
                    <span className="detail-label">Item Name:</span>
                    <span className="detail-value">{item.nama}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Boss:</span>
                    <span className="detail-value">{item.boss}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Drop Date:</span>
                    <span className="detail-value">{item.tanggal}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Rarity:</span>
                    <span className="detail-value">{item.type === 'ultra-rare' ? 'Ultra Rare' : 'Blue Rare'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="footer">
        © 2026 <a href="https://www.rucoyonline.com/" target="_blank" rel="noreferrer">Rucoy Online</a> · Boss Drop Tracker
      </div>
    </div>
  )
}

export default App
