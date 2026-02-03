// Solution for WebView overflow issue
// Option 1: Adjust the frame to account for safe areas and prevent overflow
webView.Frame = new Rect(0, 0, Screen.width, Screen.height);

// Add overflow handling via CSS injection
webView.OnPageFinished += (view, statusCode, loadedUrl) =>
{
    // Inject CSS to prevent overflow
    view.EvaluateJavaScript(@"
        (function() {
            // Add overflow styles to html and body
            var style = document.createElement('style');
            style.innerHTML = 'html, body { overflow-x: hidden !important; overflow-y: auto !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; } * { box-sizing: border-box !important; }';
            document.head.appendChild(style);
            
            // Prevent horizontal scrolling
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
        })();
    ");
    
    // Your existing close button code here...
    view.EvaluateJavaScript(@"
        (function() {
            if (document.getElementById('uniwebview-close-btn')) return;
            
            function updateButtonSize() {
                var btn = document.getElementById('uniwebview-close-btn');
                if (!btn) return;
                
                var size = Math.min(window.innerWidth, window.innerHeight) * 0.06;
                size = Math.max(32, Math.min(48, size));
                var fontSize = size * 0.5;
                var borderWidth = Math.max(1.5, size * 0.04);
                var topPos = Math.max(10, window.innerHeight * 0.02);
                var rightPos = Math.max(10, window.innerWidth * 0.02);
                
                btn.style.width = size + 'px';
                btn.style.height = size + 'px';
                btn.style.fontSize = fontSize + 'px';
                btn.style.borderWidth = borderWidth + 'px';
                btn.style.borderStyle = 'solid';
                btn.style.borderColor = '#ff8fa3';
                btn.style.top = topPos + 'px';
                btn.style.right = rightPos + 'px';
            }
            
            var btn = document.createElement('button');
            btn.id = 'uniwebview-close-btn';
            btn.innerHTML = '✕';
            btn.style.cssText = 'position:fixed;z-index:999999;padding:0;background:rgba(100,30,50,0.3);color:#ff6b9d;border-radius:50%;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;transition:transform 0.2s ease,opacity 0.2s ease;';
            btn.onmouseenter = function() { this.style.transform = 'scale(1.1)'; };
            btn.onmouseleave = function() { this.style.transform = 'scale(1)'; };
            btn.onclick = function(e) { 
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'uniwebview://close';
            };
            
            document.body.appendChild(btn);
            updateButtonSize();
            window.addEventListener('resize', updateButtonSize);
        })();
    ");
};

// Option 2: If you need to account for safe areas (notches, status bars, etc.)
// Use Screen.safeArea instead
// webView.Frame = new Rect(Screen.safeArea.x, Screen.safeArea.y, Screen.safeArea.width, Screen.safeArea.height);

// Option 3: If you want to prevent any scrolling
// webView.Frame = new Rect(0, 0, Screen.width, Screen.height);
// webView.SetVerticalScrollBarEnabled(false);
// webView.SetHorizontalScrollBarEnabled(false);

