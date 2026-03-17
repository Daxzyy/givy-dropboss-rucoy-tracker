import React, { useState, useMemo } from 'react'
import './App.css'
import dropsData from './drops.json'

function App() {
  const allDrops = useMemo(() => {
    try {
      if (typeof __SECRET_DATA__ !== 'undefined' && __SECRET_DATA__) {
        return JSON.parse(atob(__SECRET_DATA__))
      }
      return dropsData
    } catch (e) {
      return dropsData
    }
  }, [])

  const [filter, setFilter] = useState('all')
  const [showHelp, setShowHelp] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

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
        <img src="https://b.thumbs.redditmedia.com/geuGUsn_TJnfI89uiZFI5mMcZwyXGxFMx1SFMJVtZ4k.png" className="logo" alt="Logo" />
        Xzydanzz Boss Drop
      </h1>

      <div className="card">
        <div className="toggle-row" onClick={() => setShowHelp(!showHelp)}>
          <input type="checkbox" checked={showHelp} readOnly />
          <label><i className="fa-solid fa-circle-info"></i> View Help / Info</label>
        </div>

        <div className={`instructions ${showHelp ? 'show' : ''}`}>
          <div className="info-box">
            <p><b>Boss Drop Tracker</b><br />Catatan item drop dari boss milik <a href="https://www.rucoyonline.com/characters/Xzydanzz" target="_blank" rel="noreferrer" style={{color: '#1bd18a'}}>Xzydanzz</a>. Klik item untuk melihat detail.</p>
          </div>
        </div>

        <div className="divider"></div>

        <label style={{display: 'block', marginBottom: '5px', fontSize: '14px'}}>Filter by Rarity</label>
        <div className="filter-row">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Rarity</option>
            <option value="ultra-rare">Ultra Rare</option>
            <option value="blue-rare">Blue Rare</option>
          </select>
        </div>

        <button onClick={() => window.location.reload()}><span className="shimmer"></span><i className="fa-solid fa-refresh"></i> Refresh Page</button>
      </div>

      <div className="card">
        <div className="stats">
          <div className="stats-item"><span className="stats-label">Total Drops:</span><span className="stats-value">{stats.total}</span></div>
          <div className="stats-item"><span className="stats-label">Ultra Rare:</span><span className="stats-value">{stats.ultra}</span></div>
          <div className="stats-item"><span className="stats-label">Blue Rare:</span><span className="stats-value">{stats.blue}</span></div>
        </div>
      </div>

      <div className="card">
        {filteredDrops.length === 0 ? (
          <div className="empty-state">Tidak ada data untuk filter ini.</div>
        ) : (
          <div className="drop-list">
            {filteredDrops.map((item, index) => (
              <div key={index} className={`drop-item ${item.type} ${expandedId === index ? 'expanded' : ''}`} onClick={() => setExpandedId(expandedId === index ? null : index)}>
                <div className="drop-header">
                  <div className={`drop-icon ${item.noIconBg ? 'no-bg' : ''}`}>
                    <img src={item.img} alt={item.nama} style={{width: '24px', height: '24px', borderRadius: '3px'}} />
                  </div>
                  <div className="drop-info">
                    <p className="drop-name">{item.nama}</p>
                    <p className="drop-date">{item.tanggal}</p>
                  </div>
                  <div className={`drop-badge ${item.type === 'ultra-rare' ? 'ultra' : 'blue'}`}>{item.rarity}</div>
                  <div className="drop-toggle"><i className="fa-solid fa-chevron-down"></i></div>
                </div>
                {expandedId === index && (
                  <div className="drop-details">
                    <div className="drop-details-content">
                      <div className="detail-row"><span className="detail-label">Item Name:</span><span className="detail-value">{item.nama}</span></div>
                      <div className="detail-row"><span className="detail-label">Boss:</span><span className="detail-value">{item.boss}</span></div>
                      <div className="detail-row"><span className="detail-label">Drop Date:</span><span className="detail-value">{item.tanggal}</span></div>
                      <div className="detail-row"><span className="detail-label">Rarity:</span><span className="detail-value">{item.rarity}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="footer">
        © 2026 <a href="https://www.rucoyonline.com/" target="_blank" rel="noreferrer" style={{color: '#4caf50'}}>Rucoy Online</a> · Boss Drop Tracker
      </div>
    </div>
  )
}

export default App
