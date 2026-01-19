# EventScape - Customization Guide

## 🎨 Changing Colors

All colors are centralized in **[constants/colors.ts](constants/colors.ts)**

### To Change Primary Color (Teal → Your Color):

```ts
// In constants/colors.ts
export const Colors = {
  primary: "#YOUR_COLOR_CODE",  // Change from #18C0C0
  primaryDark: "#DARKER_VERSION",
  success: "#4CAF50",  // Keep or change
  // ... rest of colors
};
```

**Example**: Change teal to purple:
```ts
primary: "#9C27B0",  // Purple
primaryDark: "#7B1FA2",
```

The entire app will update automatically because all components import from this file!

---

## 🖼️ Adding Real Images

### 1. Event Hall Image (Landing Page)

**Location**: [components/LandingPage.tsx](components/LandingPage.tsx) - Lines 106-115

**Current Placeholder**:
```tsx
<View style={styles.heroImagePlaceholder}>
  <Ionicons name="image-outline" size={64} color={Colors.primary} />
  <Text style={styles.placeholderText}>Event Hall</Text>
</View>
```

**Replace With**:
```tsx
<Image
  source={require('@/assets/images/event-hall.jpg')}
  style={styles.heroImage}
  resizeMode="cover"
/>
```

**Add to StyleSheet**:
```tsx
heroImage: {
  width: '100%',
  height: 280,
  borderRadius: BorderRadius.lg,
},
```

---

### 2. Trending Gallery Images

**Location**: [components/LandingPage.tsx](components/LandingPage.tsx) - Lines 160-180

**Current Placeholder**:
```tsx
<View style={styles.galleryImagePlaceholder}>
  <Ionicons name="image" size={48} color={Colors.primary} />
</View>
```

**Replace With**:
```tsx
<Image
  source={require(`@/assets/images/theme-${item}.jpg`)}
  style={styles.galleryImage}
  resizeMode="cover"
/>
```

**Add to StyleSheet**:
```tsx
galleryImage: {
  width: 140,
  height: 200,
  borderRadius: BorderRadius.lg,
},
```

---

### 3. App Logo (Optional)

**Location**: [components/LandingPage.tsx](components/LandingPage.tsx) - Line 23

**Current**:
```tsx
<Ionicons name="calendar" size={28} color={Colors.primary} />
```

**Replace With Custom Logo Image**:
```tsx
<Image
  source={require('@/assets/images/logo.png')}
  style={{ width: 32, height: 32 }}
/>
```

---

## 📸 Image Directory Structure

Create this folder structure and add your images:

```
assets/
├── images/
│   ├── event-hall.jpg          (Hero image)
│   ├── theme-1.jpg             (Gallery item)
│   ├── theme-2.jpg
│   ├── theme-3.jpg
│   ├── theme-4.jpg
│   └── logo.png                (Optional)
```

---

## 🎯 Recommended Image Sizes

| Image | Width | Height | Format | Usage |
|-------|-------|--------|--------|-------|
| event-hall.jpg | 800px | 600px | JPG | Landing hero |
| theme-*.jpg | 280px | 400px | JPG | Gallery cards |
| logo.png | 128px | 128px | PNG | App header |

---

## 🔧 Typography Customization

### Change Font Sizes

In **[constants/colors.ts](constants/colors.ts)**:

```ts
export const Typography = {
  h1: {
    fontSize: 32,      // Change this number
    fontWeight: "bold",
    color: Colors.text,
  },
  h2: {
    fontSize: 24,      // Change this number
    fontWeight: "bold",
    color: Colors.text,
  },
  // ... etc
};
```

### Use Custom Fonts

1. Add font files to `assets/fonts/`
2. Update `app/_layout.tsx`:

```tsx
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return <Stack />;
}
```

3. Use in components:
```tsx
headline: {
  fontFamily: 'SpaceMono',
  fontSize: 32,
  fontWeight: 'bold',
}
```

---

## 🎯 Spacing & Layout Adjustments

