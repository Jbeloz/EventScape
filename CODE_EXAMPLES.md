# EventScape - Code Examples & Integration Guide

## 🔗 Integration Examples

### Backend Integration Examples

#### Example 1: Sign Up with Backend

```tsx
// In AuthPage.tsx - Update the handleSignUp function

const handleSignUp = async () => {
  if (!formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('https://your-api.com/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      onSignUp?.({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } else {
      alert(data.message || 'Sign up failed');
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  } finally {
    setLoading(false);
  }
};
```

---

#### Example 2: Email Verification with Backend

```tsx
// In EmailVerificationPage.tsx - Update handleVerify

const handleVerify = async () => {
  const fullCode = code.join("");
  
  if (fullCode.length !== 6) {
    alert("Please enter all 6 digits");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('https://your-api.com/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        code: fullCode,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store auth token
      await AsyncStorage.setItem('authToken', data.token);
      onVerify?.(fullCode);
    } else {
      alert(data.message || 'Verification failed');
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  } finally {
    setLoading(false);
  }
};
```

---

#### Example 3: Resend Verification Code

```tsx
// In EmailVerificationPage.tsx - Add resend handler

const handleResendCode = async () => {
  setResending(true);

  try {
    const response = await fetch('https://your-api.com/auth/resend-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("Code resent to your email!");
      setCode(["", "", "", "", "", ""]);
    } else {
      alert("Failed to resend code");
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  } finally {
    setResending(false);
  }
};
```

---

### State Management Integration (Context API)

```tsx
// Create contexts/AuthContext.tsx

import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  user: { email: string; name: string } | null;
  isVerified: boolean;
  signUp: (data: any) => Promise<void>;
  verify: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const signUp = async (data: any) => {
    // API call here
    setUser(data);
  };

  const verify = async (code: string) => {
    // Verify with backend
    setIsVerified(true);
  };

  return (
    <AuthContext.Provider value={{ user, isVerified, signUp, verify }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Usage in components:**
```tsx
// In AuthPage.tsx
import { useAuth } from '@/contexts/AuthContext';

export const AuthPage = () => {
  const { signUp } = useAuth();
  
  const handleSignUp = async () => {
    await signUp(formData);
    // Navigate to next screen
  };
};
```

---

## 🎨 Customization Code Examples

### Example 1: Add Password Strength Indicator

```tsx
// Add to AuthPage.tsx

const getPasswordStrength = (password: string) => {
  if (!password) return { strength: 0, label: '', color: '#E0E0E0' };
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#F44336', '#FFC107', '#8BC34A', '#4CAF50'];
  
  return {
    strength: strength,
    label: labels[strength - 1] || '',
    color: colors[strength - 1] || '#E0E0E0',
  };
};

// In the password input section:
const passwordStrength = getPasswordStrength(formData.password);

<View style={styles.strengthIndicator}>
  <View style={[
    styles.strengthBar,
    {
      width: `${(passwordStrength.strength / 4) * 100}%`,
      backgroundColor: passwordStrength.color,
    }
  ]} />
</View>
<Text style={{ color: passwordStrength.color, fontSize: 12 }}>
  {passwordStrength.label}
</Text>
```

---

### Example 2: Add Remember Me Checkbox

```tsx
// Add to AuthPage.tsx

const [rememberMe, setRememberMe] = useState(false);

// In the form (after password field):
<TouchableOpacity 
  style={styles.rememberMeContainer}
  onPress={() => setRememberMe(!rememberMe)}
>
  <View style={[
    styles.checkbox,
    rememberMe && { backgroundColor: Colors.primary }
  ]}>
    {rememberMe && (
      <Ionicons name="checkmark" size={16} color="white" />
    )}
  </View>
  <Text style={styles.rememberMeText}>Remember me</Text>
</TouchableOpacity>
```

---

### Example 3: Add Password Requirements Checklist

```tsx
// Add to AuthPage.tsx

