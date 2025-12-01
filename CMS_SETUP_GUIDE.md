# CMS Setup Guide for HABC Beauty Website

## 🚀 **Quick Setup for CMS Publishing**

### 1. **Update Repository Information**
In `public/admin/config.yml`, replace these placeholders with your actual information:

```yaml
backend:
  name: git-gateway
  branch: main
  repo: your-actual-username/your-actual-repo-name
  site_domain: your-actual-domain.com
```

### 2. **Enable Git Gateway**
1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Identity**
3. Enable **Identity** service
4. Go to **Services** → **Git Gateway**
5. Enable **Git Gateway**

### 3. **Configure Authentication**
1. In Netlify Identity settings, enable **External providers**
2. Add your GitHub account
3. Set up **Invite only** or **Open** registration as needed

### 4. **Test CMS Access**
1. Visit `your-site.com/admin`
2. You should see the Decap CMS login screen
3. Login with your GitHub account
4. You can now edit content and publish changes

## 📝 **Content Management**

### **Available Pages:**
- **Home Page** - Hero content, featured services, products
- **About Page** - Story, team information, process
- **Services Page** - Service categories and pricing
- **Shop Page** - Product categories and featured items
- **Reviews Page** - Customer reviews and testimonials

### **What You Can Edit:**
- ✅ Hero titles and subtitles
- ✅ Hero spacing and height
- ✅ All text content
- ✅ Images (upload to `/public/uploads/`)
- ✅ Service pricing and descriptions
- ✅ Team member information
- ✅ Reviews and testimonials

### **Publishing Process:**
1. **Edit** content in the CMS
2. **Save** changes (creates draft)
3. **Publish** changes (pushes to live site)
4. Changes appear on your website immediately

## 🔧 **Troubleshooting**

### **If CMS doesn't load:**
1. Check that Git Gateway is enabled in Netlify
2. Verify repository name in config.yml
3. Ensure you're logged into GitHub

### **If changes don't appear:**
1. Check that you clicked "Publish" not just "Save"
2. Verify the branch is set to "main"
3. Check Netlify build logs for errors

### **If images don't upload:**
1. Ensure `/public/uploads/` folder exists
2. Check file permissions
3. Verify image file sizes are reasonable

## 📱 **Mobile CMS Access**
The CMS is fully responsive and works on mobile devices, so you can edit content from anywhere!

## 🎯 **Next Steps**
1. Update the repository information in config.yml
2. Enable Git Gateway in Netlify
3. Test the CMS at `/admin`
4. Start editing your content!

