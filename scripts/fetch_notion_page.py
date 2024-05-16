import os
import requests
from notion_client import Client

def fetch_notion_page(notion_api_key, page_id):
    notion = Client(auth=notion_api_key)
    page = notion.pages.retrieve(page_id=page_id)
    # Fetch page content and convert it to markdown (implement this part as needed)
    markdown_content = convert_to_markdown(page)
    with open('content/index.md', 'w') as f:
        f.write(markdown_content)

def convert_to_markdown(page):
    # Initialize Markdown content
    markdown_content = ""
    
    # Check if there are any blocks in the page
    if 'results' in page:
        for block in page['results']:
            # Handle different types of blocks
            if block['type'] == 'paragraph':
                text_content = get_text_content(block['paragraph']['text'])
                markdown_content += text_content + "\n\n"
            elif block['type'] == 'heading_1':
                text_content = get_text_content(block['heading_1']['text'])
                markdown_content += f"# {text_content}\n\n"
            elif block['type'] == 'heading_2':
                text_content = get_text_content(block['heading_2']['text'])
                markdown_content += f"## {text_content}\n\n"
            elif block['type'] == 'heading_3':
                text_content = get_text_content(block['heading_3']['text'])
                markdown_content += f"### {text_content}\n\n"
            elif block['type'] == 'bulleted_list_item':
                text_content = get_text_content(block['bulleted_list_item']['text'])
                markdown_content += f"- {text_content}\n"
            elif block['type'] == 'numbered_list_item':
                text_content = get_text_content(block['numbered_list_item']['text'])
                markdown_content += f"1. {text_content}\n"
    return markdown_content

def get_text_content(text_elements):
    """Helper function to extract text content from text elements"""
    content = ""
    for element in text_elements:
        if 'text' in element:
            content += element['text']['content']
    return content


if __name__ == "__main__":
    NOTION_API_KEY = os.getenv('NOTION_API_KEY')
    NOTION_PAGE_ID = os.getenv('NOTION_PAGE_ID')
    fetch_notion_page(NOTION_API_KEY, NOTION_PAGE_ID)

