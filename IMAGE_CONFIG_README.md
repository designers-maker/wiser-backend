# Image Configuration System

This project uses a centralized image configuration system to manage all image URLs across different environments.

## 📁 File Structure

```
src/config/images.js          # Main image configuration
.env.development             # Development environment variables
.env.production              # Production environment variables  
.env.local                   # Local development variables
```

## 🖼️ How It Works

### 1. Individual Logo URLs
Each logo now has its own separate URL that can be configured:

```javascript
// In your components
import { LOGOS } from '../config/images';

// Each logo has its own URL
<img src={LOGOS.partner1} alt="Partner 1" />
<img src={LOGOS.partner2} alt="Partner 2" />
<img src={LOGOS.partner3} alt="Partner 3" />
// partner4 is excluded as requested
<img src={LOGOS.partner5} alt="Partner 5" />
<img src={LOGOS.partner6} alt="Partner 6" />
```

### 2. Environment Variables
Each logo URL can be overridden using environment variables:

```bash
# .env files
REACT_APP_PARTNER1_LOGO=https://your-cdn.com/logos/partner1.png
REACT_APP_PARTNER2_LOGO=https://your-cdn.com/logos/partner2.png
REACT_APP_PARTNER3_LOGO=https://your-cdn.com/logos/partner3.png
REACT_APP_PARTNER5_LOGO=https://your-cdn.com/logos/partner5.png
REACT_APP_PARTNER6_LOGO=https://your-cdn.com/logos/partner6.png
```

### 3. Fallback System
If no environment variable is set, it falls back to the default path:
```
partner1 → /logos/partner1.png
partner2 → /logos/partner2.png
partner3 → /logos/partner3.png
partner5 → /logos/partner5.png
partner6 → /logos/partner6.png
```

## 🚀 Usage Examples

### In Components:
```javascript
import { LOGOS, getPartnerLogos } from '../config/images';

// Use individual logos
function PartnerSection() {
  return (
    <div>
      <img src={LOGOS.partner1} alt="Partner 1" />
      <img src={LOGOS.partner2} alt="Partner 2" />
      <img src={LOGOS.partner3} alt="Partner 3" />
      <img src={LOGOS.partner5} alt="Partner 5" />
      <img src={LOGOS.partner6} alt="Partner 6" />
    </div>
  );
}

// Or use the helper function (excludes partner4)
function TrustedPartners() {
  return (
    <div className="flex">
      {getPartnerLogos().map((logo, i) => (
        <img key={i} src={logo} alt={`Partner ${i+1}`} />
      ))}
    </div>
  );
}
```

## ⚙️ Environment Configuration

### For Netlify Deployment:
1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add individual logo URLs:
   ```
   REACT_APP_PARTNER1_LOGO=https://your-cdn.com/partner1.png
   REACT_APP_PARTNER2_LOGO=https://your-cdn.com/partner2.png
   # ... etc
   ```

### For Local Development:
Edit `.env.local` file:
```bash
REACT_APP_PARTNER1_LOGO=/logos/partner1.png
REACT_APP_PARTNER2_LOGO=/logos/partner2.png
# ... etc
```

## 📋 Available Logos

- `partner1` - Partner 1 logo
- `partner2` - Partner 2 logo  
- `partner3` - Partner 3 logo
- `partner5` - Partner 5 logo (partner4 excluded)
- `partner6` - Partner 6 logo
- `asdc` - ASDC logo
- `awake` - Awake logo
- `barclays` - Barclays logo
- `beml` - BEML logo
- `biofin` - Biofin logo

## 🎯 Benefits

1. **Separate URLs**: Each logo can have its own CDN or hosting location
2. **Environment-specific**: Different URLs for dev/production
3. **Easy maintenance**: Change URLs in one place
4. **Flexible deployment**: Works with any hosting setup
5. **Backward compatible**: Falls back to default paths if needed

This system ensures your "Trusted by Industry Leaders" section works perfectly across all deployment environments!