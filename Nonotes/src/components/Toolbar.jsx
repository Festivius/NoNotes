import React from 'react'
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight, 
  FaPlus, 
  FaMinus,
  FaListUl,
  FaIndent,
  FaOutdent
} from 'react-icons/fa'

const Toolbar = () => {
  return (
    <div style={styles.toolbar} class="flex w-[45%] items-center justify-center">
      <div style={styles.toolbarGroup}>
        <select style={styles.select} defaultValue="Arial">
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Helvetica</option>
          <option>Courier New</option>
        </select>
        <select style={styles.select} defaultValue="12">
          {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32].map(size => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>
      <div style={styles.toolbarGroup}>
        <button style={styles.toolbarButton}><FaPlus title="Increase font size" /></button>
        <button style={styles.toolbarButton}><FaMinus title="Decrease font size" /></button>
      </div>
      <div style={styles.toolbarDivider} />
      <div style={styles.toolbarGroup}>
        <button style={styles.toolbarButton}><FaBold /></button>
        <button style={styles.toolbarButton}><FaItalic /></button>
        <button style={styles.toolbarButton}><FaUnderline /></button>
      </div>
      <div style={styles.toolbarDivider} />
      <div style={styles.toolbarGroup}>
        <button style={styles.toolbarButton}><FaAlignLeft /></button>
        <button style={styles.toolbarButton}><FaAlignCenter /></button>
        <button style={styles.toolbarButton}><FaAlignRight /></button>
      </div>
      <div style={styles.toolbarDivider} />
      <div style={styles.toolbarGroup}>
        <button style={styles.toolbarButton}><FaListUl /></button>
        <button style={styles.toolbarButton}><FaIndent /></button>
        <button style={styles.toolbarButton}><FaOutdent /></button>
      </div>
    </div>
  )
}

const styles = {
  toolbar: {
    display: 'flex',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    gap: '8px',
    alignItems: 'center'
  },
  toolbarGroup: {
    display: 'flex',
    gap: '4px'
  },
  toolbarButton: {
    padding: '6px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0e0e0'
    }
  },
  toolbarDivider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#ddd',
    margin: '0 8px'
  },
  select: {
    padding: '4px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '14px',
    marginRight: '4px'
  }
}

export default Toolbar