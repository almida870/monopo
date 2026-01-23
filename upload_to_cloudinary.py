import cloudinary
import cloudinary.uploader
import requests
from bs4 import BeautifulSoup
import time
import os

# --- إعدادات Cloudinary (عمر هادشي من الداشبورد ديالك) ---
cloudinary.config(
  cloud_name = "dnf7visu8",
  api_key = "992778372848711",
  api_secret = "e03uu2mYzpkhxp2n1iYxCivf7jA",
  secure = True
)

HTML_FILE = "index.html"

def upload_to_cloudinary(image_url):
    """كيجبد التصويرة وكيرفعها لـ Cloudinary وكيرجع الرابط الجديد"""
    try:
        print(f"🔄 Processing: {image_url[:40]}...")
        
        # Cloudinary ذكي، يقدر يرفع من الرابط نيشان (بلا ما نتيليشارجيو حنا)
        response = cloudinary.uploader.upload(
            image_url, 
            folder="delta_script_assets", # سمية الدوسيي فـ Cloudinary
            fetch_format="auto",  # يحولها لـ WebP أوتوماتيك باش تكون خفيفة
            quality="auto"        # يضغطها بلا ما يضيع الجودة
        )
        
        new_url = response['secure_url']
        print(f"✅ Uploaded: {new_url}")
        return new_url

    except Exception as e:
        print(f"❌ Error uploading {image_url}: {e}")
        return None

# --- البداية ---
print("🚀 Starting Cloudinary Migration...")

if not os.path.exists(HTML_FILE):
    print(f"❌ Mal9itch l file: {HTML_FILE}")
    exit()

with open(HTML_FILE, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

images = soup.find_all('img')
changes_count = 0

for img in images:
    src = img.get('src')
    
    # نتأكد أن الرابط قديم وماشي ديجا Cloudinary
    if src and 'cloudinary.com' not in src and src.startswith('http'):
        new_link = upload_to_cloudinary(src)
        
        if new_link:
            img['src'] = new_link
            changes_count += 1
            time.sleep(0.5) # راحة خفيفة

# نسوفي الملف
if changes_count > 0:
    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))
    print(f"\n🎉 Mabrouk! {changes_count} taswira tbdelat l Cloudinary (Optimized).")
else:
    print("\n🤷 Walou ma tbdel.")