export const circles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 8 + Math.random() * 4,
    size: 6 + Math.random() * 12,
    opacity: 0.1 + Math.random() * 0.3
}))

export const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 12 + Math.random() * 6,
    size: 20 + Math.random() * 40,
    rotation: Math.random() * 360,
    shape: ['square', 'triangle', 'hexagon'][Math.floor(Math.random() * 3)]
}));


export const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 15 + Math.random() * 10,
    size: 1 + Math.random() * 3,
    opacity: 0.2 + Math.random() * 0.4
}));