All spacing uses the scale in **[constants/colors.ts](constants/colors.ts)**:

```ts
export const Spacing = {
  xs: 4,      // Extra small gaps
  sm: 8,      // Small gaps
  md: 16,     // Medium (default)
  lg: 24,     // Large sections
  xl: 32,     // Extra large
};
```

### Adjust Global Spacing

Multiply all values by a factor:
```ts
export const Spacing = {
  xs: 4 * 1.25,   // × 1.25 for larger spacing
  sm: 8 * 1.25,
  md: 16 * 1.25,
  lg: 24 * 1.25,
  xl: 32 * 1.25,
};
```

---

## 🌓 Dark Mode (Future Enhancement)

To add dark mode, expand `constants/colors.ts`:

```ts
export const Colors = {
  // Light mode
  light: {
    primary: "#18C0C0",
    background: "#FFFFFF",
    text: "#000000",
    // ...
  },
  // Dark mode
  dark: {
    primary: "#1DDDC8",
    background: "#121212",
    text: "#FFFFFF",
    // ...
  },
};

export function getColors(isDark: boolean) {
  return isDark ? Colors.dark : Colors.light;
}
```

---

## 📝 Text Content Customization

### Landing Page Headline

[components/LandingPage.tsx](components/LandingPage.tsx) - Line 30:
```tsx
<Text style={styles.headline}>Ready to bring your event to life?</Text>
```

Change to your text!

### Stats Labels

[components/LandingPage.tsx](components/LandingPage.tsx) - Lines 121-137:
```tsx
<Text style={styles.statNumber}>10,000+</Text>
<Text style={styles.statLabel}>Theme Templates</Text>
```

Update the numbers and labels!

### Verification Email Message

[components/EmailVerificationPage.tsx](components/EmailVerificationPage.tsx) - Line 52:
```tsx
<Text style={styles.description}>
  We sent a 6-digit code to {"\n"}
  <Text style={styles.email}>{email}</Text>
</Text>
```

Customize the message!

---

## 🚀 Quick Customization Checklist

- [ ] Update primary color in `constants/colors.ts`
- [ ] Add event hall image to hero section
- [ ] Add 4 theme images to gallery
- [ ] Update landing page headline text
- [ ] Update stats numbers/labels
- [ ] Update verification email message
- [ ] Add app logo (optional)
- [ ] Adjust spacing if needed
- [ ] Test on mobile device/emulator

---

## 🔗 Component Customization Quick Links

| Component | File | Key Lines | Element |
|-----------|------|-----------|---------|
| Landing Headline | [LandingPage.tsx](components/LandingPage.tsx) | 30 | Text |
| Get Started Button | [LandingPage.tsx](components/LandingPage.tsx) | 38 | Button |
| Hero Image | [LandingPage.tsx](components/LandingPage.tsx) | 108 | Image |
| Stats Row | [LandingPage.tsx](components/LandingPage.tsx) | 121-137 | Stats |
| Gallery | [LandingPage.tsx](components/LandingPage.tsx) | 162 | Cards |
| Auth Tabs | [AuthPage.tsx](components/AuthPage.tsx) | 50-85 | Tabs |
| Form Fields | [AuthPage.tsx](components/AuthPage.tsx) | 110-165 | Inputs |
| Verify Code | [EmailVerificationPage.tsx](components/EmailVerificationPage.tsx) | 75 | Code Box |
| Success Message | [VerificationSuccessPage.tsx](components/VerificationSuccessPage.tsx) | 42 | Message |

---

## 💬 Need Help?

Common customizations:

**Q: How do I change button color?**  
A: Edit `Colors.primary` in `constants/colors.ts` - all buttons update automatically!

**Q: How do I add more form fields?**  
A: Copy one `inputGroup` block in `AuthPage.tsx` and add new state to `formData`

**Q: How do I add more stats?**  
A: Copy one `statItem` block in `LandingPage.tsx` - just duplicate the View

**Q: How do I change the font?**  
A: Update `fontFamily` in Typography styles

---

**Start customizing!** 🎉
