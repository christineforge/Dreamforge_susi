# Customer.io Fallback Email Setup Checklist

## Quick Reference for DreamForge Email Campaigns

---

## ✅ Campaign Setup Steps

### 1. Create Campaign
- [ ] Campaign Name: `Game Created`
- [ ] Campaign Type: Transactional (or Broadcast, depending on your use case)

### 2. Add Visual Email
- [ ] Email Name: `Game Created – Visual`
- [ ] Subject Line: `🎮 Your game "{{ event.gameName }}" is ready!`
- [ ] HTML Content: Your full visual email template with images

**Delivery Condition:**
```liquid
{% if event.gameCoverUrl and event.gameCoverUrl contains "https://" %}
```

### 3. Add Fallback Email
- [ ] Email Name: `Game Created – Fallback`
- [ ] Subject Line: `Your game "{{ event.gameName }}" is ready!`
- [ ] HTML Content: Use `fallback-email-template.html` as reference

**Delivery Condition:**
```liquid
{% if event.gameCoverUrl == blank or event.gameCoverUrl == null or event.gameCoverUrl == "" %}
```

---

## 🔍 Testing Checklist

### Before Sending
- [ ] Preview Visual Email in Customer.io
- [ ] Preview Fallback Email in Customer.io
- [ ] Test with `gameCoverUrl` present → Should send Visual
- [ ] Test with `gameCoverUrl` blank → Should send Fallback
- [ ] Verify only ONE email is sent (not both)

### Email Client Testing
- [ ] Test Visual Email in Litmus/Email on Acid
- [ ] Test Fallback Email in Outlook (Windows)
- [ ] Test Fallback Email in Gmail
- [ ] Test Fallback Email on mobile (iOS Mail, Android Gmail)

---

## 📋 Event Payload Requirements

### Required Fields
```json
{
  "event": {
    "gameName": "My Awesome Game",
    "gameUrl": "https://dreamforge.app/games/123",
    "gameCoverUrl": "https://cdn.dreamforge.app/covers/game-123.jpg" // Optional
  },
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Optional Fields (for enhanced fallback)
```json
{
  "event": {
    "gameDescription": "An epic adventure game...",
    "gameCreatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🚨 Common Issues & Solutions

### Issue: Both emails are sending
**Solution:** Check your conditions are mutually exclusive:
- Visual: `{% if event.gameCoverUrl and event.gameCoverUrl contains "https://" %}`
- Fallback: `{% if event.gameCoverUrl == blank or event.gameCoverUrl == null %}`

### Issue: Fallback email looks broken in Outlook
**Solution:** 
- Use table-based layout (not divs)
- Inline all styles
- Test in Outlook 2007+ (worst case)

### Issue: Images not showing in Visual email
**Solution:**
- Use absolute URLs (https://)
- Host images on CDN
- Add alt text for accessibility

### Issue: `gameCoverUrl` is always blank
**Solution:**
- Check your event payload
- Verify the field name matches
- Add logging to debug

---

## 📊 Monitoring

### Track These Metrics
- [ ] Visual email send rate (%)
- [ ] Fallback email send rate (%)
- [ ] Open rates by email type
- [ ] Click rates by email type
- [ ] Bounce rates

### If Fallback > 10% of sends
- Investigate why `gameCoverUrl` is missing
- Check event payload structure
- Verify image upload process

---

## 💡 Pro Tips

1. **Name Convention**: Always use `[Campaign Name] – [Type]` format
   - `Game Created – Visual`
   - `Game Created – Fallback`

2. **Subject Lines**: Keep fallback subject similar but simpler (no emojis if client strips them)

3. **Link Tracking**: Use Customer.io's link tracking for both emails

4. **A/B Testing**: Test subject lines, but keep email types separate

5. **Documentation**: Document which fields trigger which email in your team wiki

---

## ✅ Final Verification

Before going live:
- [ ] Both emails render correctly in Customer.io preview
- [ ] Conditions work as expected (test with/without `gameCoverUrl`)
- [ ] Fallback email works in Outlook
- [ ] All links work
- [ ] Unsubscribe link is present
- [ ] Mobile responsive (test on phone)
- [ ] Event payload is documented
- [ ] Team knows which email to use for testing

---

**You're all set!** 🚀


