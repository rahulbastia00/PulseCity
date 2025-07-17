// src/components/BackgroundAnimation.jsx


import React, { useEffect, useState } from 'react';

export default function BackgroundAnimation({ floatingElements, geometricShapes, particles }) {
  const [morphingBlobs, setMorphingBlobs] = useState([]);
  const [gridLines, setGridLines] = useState([]);
  const [atlassianShapes, setAtlassianShapes] = useState([]);

  useEffect(() => {
    // Create morphing blobs
    const blobs = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 80 + Math.random() * 120,
      delay: Math.random() * 4,
      color: ['#0052cc', '#0065ff', '#00875a', '#ff5630', '#6554c0'][Math.floor(Math.random() * 5)]
    }));
    setMorphingBlobs(blobs);

    // Create grid lines
    const lines = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      length: 50 + Math.random() * 100,
      angle: Math.random() * 360,
      delay: Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.2
    }));
    setGridLines(lines);

    // Create Atlassian-inspired shapes
    const shapes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 20 + Math.random() * 40,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      type: ['circle', 'square', 'triangle', 'hexagon'][Math.floor(Math.random() * 4)],
      color: ['#0052cc', '#0065ff', '#00875a'][Math.floor(Math.random() * 3)]
    }));
    setAtlassianShapes(shapes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-hero">
      {/* Morphing blobs */}
      {morphingBlobs.map(blob => (
        <div
          key={`blob-${blob.id}`}
          className="absolute animate-morph"
          style={{
            left: `${blob.left}%`,
            top: `${blob.top}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            backgroundColor: blob.color,
            opacity: 0.1,
            animationDelay: `${blob.delay}s`,
            animationDuration: '8s'
          }}
        />
      ))}

      {/* Grid lines */}
      {gridLines.map(line => (
        <div
          key={`line-${line.id}`}
          className="absolute bg-blue-200"
          style={{
            left: `${line.left}%`,
            top: `${line.top}%`,
            width: `${line.length}px`,
            height: '1px',
            transform: `rotate(${line.angle}deg)`,
            opacity: line.opacity,
            animationDelay: `${line.delay}s`,
            animationDuration: '10s'
          }}
        />
      ))}

      {/* Atlassian-inspired shapes */}
      {atlassianShapes.map(shape => (
        <div
          key={`atlassian-${shape.id}`}
          className={`absolute animate-rotate-slow`}
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            opacity: 0.15,
            animationDelay: `${shape.delay}s`,
            animationDuration: '20s',
            transform: `rotate(${shape.rotation}deg)`,
            ...(shape.type === 'circle' && { borderRadius: '50%' }),
            ...(shape.type === 'triangle' && {
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }),
            ...(shape.type === 'hexagon' && {
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            })
          }}
        />
      ))}

      {/* Original floating elements with enhanced animations */}
      {floatingElements.map(el => (
        <div
          key={`circle-${el.id}`}
          className="absolute rounded-full bg-blue-300 animate-float animate-pulse-glow"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            opacity: el.opacity,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`
          }}
        />
      ))}

      {/* Enhanced geometric shapes */}
      {geometricShapes.map(shape => (
        <div
          key={`shape-${shape.id}`}
          className={`absolute animate-rotate-slow animate-pulse-glow`}
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: '#0065ff',
            opacity: 0.2,
            animationDelay: `${shape.delay}s`,
            animationDuration: `${shape.duration}s`,
            transform: `rotate(${shape.rotation}deg)`,
            ...(shape.shape === 'square' && {}),
            ...(shape.shape === 'triangle' && {
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }),
            ...(shape.shape === 'hexagon' && {
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            })
          }}
        />
      ))}

      {/* Enhanced particles */}
      {particles.map(p => (
        <div
          key={`particle-${p.id}`}
          className="absolute bg-blue-400 rounded-full animate-bounce-gentle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}

      {/* Wave effect overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-50 to-transparent animate-wave" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-transparent" />
    </div>
  );
}

