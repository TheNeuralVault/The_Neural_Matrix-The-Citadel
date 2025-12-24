import os
import re
import datetime

TEMPLATE_PATH = "templates/blogpost.html"
CONTENT_DIR = "_content"
OUTPUT_DIR = "blog/posts"

def parse_markdown(md):
    # Extract Metadata (Title, Date, Desc)
    title = re.search(r'title: "(.*?)"', md).group(1)
    date = re.search(r'date: "(.*?)"', md).group(1)
    desc = re.search(r'description: "(.*?)"', md).group(1)
    
    # Remove Frontmatter
    body = re.sub(r'---(.*?)---', '', md, flags=re.DOTALL).strip()
    
    # Convert Markdown to HTML (Simple Regex)
    body = re.sub(r'## (.*)', r'<h2>\1</h2>', body)
    body = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', body)
    body = re.sub(r'`(.*?)`', r'<code>\1</code>', body)
    # Paragraphs (Double newline = new paragraph)
    paragraphs = body.split('\n\n')
    html_body = ''.join([f'<p>{p}</p>' for p in paragraphs])
    
    return title, date, desc, html_body

def build():
    print(":: INITIALIZING VOICE ENGINE ::")
    
    with open(TEMPLATE_PATH, 'r') as f:
        template = f.read()

    for filename in os.listdir(CONTENT_DIR):
        if filename.endswith(".md"):
            print(f"   >> Processing: {filename}")
            with open(os.path.join(CONTENT_DIR, filename), 'r') as f:
                md = f.read()
            
            title, date, desc, html_content = parse_markdown(md)
            
            # Inject into Template
            output = template.replace('{{ title }}', title)
            output = output.replace('{{ date }}', date)
            output = output.replace('{{ description }}', desc)
            output = output.replace('{{ content }}', html_content)
            
            # Save HTML
            out_filename = filename.replace(".md", ".html")
            with open(os.path.join(OUTPUT_DIR, out_filename), 'w') as f:
                f.write(output)

    print(":: BROADCAST COMPLETE ::")

if __name__ == "__main__":
    build()
