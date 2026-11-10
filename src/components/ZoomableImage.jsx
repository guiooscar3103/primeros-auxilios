import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Eye } from 'lucide-react'
import './ZoomableImage.css'

export default function ZoomableImage({
  src,
  alt = '',
  className = '',
  caption = '',
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalZoom, setModalZoom] = useState(1)
  const hoverTimeoutRef = useRef(null)

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 200)
  }

  const openModal = (e) => {
    if (e) e.stopPropagation()
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(false)
    setIsModalOpen(true)
    setModalZoom(1)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsHovered(false)
  }

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  return (
    <>
      {/* Contenedor miniatura en la tarjeta */}
      <div
        className="zoomable-thumbnail-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openModal(e)}
        aria-label={`Agrandar imagen en pantalla: ${alt || 'infografía'}`}
        title="Pasa el mouse para agrandar en la pantalla o haz clic para fijar"
      >
        <img
          src={src}
          alt={alt}
          className={`zoomable-thumbnail-img ${className}`}
          loading="eager"
        />

        {/* Insignia indicadora de agrandar en pantalla */}
        <div className="zoomable-thumbnail-badge">
          <Eye size={14} className="badge-icon" />
          <span>Pasa el mouse para agrandar</span>
        </div>
      </div>

      {/* 1. Vista Agrandada Flotante al pasar el mouse (Toda la imagen grande en pantalla) */}
      {isHovered && !isModalOpen && (
        <>
          <div className="hover-expanded-backdrop" />
          <div
            className="hover-expanded-overlay"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={openModal}
            role="region"
            aria-label="Vista agrandada de la imagen"
          >
            <div className="hover-expanded-header">
              <span className="hover-expanded-title">{alt || caption || 'Vista ampliada'}</span>
              <div className="hover-expanded-tags">
                <span className="hover-expanded-hint">
                  <Maximize2 size={13} /> Clic para fijar
                </span>
                <button
                  type="button"
                  className="hover-close-quick-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsHovered(false)
                  }}
                  title="Cerrar vista previa"
                  aria-label="Cerrar vista previa"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="hover-expanded-body">
              <img src={src} alt={alt} className="hover-expanded-img" />
            </div>

            {caption && <p className="hover-expanded-caption">{caption}</p>}
          </div>
        </>
      )}

      {/* 2. Modal Completo Fijo al hacer clic */}
      {isModalOpen && (
        <div className="zoom-modal-backdrop" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="zoom-modal-header">
              <span className="zoom-modal-title">{alt || caption || 'Vista en tamaño completo'}</span>
              <div className="zoom-modal-controls">
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setModalZoom((prev) => Math.min(prev + 0.3, 2.5))}
                  title="Aumentar zoom"
                  aria-label="Aumentar zoom"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setModalZoom((prev) => Math.max(prev - 0.3, 0.7))}
                  title="Reducir zoom"
                  aria-label="Reducir zoom"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  className="modal-ctrl-btn"
                  onClick={() => setModalZoom(1)}
                  title="Restablecer tamaño"
                  aria-label="Restablecer tamaño"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closeModal}
                  title="Cerrar (Escape)"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="zoom-modal-body">
              <img
                src={src}
                alt={alt}
                className="zoom-modal-img"
                style={{
                  transform: `scale(${modalZoom})`,
                }}
              />
            </div>

            {caption && <p className="zoom-modal-caption">{caption}</p>}
          </div>
        </div>
      )}
    </>
  )
}

ZoomableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  caption: PropTypes.string,
}
