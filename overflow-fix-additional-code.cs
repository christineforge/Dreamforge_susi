// Add this code right after: webView.Frame = new Rect(0, 0, Screen.width, Screen.height);

// Fix overflow issues by injecting CSS when page loads
webView.OnPageFinished += (view, statusCode, loadedUrl) =>
{
    view.EvaluateJavaScript(@"
        (function() {
            // Prevent horizontal overflow
            var style = document.createElement('style');
            style.innerHTML = 'html, body { overflow-x: hidden !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; } * { box-sizing: border-box !important; }';
            document.head.appendChild(style);
            
            // Additional overflow prevention
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
        })();
    ");
};

