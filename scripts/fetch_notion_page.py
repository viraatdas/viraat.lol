import os
import requests
from notion_client import Client
from notion2md.exporter.block import StringExporter

def fetch_notion_page(notion_api_key, page_id):
    md = convert_to_markdown(page_id)
    print(md)
    with open('content/index.md', 'w') as f:
            f.write(md)


def convert_to_markdown(page_id):
    md = StringExporter(block_id=page_id).export()
    return md
    
if __name__ == "__main__":
    NOTION_API_KEY = os.getenv('NOTION_API_KEY')
    NOTION_PAGE_ID = os.getenv('NOTION_PAGE_ID')
    os.environ['NOTION_TOKEN'] =  NOTION_API_KEY
    fetch_notion_page(NOTION_API_KEY, NOTION_PAGE_ID)

