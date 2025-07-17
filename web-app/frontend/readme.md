# City Pulse - Enhanced Authentication Page

A beautiful, responsive authentication page inspired by Atlassian's design with sophisticated animations and modern UI/UX.

## Features

### 🎨 **Atlassian-Inspired Design**
- Clean, modern interface with glass morphism effects
- Professional color scheme using Atlassian's brand colors
- Responsive layout that works on all devices

### ✨ **Advanced Animations**
- Morphing blob animations in the background
- Floating geometric shapes with smooth transitions
- Particle effects and grid lines
- Auto-rotating feature showcase
- Micro-interactions on form elements

### 🔐 **Authentication Features**
- **Login Form**: Email/password with social login options
- **Signup Form**: Complete registration with role selection
- **Form Validation**: Real-time error handling
- **Password Toggle**: Show/hide password functionality
- **Remember Me**: Checkbox for persistent login
- **Social Login**: Google and Twitter integration ready

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interface elements
- Adaptive animations for different screen sizes

### 🎯 **User Experience**
- Smooth transitions and hover effects
- Loading states with spinners
- Focus management and accessibility
- Trust indicators (SSL, GDPR, Support)
- Feature showcase with statistics

## Technology Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool
- **React Router** - Client-side routing

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx      # Enhanced login form
│   │   └── Signup.jsx     # Enhanced signup form
│   └── BackgroundAnimation.jsx  # Sophisticated background animations
├── pages/
│   └── Auth.jsx           # Main authentication page
├── index.css              # Custom animations and styles
└── App.jsx               # App router setup
```

## Animation Features

### Background Elements
- **Morphing Blobs**: Organic shapes that continuously morph
- **Geometric Shapes**: Rotating triangles, squares, hexagons
- **Floating Particles**: Subtle bouncing dots
- **Grid Lines**: Dynamic line patterns
- **Wave Effects**: Bottom wave animation

### Form Interactions
- **Focus States**: Enhanced focus rings and color changes
- **Hover Effects**: Smooth scale and shadow transitions
- **Loading States**: Spinning animations during form submission
- **Error Animations**: Smooth error message transitions

### Page Transitions
- **Slide Animations**: Content slides in from left/right
- **Fade Effects**: Smooth opacity transitions
- **Scale Effects**: Button hover and active states

## Customization

### Colors
The design uses Atlassian's color palette:
- Primary: `#0052cc` (Atlassian Blue)
- Secondary: `#0065ff` (Light Blue)
- Accent: `#00875a` (Green)
- Background: Gradient combinations

### Animations
All animations are defined in `src/index.css` and can be easily customized:
- Duration adjustments
- Easing functions
- Animation delays
- Keyframe modifications

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Optimized animations using CSS transforms
- Efficient React rendering with proper state management
- Minimal bundle size with tree shaking
- Fast loading with Vite's build optimization

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

---

Built with ❤️ using modern web technologies for a delightful user experience.