const PasswordRequirements = ({ password }: { password: string }) => {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
  ];

  return (
    <View style={styles.requirementsContainer}>
      {requirements.map((req, index) => (
        <View key={index} style={styles.requirementItem}>
          <Ionicons
            name={req.met ? "checkmark-circle" : "close-circle"}
            size={16}
            color={req.met ? Colors.success : Colors.border}
          />
          <Text style={[
            styles.requirementText,
            { color: req.met ? Colors.success : Colors.textGrey }
          ]}>
            {req.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

// Use in form:
{activeTab === 'signup' && <PasswordRequirements password={formData.password} />}
```

---

### Example 4: Add Loading State to Buttons

```tsx
// Modify submit button in AuthPage.tsx

const [loading, setLoading] = useState(false);

<TouchableOpacity
  style={[styles.submitButton, loading && { opacity: 0.6 }]}
  onPress={activeTab === "signup" ? handleSignUp : handleSignIn}
  disabled={loading}
  activeOpacity={0.8}
>
  {loading ? (
    <ActivityIndicator color={Colors.background} />
  ) : (
    <Text style={styles.submitButtonText}>
      {activeTab === "signup" ? "Create Account" : "Sign In"}
    </Text>
  )}
</TouchableOpacity>
```

---

### Example 5: Custom Error Messages

```tsx
// Add error state to components

interface ErrorState {
  message: string;
  field?: string;
}

const [error, setError] = useState<ErrorState | null>(null);

// Validate email:
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    setError({ message: 'Invalid email format', field: 'email' });
    return false;
  }
  return true;
};

// Display error:
{error && (
  <View style={styles.errorContainer}>
    <Ionicons name="alert-circle" size={16} color={Colors.error} />
    <Text style={styles.errorText}>{error.message}</Text>
  </View>
)}
```

---

### Example 6: Custom Animations (Screen Transitions)

```tsx
// In app/index.tsx, add animation

import { Animated } from 'react-native';

const [fadeAnim] = useState(new Animated.Value(0));

const animateScreen = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
};

useEffect(() => {
  fadeAnim.setValue(0);
  animateScreen();
}, [currentScreen]);

// Wrap screen content:
<Animated.View style={{ opacity: fadeAnim }}>
  {currentScreen === "landing" && <LandingPage ... />}
  {/* ... other screens */}
</Animated.View>
```

---

### Example 7: Add Social Login Buttons

```tsx
// Add to AuthPage.tsx after form

<View style={styles.dividerContainer}>
  <View style={styles.divider} />
  <Text style={styles.dividerText}>OR</Text>
  <View style={styles.divider} />
</View>

<TouchableOpacity style={styles.socialButton}>
  <Ionicons name="logo-google" size={20} color="#4285F4" />
  <Text style={styles.socialButtonText}>Continue with Google</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.socialButton}>
  <Ionicons name="logo-apple" size={20} color="#000000" />
  <Text style={styles.socialButtonText}>Continue with Apple</Text>
</TouchableOpacity>

// Styles:
socialButton: {
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: BorderRadius.md,
  paddingVertical: Spacing.md,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: Spacing.md,
  gap: Spacing.sm,
}
```

---

## 🧪 Testing Examples

### Unit Test Example (Jest)

```tsx
// __tests__/authPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { AuthPage } from '@/components/AuthPage';

describe('AuthPage', () => {
  it('renders sign up tab by default', () => {
    render(<AuthPage />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('switches to sign in when tab clicked', () => {
    render(<AuthPage />);
    const signInTab = screen.getByText('Sign In');
    fireEvent.press(signInTab);
    expect(screen.getByText('Sign In')).toHaveStyle({ color: Colors.primary });
  });

  it('enables submit button when fields filled', () => {
    render(<AuthPage />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    const submitButton = screen.getByText('Create Account');
    expect(submitButton).not.toBeDisabled();
  });
});
```

---

### Component Snapshot Test

```tsx
// __tests__/landingPage.test.tsx
import { render } from '@testing-library/react-native';
import { LandingPage } from '@/components/LandingPage';

describe('LandingPage', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<LandingPage />);
    expect(toJSON()).toMatchSnapshot();
  });
});
```

---

## 📦 Adding Dependencies (If Needed)

If you want to add common libraries, run:

```bash
# Form validation
expo add react-hook-form

# API calls
expo add axios

# State management
expo add zustand

# Animations
expo add react-native-reanimated

# Date/Time
expo add date-fns
```

Then update your imports in components.

---

## 🚀 Performance Optimization

### Memoize Components

```tsx
// Prevent unnecessary re-renders
import React, { memo } from 'react';

export const LandingPage = memo(({ onGetStarted }: LandingPageProps) => {
  // ... component code
});
```

### Lazy Load Heavy Components

```tsx
// In app/index.tsx
const LandingPage = lazy(() => import('@/components/LandingPage'));
const AuthPage = lazy(() => import('@/components/AuthPage'));

<Suspense fallback={<LoadingScreen />}>
  {currentScreen === "landing" && <LandingPage ... />}
</Suspense>
```

---

## 🔒 Security Best Practices

### Store Sensitive Data Securely

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Install: expo add @react-native-async-storage/async-storage

// Store token securely
const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Failed to store token', error);
  }
};

// Retrieve token
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Failed to retrieve token', error);
    return null;
  }
};

// Clear on logout
const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Failed to logout', error);
  }
};
```

---

## 📊 Analytics Integration

```tsx
// Track user actions
import * as Analytics from 'expo-firebase-analytics';

const trackEvent = async (eventName: string, properties?: object) => {
  try {
    await Analytics.logEvent(eventName, properties);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Usage:
const handleGetStarted = () => {
  trackEvent('landing_get_started_clicked');
  setCurrentScreen('auth');
};

const handleSignUp = (data) => {
  trackEvent('signup_submitted', { email: data.email });
  // ... rest of logic
};
```

---

**Ready for production integration!** 🚀
