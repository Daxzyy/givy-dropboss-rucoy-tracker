import React, { useState, useMemo, useEffect } from 'react'

function App() {
  const [allDrops, setAllDrops] = useState([])
  const [filter, setFilter] = useState('all')
  const [showHelp, setShowHelp] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    try {
      const decodedData = atob(__SECRET_DATA__)
      const drops = JSON.parse(decodedData)
      setAllDrops(drops)
    } catch (err) {
      console.error('Error loading drops:', err)
    }
  }, [])

  const filteredDrops = useMemo(() => {
    return filter === 'all' ? allDrops : allDrops.filter(i => i.type === filter)
  }, [filter, allDrops])

  const stats = useMemo(() => ({
    total: allDrops.length,
    ultra: allDrops.filter(i => i.type === 'ultra-rare').length,
    blue: allDrops.filter(i => i.type === 'blue-rare').length
  }), [allDrops])

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>
        <img src="https://b.thumbs.redditmedia.com/geuGUsn_TJnfI89uiZFI5mMcZwyXGxFMx1SFMJVtZ4k.png" style={styles.logo} alt="Rucoy Logo" />
        Xzydanzz Boss Drop
      </h1>

      <div style={styles.card}>
        <div style={styles.toggleRow} onClick={() => setShowHelp(!showHelp)}>
          <input type="checkbox" checked={showHelp} readOnly style={styles.checkbox} />
          <label style={styles.toggleLabel}><i className="fa-solid fa-circle-info"></i> View Help / Info</label>
        </div>

        {showHelp && (
          <div style={styles.infoBox}>
            <p><b>Boss Drop Tracker</b><br />Catatan item drop dari boss milik <a href="https://www.rucoyonline.com/characters/Xzydanzz" target="_blank" rel="noreferrer" style={styles.link}>Xzydanzz</a>. Klik item untuk melihat detail.</p>
          </div>
        )}

        <div style={styles.divider}></div>

        <label style={styles.filterLabel}>Filter by Rarity</label>
        <div style={styles.filterRow}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
            <option value="all">All Rarity</option>
            <option value="ultra-rare">Ultra Rare</option>
            <option value="blue-rare">Blue Rare</option>
          </select>
        </div>

        <button onClick={() => window.location.reload()} style={styles.button}>
          <span style={styles.shimmer}></span>
          <i className="fa-solid fa-refresh"></i> Refresh Page
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.stats}>
          <div style={styles.statsItem}>
            <span style={styles.statsLabel}>Total Drops:</span>
            <span style={styles.statsValue}>{stats.total}</span>
          </div>
          <div style={styles.statsItem}>
            <span style={styles.statsLabel}>Ultra Rare:</span>
            <span style={styles.statsValue}>{stats.ultra}</span>
          </div>
          <div style={styles.statsItem}>
            <span style={styles.statsLabel}>Blue Rare:</span>
            <span style={styles.statsValue}>{stats.blue}</span>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.dropList}>
          {filteredDrops.map((item, index) => (
            <div 
              key={index} 
              style={{
                ...styles.dropItem,
                ...(item.type === 'ultra-rare' ? styles.dropItemUltraRare : styles.dropItemBlueRare),
                ...(expandedId === index ? styles.dropItemExpanded : {})
              }}
              onClick={() => setExpandedId(expandedId === index ? null : index)}
            >
              <div style={styles.dropHeader}>
                <div style={{...styles.dropIcon, ...(item.noIconBg ? styles.dropIconNoBg : {})}}>
                  <img src={item.img} alt={item.nama} style={styles.dropImg} />
                </div>
                <div style={styles.dropInfo}>
                  <p style={styles.dropName}>{item.nama}</p>
                  <p style={styles.dropDate}>{item.tanggal}</p>
                </div>
                <div style={{
                  ...styles.dropBadge,
                  ...(item.type === 'ultra-rare' ? styles.dropBadgeUltra : styles.dropBadgeBlue)
                }}>
                  {item.type === 'ultra-rare' ? 'Ultra Rare' : 'Blue Rare'}
                </div>
                <div style={{...styles.dropToggle, ...(expandedId === index ? styles.dropToggleRotated : {})}}>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {expandedId === index && (
                <div style={styles.dropDetails}>
                  <div style={styles.dropDetailsContent}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Item Name:</span>
                      <span style={styles.detailValue}>{item.nama}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Boss:</span>
                      <span style={styles.detailValue}>{item.boss}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Drop Date:</span>
                      <span style={styles.detailValue}>{item.tanggal}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Rarity:</span>
                      <span style={styles.detailValue}>{item.type === 'ultra-rare' ? 'Ultra Rare' : 'Blue Rare'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        © 2026 <a href="https://www.rucoyonline.com/" target="_blank" rel="noreferrer" style={styles.footerLink}>Rucoy Online</a> · Boss Drop Tracker
      </div>

      <style>{`
        * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-touch-callout: none;
        }

        body {
          background-color: #1a1a1a;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 72px 72px;
          font-family: 'Ubuntu Mono', monospace;
          color: #e8f5e9;
          margin: 0;
          padding: 14px;
          text-align: center;
          user-select: none;
          -webkit-user-select: none;
          min-height: 100vh;
        }

        button {
          margin-top: 12px;
          width: 100%;
          padding: 10px;
          background: #4caf50;
          border: none;
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          border-radius: 8px;
          font-family: 'Ubuntu Mono', monospace;
          font-size: 15px;
          cursor: pointer;
          color: white;
          position: relative;
          overflow: hidden;
          -webkit-appearance: none;
          appearance: none;
          touch-action: manipulation;
          font-weight: 700;
        }

        button:hover {
          background: #45a049;
        }

        button span {
          position: absolute;
          top: -10%;
          left: -150%;
          width: 55%;
          height: 120%;
          background: linear-gradient(105deg, transparent 10%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 48%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 255, 0) 70%, transparent 90%);
          transform: skewX(-18deg);
          pointer-events: none;
          transition: none;
          z-index: 2;
        }

        button:hover span {
          left: 180%;
          transition: left 1.1s cubic-bezier(0.2, 0.6, 0.4, 1);
        }

        @media (max-width: 600px) {
          body {
            padding: 14px;
          }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '520px',
    margin: 'auto',
    marginBottom: '60px',
  },
  h1: {
    fontSize: '20px',
    color: '#ffff9c',
    marginBottom: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    textShadow: '-1px 0 #313131, 0 1px #313131, 1px 0 #313131, 0 -1px #313131',
    margin: '0 0 14px 0'
  },
  logo: {
    width: '36px',
    height: '36px',
    objectFit: 'contain',
    borderRadius: '6px',
  },
  card: {
    background: '#242424',
    border: '2px solid #4bc53d',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '12px',
    boxShadow: '0 0 10px rgba(76, 197, 61, 0.15)',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '8px',
    cursor: 'pointer',
  },
  checkbox: {
    appearance: 'none',
    WebkitAppearance: 'none',
    width: '18px',
    minWidth: '18px',
    height: '18px',
    border: '2px solid #4caf50',
    borderRadius: '4px',
    background: '#0f2818',
    cursor: 'pointer',
    position: 'relative',
    flexShrink: 0,
  },
  toggleLabel: {
    display: 'inline',
    margin: '0',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#ffff9c',
    lineHeight: '1',
  },
  infoBox: {
    background: '#0f2818',
    border: '1px solid #2d8659',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '8px',
    fontSize: '13px',
    textAlign: 'left',
    lineHeight: '1.6',
    color: '#c8e6c9',
  },
  link: {
    color: '#1bd18a',
    textDecoration: 'none',
  },
  divider: {
    borderTop: '1px solid #2d8659',
    margin: '12px 0',
  },
  filterLabel: {
    display: 'block',
    marginTop: '8px',
    marginBottom: '3px',
    fontSize: '14px',
  },
  filterRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
  },
  select: {
    flex: 1,
    padding: '7px',
    border: '1px solid #2d8659',
    borderRadius: '6px',
    background: '#0f2818',
    color: '#e8f5e9',
    fontFamily: "'Ubuntu Mono', monospace",
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    cursor: 'pointer',
  },
  button: {
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    top: '-10%',
    left: '-150%',
    width: '55%',
    height: '120%',
    background: 'linear-gradient(105deg, transparent 10%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 48%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 255, 0) 70%, transparent 90%)',
    transform: 'skewX(-18deg)',
    pointerEvents: 'none',
    transition: 'none',
    zIndex: 2,
  },
  stats: {
    background: '#0f2818',
    border: '1px solid #2d8659',
    borderRadius: '8px',
    padding: '12px',
    margin: '12px 0',
    fontSize: '14px',
    textAlign: 'left',
  },
  statsItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0',
  },
  statsLabel: {
    color: '#c8e6c9',
  },
  statsValue: {
    color: '#4caf50',
    fontWeight: '700',
  },
  dropList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dropItem: {
    background: 'rgba(76, 175, 80, 0.06)',
    border: '1px solid #2d8659',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  dropItemUltraRare: {
    background: 'rgba(255, 0, 255, 0.06)',
    borderColor: 'rgba(255, 0, 255, 0.3)',
  },
  dropItemBlueRare: {
    background: 'rgba(0, 118, 156, 0.06)',
    borderColor: 'rgba(0, 118, 156, 0.3)',
  },
  dropItemExpanded: {
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
  },
  dropHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
  },
  dropIcon: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dropIconNoBg: {
    background: 'none',
  },
  dropImg: {
    width: '24px',
    height: '24px',
    borderRadius: '3px',
  },
  dropInfo: {
    flex: 1,
    textAlign: 'left',
  },
  dropName: {
    fontSize: '13px',
    fontWeight: '700',
    margin: '0',
    color: '#e8f5e9',
  },
  dropDate: {
    fontSize: '11px',
    color: '#c8e6c9',
    margin: '3px 0 0 0',
  },
  dropBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  dropBadgeUltra: {
    background: '#ff00ff',
    color: 'white',
  },
  dropBadgeBlue: {
    background: '#00769C',
    color: 'white',
  },
  dropToggle: {
    color: '#4caf50',
    fontSize: '14px',
    transition: 'transform 0.3s ease',
  },
  dropToggleRotated: {
    transform: 'rotate(180deg)',
  },
  dropDetails: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  dropDetailsContent: {
    padding: '12px',
    fontSize: '12px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '6px 0',
  },
  detailLabel: {
    color: '#4caf50',
    fontWeight: '700',
  },
  detailValue: {
    color: '#e8f5e9',
    textAlign: 'right',
  },
  footer: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: '#0f2818',
    borderTop: '1px solid #2d8659',
    textAlign: 'center',
    padding: '10px',
    fontSize: '13px',
    color: '#66bb6a',
    letterSpacing: '0.5px',
    zIndex: '1',
  },
  footerLink: {
    color: '#4caf50',
    textDecoration: 'none',
    fontWeight: '700',
  },
}

export default App
