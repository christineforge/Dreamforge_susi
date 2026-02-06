'use client'

import { SignIn } from '@clerk/nextjs'
import { useEffect } from 'react'

/**
 * Sign-in page
 * Renders Clerk's SignIn component with logo and custom styling
 * Designed for local design and UX iteration
 */
export default function SignInPage() {
  useEffect(() => {
    // Wait for card to be rendered with retry mechanism
    const findCard = (): HTMLElement | null => {
      return document.querySelector('[class*="cl-card"]') as HTMLElement;
    };

    const findHeaderTitle = (): HTMLElement | null => {
      return document.querySelector('[class*="cl-headerTitle"]') as HTMLElement;
    };

    const findSocialButtons = (): HTMLElement | null => {
      return document.querySelector('[class*="cl-socialButtonsBlock"]') as HTMLElement;
    };

    let cardWrapper: HTMLElement | null = null;
    let glowContainer: HTMLDivElement | null = null;
    let glowCircle: HTMLDivElement | null = null;

    const setupGlow = () => {
      cardWrapper = findCard();
      if (!cardWrapper) {
        return false;
      }

      // Check if glow container already exists
      if (cardWrapper.querySelector('[data-glow-container]')) {
        return true;
      }

      // Create glow container inside the card - behind the glass
      glowContainer = document.createElement('div');
      glowContainer.setAttribute('data-glow-container', 'true');
      glowContainer.style.position = 'absolute';
      glowContainer.style.top = '0';
      glowContainer.style.left = '0';
      glowContainer.style.right = '0';
      glowContainer.style.bottom = '0';
      glowContainer.style.pointerEvents = 'none';
      glowContainer.style.zIndex = '0'; // Behind the glass but visible through it
      glowContainer.style.borderRadius = '1.5rem';
      glowContainer.style.overflow = 'hidden'; // Keep glow inside the card
      
      // Create glowing circle - smaller and more transparent
      glowCircle = document.createElement('div');
      glowCircle.style.position = 'absolute';
      glowCircle.style.width = '300px'; // Smaller
      glowCircle.style.height = '300px'; // Smaller
      glowCircle.style.borderRadius = '50%';
      glowCircle.style.background = 'radial-gradient(circle, rgba(70, 0, 182, 0.55) 0%, rgba(70, 0, 182, 0.4) 25%, rgba(70, 0, 182, 0.2) 50%, transparent 70%)';
      glowCircle.style.pointerEvents = 'none';
      glowCircle.style.transform = 'translate(-50%, -50%)';
      glowCircle.style.filter = 'blur(70px)'; // Even more blurred
      glowCircle.style.opacity = '0';
      glowCircle.style.transition = 'opacity 0.15s ease-out, left 0.05s linear, top 0.05s linear';
      glowCircle.style.left = '50%';
      glowCircle.style.top = '50%';
      glowContainer.appendChild(glowCircle);


      cardWrapper.appendChild(glowContainer);
      cardWrapper.style.position = 'relative';
      return true;
    };

    // Try to setup immediately, then retry if needed
    let retryCount = 0;
    const maxRetries = 10;
    
    const trySetup = () => {
      if (setupGlow()) {
        return;
      }
      retryCount++;
      if (retryCount < maxRetries) {
        setTimeout(trySetup, 100);
      }
    };

    trySetup();

    // Setup account link and divider
    const setupAccountLinkAndDivider = () => {
      const headerTitle = findHeaderTitle();
      const socialButtons = findSocialButtons();
      
      if (!headerTitle || !socialButtons) {
        return false;
      }

      // Check if account link already exists
      if (document.querySelector('[data-account-link-container]')) {
        return true;
      }

      // Create account link container
      const accountLinkContainer = document.createElement('div');
      accountLinkContainer.setAttribute('data-account-link-container', 'true');
      accountLinkContainer.style.display = 'flex';
      accountLinkContainer.style.alignItems = 'center';
      accountLinkContainer.style.justifyContent = 'center';
      accountLinkContainer.style.marginTop = '1rem';
      
      const accountLinkText = document.createElement('div');
      accountLinkText.style.color = 'rgba(255, 255, 255, 0.7)';
      accountLinkText.style.fontSize = '0.875rem';
      accountLinkText.style.textAlign = 'center';
      accountLinkText.style.lineHeight = '1.5';
      accountLinkText.innerHTML = 'No account?<br><a href="/auth" style="color: rgba(0, 212, 255, 0.8); text-decoration: none; font-weight: 500;">Sign up</a>';
      
      accountLinkContainer.appendChild(accountLinkText);
      
      // Insert after header title
      if (headerTitle.parentNode) {
        headerTitle.parentNode.insertBefore(accountLinkContainer, headerTitle.nextSibling);
      }

      // Create divider before social buttons
      if (!document.querySelector('[data-custom-divider]')) {
        const divider = document.createElement('div');
        divider.setAttribute('data-custom-divider', 'true');
        divider.style.display = 'flex';
        divider.style.alignItems = 'center';
        divider.style.justifyContent = 'center';
        divider.style.width = '100%';
        divider.style.margin = '1.5rem 0';
        divider.style.gap = '1rem';
        
        const dividerLineLeft = document.createElement('div');
        dividerLineLeft.style.flex = '1';
        dividerLineLeft.style.height = '1px';
        dividerLineLeft.style.background = 'rgba(255, 255, 255, 0.2)';
        
        const dividerText = document.createElement('span');
        dividerText.style.color = 'rgba(255, 255, 255, 0.7)';
        dividerText.style.fontSize = '0.875rem';
        dividerText.style.whiteSpace = 'nowrap';
        dividerText.textContent = 'or';
        
        const dividerLineRight = document.createElement('div');
        dividerLineRight.style.flex = '1';
        dividerLineRight.style.height = '1px';
        dividerLineRight.style.background = 'rgba(255, 255, 255, 0.2)';
        
        divider.appendChild(dividerLineLeft);
        divider.appendChild(dividerText);
        divider.appendChild(dividerLineRight);
        
        // Insert before social buttons
        if (socialButtons.parentNode) {
          socialButtons.parentNode.insertBefore(divider, socialButtons);
        }
      }

      return true;
    };

    // Retry setup for account link and divider
    let retryCountLink = 0;
    const maxRetriesLink = 10;
    const trySetupLink = () => {
      if (setupAccountLinkAndDivider()) {
        return;
      }
      retryCountLink++;
      if (retryCountLink < maxRetriesLink) {
        setTimeout(trySetupLink, 100);
      }
    };

    trySetupLink();

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardWrapper) {
        cardWrapper = findCard();
        if (!cardWrapper) return;
      }

      if (!glowCircle || !glowContainer) {
        if (!setupGlow()) return;
        glowCircle = glowContainer?.querySelector('div:first-child') as HTMLDivElement;
        if (!glowCircle || !glowContainer) return;
      }

      const rect = cardWrapper.getBoundingClientRect();
      
      // Check if mouse is inside the card
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        // Calculate mouse position relative to card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update glow circle position - bigger and more blurred
        if (glowCircle) {
          glowCircle.style.left = `${x}px`;
          glowCircle.style.top = `${y}px`;
          glowCircle.style.opacity = '1';
        }
      } else {
        // Hide glow when mouse leaves
        if (glowCircle) {
          glowCircle.style.opacity = '0';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (glowContainer?.parentNode) {
        glowContainer.parentNode.removeChild(glowContainer);
      }
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'url("/images/background.jpg") center center / cover no-repeat fixed, linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)',
      backgroundColor: '#0a0a1a',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        position: 'relative',
      }}>
        <SignIn 
          routing="path"
          path="/auth/sign-in"
          signUpUrl="/auth"
        />
      </div>
    </div>
  )
}

