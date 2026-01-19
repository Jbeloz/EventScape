# EventScape - Quick Start Guide

## 🚀 Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
cd c:\Users\Houro\Desktop\React\eventscape
npm install
```

### Step 2: Start the App
```bash
expo start
```

### Step 3: Choose Your Platform
```
Press 'a' → Android Emulator
Press 'i' → iOS Simulator  
Press 'w' → Web Browser
```

**That's it!** The app launches to the Landing Page.

---

## 🎯 Testing the Flow

1. **Landing Page** - You'll see:
   - EventScape header
   - "Ready to bring your event to life?" headline
   - Teal "Get Started" button
   - Stats (10,000+ Templates, 100+ Events, 4.9★)
   - Trending gallery

2. **Click "Get Started"** → Goes to Auth Page

3. **Auth Page** - You'll see:
   - Two tabs: Sign In / Sign Up (Sign Up active)
   - Username field
   - Email field
   - Password field with eye icon toggle
   - Teal "Create Account" button

4. **Enter dummy data and click** → Goes to Verification Page

5. **Verification Page** - You'll see:
   - Mail icon in circle
   - Email display
   - 6 digit input boxes
   - "Verify Email" button (disabled until all digits filled)

6. **Enter any 6 digits** → Goes to Success Page

7. **Success Page** - You'll see:
   - Green checkmark
   - "Account Verified" title
   - Security badge
   - Confirmation checklist
   - Teal "Continue to App" button

---

## 📁 Files You Need to Know

### Main Components
- `app/index.tsx` - Entry point, handles screen navigation
- `components/LandingPage.tsx` - Landing screen
- `components/AuthPage.tsx` - Sign in/up screen
- `components/EmailVerificationPage.tsx` - Email verification
- `components/VerificationSuccessPage.tsx` - Success confirmation

### Design System
- `constants/colors.ts` - Colors, typography, spacing

---

## 🎨 Quick Customization

### Change Primary Color (Teal to Your Color)
```ts
// In constants/colors.ts, line 1:
primary: "#YOUR_COLOR_HERE",  // was "#18C0C0"
```

### Change Headline Text
```tsx
// In components/LandingPage.tsx, line 30:
<Text style={styles.headline}>Your new headline here</Text>
```

### Change Button Text
```tsx
// In components/AuthPage.tsx, find the button and change:
{activeTab === "signup" ? "Your text" : "Other text"}
```

---

## 🔗 Add Real Images

### Replace Hero Image
```tsx
// In components/LandingPage.tsx, replace lines 106-115:
<Image
  source={require('@/assets/images/event-hall.jpg')}
  style={styles.heroImage}
  resizeMode="cover"
/>
```

Then add the style:
```tsx
heroImage: {
  width: '100%',
  height: 280,
  borderRadius: BorderRadius.lg,
},
```

---

## 🔧 Connect to Backend

### Example: Sign Up API Call
```tsx
// In components/AuthPage.tsx, update handleSignUp:

const handleSignUp = async () => {
  if (!formData.email || !formData.password) return;
  
  try {
    const response = await fetch('YOUR_API_URL/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      onSignUp?.(formData);
    } else {
      alert('Sign up failed');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
};
```

---

## 🐛 Debugging

### View Console Logs
In the Expo terminal, you'll see any errors/warnings.

### Check Network Requests
```bash
# In Expo CLI, logs show all console.log() calls
# Add console.log() to any function to debug
console.log('Current state:', currentScreen);
```

### React DevTools
```bash
npm install --save-dev @react-devtools/core
```

---

## 📱 Test on Real Device

### Android:
```bash
# Connect via USB
expo start
# Press 'a'
```

### iOS:
```bash
# Install Expo Go app from App Store first
expo start
# Scan QR code with camera
```

---

## 🆘 Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start -c
```

### Styles not updating?
```bash
# Hard refresh
expo start --clear
```

### TypeScript errors?
```bash
# Check tsconfig.json paths
# Path alias must be "@/*": ["./*"]
```

### Icons not showing?
```bash
# Icons are from @expo/vector-icons (Ionicons)
# Already installed in package.json
# Just ensure import: import { Ionicons } from "@expo/vector-icons";
```

---

## 📚 Full Documentation

Quick links to detailed docs:

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview
- **[DESIGN_SPECS.md](DESIGN_SPECS.md)** - Design specifications
- **[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)** - How to customize
- **[CODE_EXAMPLES.md](CODE_EXAMPLES.md)** - Integration examples
- **[FEATURE_CHECKLIST.md](FEATURE_CHECKLIST.md)** - Feature list

---

## ✅ Quick Checklist

Before going to production:

- [ ] Tested all 4 screens
- [ ] Replaced placeholder images
- [ ] Connected to backend API
- [ ] Tested on real device
- [ ] Added error handling
- [ ] Customized colors/text
- [ ] Tested all button clicks
- [ ] Added loading states

---

## 🎯 Next Immediate Steps

1. **Run the app** - `expo start`
2. **Test the flow** - Click through all screens
3. **Add real images** - Replace placeholders
4. **Connect API** - Wire up backend endpoints
5. **Deploy** - Build APK/IPA/web version

---

## 🚀 You're Ready!

The app is fully functional and ready to:
- ✅ View the complete UI/UX
- ✅ Test all interactions
- ✅ Customize colors/text/images
- ✅ Connect to your backend
- ✅ Deploy to production

**Happy coding!** 🎉

---

## 💡 Pro Tips

1. Use `expo start --tunnel` for better connection stability
2. Save file to instantly hot-reload on your device
3. Use browser DevTools: Press `shift+m` in Expo CLI
4. Test on both Android and iOS for best results
5. Check TypeScript errors: `expo lint`

---

**Questions?** Check the full documentation in PROJECT_SUMMARY.md or CODE_EXAMPLES.md!
