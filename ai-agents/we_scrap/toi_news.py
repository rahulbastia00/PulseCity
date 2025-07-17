import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime
import time
from urllib.parse import urljoin, urlparse
import logging
from textblob import TextBlob
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CityPulseDataScraper:
    def __init__(self):
        self.base_url = "https://timesofindia.indiatimes.com"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        
        # City-specific keywords for filtering relevant content
        self.city_keywords = {
            'traffic': ['traffic', 'jam', 'accident', 'road', 'vehicle', 'collision', 'highway', 'flyover', 'signal', 'congestion'],
            'civic': ['pothole', 'garbage', 'streetlight', 'water', 'drain', 'sewage', 'electricity', 'power cut', 'municipal', 'civic'],
            'weather': ['rain', 'flood', 'weather', 'storm', 'cyclone', 'heat', 'temperature', 'humidity', 'waterlogging'],
            'emergency': ['fire', 'accident', 'emergency', 'rescue', 'ambulance', 'police', 'crime', 'safety'],
            'events': ['event', 'festival', 'protest', 'rally', 'meeting', 'gathering', 'cultural', 'celebration'],
            'infrastructure': ['metro', 'bus', 'transport', 'construction', 'building', 'bridge', 'flyover', 'road work'],
            'health': ['hospital', 'health', 'medical', 'doctor', 'clinic', 'covid', 'vaccination', 'disease'],
            'education': ['school', 'college', 'university', 'student', 'education', 'exam', 'admission']
        }
        
        # Indian cities for location extraction
        self.indian_cities = [
            'Mumbai', 'Delhi', 'Bangalore', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 
            'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Patna', 'Indore',
            'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Vadodara', 'Ghaziabad', 'Ludhiana',
            'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan', 'Vasai', 'Varanasi', 'Srinagar',
            'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah',
            'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
            'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubballi', 'Bareilly', 'Moradabad',
            'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'  # Added Odisha cities
        ]

    def get_page_content(self, url):
        """Fetch page content with error handling"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching {url}: {e}")
            return None

    def extract_sentiment(self, text):
        """Extract sentiment from text using TextBlob"""
        try:
            blob = TextBlob(text)
            polarity = blob.sentiment.polarity
            if polarity > 0.1:
                return "positive"
            elif polarity < -0.1:
                return "negative"
            else:
                return "neutral"
        except:
            return "neutral"

    def categorize_article(self, title, description, url):
        """Categorize article based on content and keywords"""
        full_text = f"{title} {description}".lower()
        categories = []
        
        for category, keywords in self.city_keywords.items():
            if any(keyword in full_text for keyword in keywords):
                categories.append(category)
        
        # URL-based categorization
        if '/city/' in url:
            categories.append('city')
        elif '/sports/' in url:
            categories.append('sports')
        elif '/business/' in url:
            categories.append('business')
        elif '/world/' in url:
            categories.append('world')
        elif '/india/' in url:
            categories.append('india')
        
        return categories if categories else ['general']

    def extract_location_from_text(self, text):
        """Extract location from article text"""
        locations = []
        for city in self.indian_cities:
            if city.lower() in text.lower():
                locations.append(city)
        return locations

    def calculate_urgency_score(self, categories, sentiment, title, description):
        """Calculate urgency score based on content"""
        urgency_weights = {
            'emergency': 10,
            'traffic': 7,
            'weather': 8,
            'civic': 6,
            'health': 8,
            'infrastructure': 5,
            'events': 4,
            'education': 3,
            'general': 2
        }
        
        base_score = max([urgency_weights.get(cat, 2) for cat in categories])
        
        # Adjust based on sentiment
        if sentiment == 'negative':
            base_score += 2
        elif sentiment == 'positive':
            base_score -= 1
        
        # Emergency keywords boost
        emergency_keywords = ['urgent', 'emergency', 'critical', 'danger', 'alert', 'warning']
        full_text = f"{title} {description}".lower()
        if any(keyword in full_text for keyword in emergency_keywords):
            base_score += 3
        
        return min(base_score, 10)  # Cap at 10

    def extract_article_links(self, html_content):
        """Extract article links from the main page"""
        soup = BeautifulSoup(html_content, 'html.parser')
        article_links = []
        
        # Common selectors for Times of India articles
        selectors = [
            'a[href*="/articleshow/"]',
            'a[href*="/city/"]',
            'a[href*="/india/"]',
            'a[href*="/world/"]',
            'a[href*="/business/"]',
            'a[href*="/sports/"]',
            'a[href*="/entertainment/"]'
        ]
        
        for selector in selectors:
            links = soup.select(selector)
            for link in links:
                href = link.get('href')
                if href:
                    full_url = urljoin(self.base_url, href)
                    if full_url not in article_links:
                        article_links.append(full_url)
        
        return article_links

    def extract_article_data(self, article_url):
        """Extract article data from individual article page"""
        html_content = self.get_page_content(article_url)
        if not html_content:
            return None
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Initialize article data with city pulse specific fields
        article_data = {
            "id": hashlib.md5(article_url.encode()).hexdigest()[:12],
            "title": "",
            "description": "",
            "img_url": "",
            "video_url": "",
            "location": "",
            "locations_mentioned": [],
            "timestamp": "",
            "type": "news",
            "categories": [],
            "sentiment": "neutral",
            "urgency_score": 0,
            "source": "Times of India",
            "source_url": article_url,
            "relevant_for_city_pulse": False,
            "tags": [],
            "word_count": 0,
            "reading_time": 0
        }
        
        # Extract title
        title_selectors = [
            'h1[class*="HNMDR"]',
            'h1.article-title',
            'h1._3YYSt',
            'h1',
            '.headline'
        ]
        
        for selector in title_selectors:
            title_elem = soup.select_one(selector)
            if title_elem:
                article_data["title"] = title_elem.get_text(strip=True)
                break
        
        # Extract description/content
        description_selectors = [
            'div[class*="ga-headline"]',
            'div.article-content',
            'div._1Y49U',
            'div.Normal',
            'p'
        ]
        
        description_text = ""
        for selector in description_selectors:
            desc_elems = soup.select(selector)
            for elem in desc_elems:
                text = elem.get_text(strip=True)
                if len(text) > 50:
                    description_text += text + " "
                    if len(description_text) > 800:
                        break
            if description_text:
                break
        
        article_data["description"] = description_text.strip()[:800]
        
        # Calculate word count and reading time
        word_count = len(article_data["description"].split())
        article_data["word_count"] = word_count
        article_data["reading_time"] = max(1, word_count // 200)  # Assuming 200 words per minute
        
        # Extract image URL (filter out .cms images)
        img_selectors = [
            'img[class*="img-responsive"]',
            'img[data-src]',
            'img[src*="jpg"]',
            'img[src*="png"]',
            'img[src*="jpeg"]'
        ]
        
        for selector in img_selectors:
            img_elem = soup.select_one(selector)
            if img_elem:
                img_url = img_elem.get('data-src') or img_elem.get('src')
                if img_url and '.cms' not in img_url:
                    article_data["img_url"] = urljoin(self.base_url, img_url)
                    break
        
        # Extract video URL
        video_selectors = [
            'video source',
            'iframe[src*="youtube"]',
            'iframe[src*="vimeo"]',
            'div[data-video-url]'
        ]
        
        for selector in video_selectors:
            video_elem = soup.select_one(selector)
            if video_elem:
                video_url = video_elem.get('src') or video_elem.get('data-video-url')
                if video_url:
                    article_data["video_url"] = video_url
                    break
        
        # Extract location
        location_selectors = [
            'span[class*="location"]',
            'span.dateline',
            'span.place-name'
        ]
        
        for selector in location_selectors:
            location_elem = soup.select_one(selector)
            if location_elem:
                article_data["location"] = location_elem.get_text(strip=True)
                break
        
        # Extract locations mentioned in text
        full_text = f"{article_data['title']} {article_data['description']}"
        article_data["locations_mentioned"] = self.extract_location_from_text(full_text)
        
        # If no specific location found, use first mentioned location
        if not article_data["location"] and article_data["locations_mentioned"]:
            article_data["location"] = article_data["locations_mentioned"][0]
        
        # Extract timestamp
        timestamp_selectors = [
            'span[class*="timestamp"]',
            'span.time',
            'time',
            'span.article-time',
            'div.byline'
        ]
        
        for selector in timestamp_selectors:
            time_elem = soup.select_one(selector)
            if time_elem:
                time_text = time_elem.get_text(strip=True)
                article_data["timestamp"] = time_text
                break
        
        if not article_data["timestamp"]:
            article_data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Categorize article and extract sentiment
        article_data["categories"] = self.categorize_article(
            article_data["title"], 
            article_data["description"], 
            article_url
        )
        
        article_data["sentiment"] = self.extract_sentiment(full_text)
        
        # Calculate urgency score
        article_data["urgency_score"] = self.calculate_urgency_score(
            article_data["categories"],
            article_data["sentiment"],
            article_data["title"],
            article_data["description"]
        )
        
        # Determine if relevant for city pulse
        city_pulse_categories = ['traffic', 'civic', 'weather', 'emergency', 'events', 'infrastructure', 'health']
        article_data["relevant_for_city_pulse"] = any(cat in city_pulse_categories for cat in article_data["categories"])
        
        # Generate tags
        tags = set()
        for category in article_data["categories"]:
            tags.add(category)
        for location in article_data["locations_mentioned"]:
            tags.add(location.lower())
        if article_data["sentiment"] != "neutral":
            tags.add(article_data["sentiment"])
        
        article_data["tags"] = list(tags)
        
        # Set article type based on primary category
        if article_data["categories"]:
            article_data["type"] = article_data["categories"][0]
        
        return article_data

    def get_city_pulse_articles(self, target_count=200):
        """Get articles from multiple sections focusing on city pulse data"""
        all_links = []
        
        # Sections most relevant for city pulse
        sections = [
            "",  # Main page
            "/city",  # City news - most important
            "/india",  # National news
            "/world",  # International news that might affect cities
            "/business",  # Business news affecting city life
            "/sports",  # Sports events in cities
            "/entertainment",  # Cultural events
            "/tech"  # Technology affecting city life
        ]
        
        for section in sections:
            if len(all_links) >= target_count:
                break
                
            section_url = f"{self.base_url}{section}"
            logger.info(f"Scraping section: {section_url}")
            
            html_content = self.get_page_content(section_url)
            if html_content:
                section_links = self.extract_article_links(html_content)
                for link in section_links:
                    if link not in all_links:
                        all_links.append(link)
                        if len(all_links) >= target_count:
                            break
            
            time.sleep(0.5)
        
        return all_links[:target_count]

    def scrape_city_pulse_data(self, num_articles=200):
        """Main scraping function for city pulse data"""
        logger.info("Starting City Pulse data scraping...")
        
        # Get article links from multiple sections
        article_links = self.get_city_pulse_articles(target_count=num_articles)
        logger.info(f"Found {len(article_links)} article links")
        
        # Scrape articles
        scraped_articles = []
        city_pulse_articles = []
        
        for i, article_url in enumerate(article_links):
            logger.info(f"Scraping article {i+1}/{len(article_links)}: {article_url}")
            
            article_data = self.extract_article_data(article_url)
            if article_data and article_data["title"]:
                scraped_articles.append(article_data)
                
                # Separate city pulse relevant articles
                if article_data["relevant_for_city_pulse"]:
                    city_pulse_articles.append(article_data)
            
            time.sleep(0.5)
            
            # Log progress every 25 articles
            if (i + 1) % 25 == 0:
                logger.info(f"Progress: {i+1}/{len(article_links)} articles processed")
                logger.info(f"City Pulse relevant: {len(city_pulse_articles)}/{len(scraped_articles)}")
        
        logger.info(f"Successfully scraped {len(scraped_articles)} total articles")
        logger.info(f"City Pulse relevant articles: {len(city_pulse_articles)}")
        
        return scraped_articles, city_pulse_articles

    def save_to_json(self, articles, filename="city_pulse_data.json"):
        """Save scraped articles to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(articles, f, ensure_ascii=False, indent=2)
        logger.info(f"Articles saved to {filename}")

    def generate_analytics_report(self, articles):
        """Generate analytics report for city pulse data"""
        report = {
            "total_articles": len(articles),
            "city_pulse_relevant": len([a for a in articles if a["relevant_for_city_pulse"]]),
            "categories_distribution": {},
            "sentiment_distribution": {},
            "urgency_distribution": {},
            "top_locations": {},
            "average_urgency_score": 0,
            "high_urgency_articles": []
        }
        
        urgency_scores = []
        
        for article in articles:
            # Categories distribution
            for category in article["categories"]:
                report["categories_distribution"][category] = report["categories_distribution"].get(category, 0) + 1
            
            # Sentiment distribution
            sentiment = article["sentiment"]
            report["sentiment_distribution"][sentiment] = report["sentiment_distribution"].get(sentiment, 0) + 1
            
            # Urgency distribution
            urgency = article["urgency_score"]
            urgency_scores.append(urgency)
            urgency_range = f"{urgency//2*2}-{urgency//2*2+1}"
            report["urgency_distribution"][urgency_range] = report["urgency_distribution"].get(urgency_range, 0) + 1
            
            # Top locations
            for location in article["locations_mentioned"]:
                report["top_locations"][location] = report["top_locations"].get(location, 0) + 1
            
            # High urgency articles
            if urgency >= 7:
                report["high_urgency_articles"].append({
                    "title": article["title"],
                    "urgency_score": urgency,
                    "categories": article["categories"],
                    "location": article["location"]
                })
        
        # Calculate average urgency
        if urgency_scores:
            report["average_urgency_score"] = sum(urgency_scores) / len(urgency_scores)
        
        return report

# Example usage for City Pulse Application
if __name__ == "__main__":
    scraper = CityPulseDataScraper()
    
    # Scrape 200 articles with city pulse focus
    all_articles, city_pulse_articles = scraper.scrape_city_pulse_data(num_articles=1000)
    
    # Save all articles
    scraper.save_to_json(all_articles, "all_articles.json")
    
    # Save only city pulse relevant articles
    scraper.save_to_json(city_pulse_articles, "city_pulse_articles.json")
    
    # Generate analytics report
    report = scraper.generate_analytics_report(all_articles)
    
    # Save analytics report
    with open("city_pulse_analytics.json", "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    # Print summary
    print(f"\n🏙️  CITY PULSE DATA COLLECTION SUMMARY")
    print(f"=" * 50)
    print(f"Total articles scraped: {len(all_articles)}")
    print(f"City Pulse relevant articles: {len(city_pulse_articles)}")
    print(f"Average urgency score: {report['average_urgency_score']:.2f}")
    print(f"High urgency articles (7+): {len(report['high_urgency_articles'])}")
    
    print(f"\n📊 TOP CATEGORIES:")
    for category, count in sorted(report['categories_distribution'].items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"  {category}: {count} articles")
    
    print(f"\n📍 TOP LOCATIONS:")
    for location, count in sorted(report['top_locations'].items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"  {location}: {count} mentions")
    
    print(f"\n😊 SENTIMENT DISTRIBUTION:")
    for sentiment, count in report['sentiment_distribution'].items():
        print(f"  {sentiment}: {count} articles")
    
    print(f"\n🚨 HIGH URGENCY ARTICLES:")
    for article in report['high_urgency_articles'][:3]:
        print(f"  • {article['title'][:60]}... (Score: {article['urgency_score']})")
    
    print(f"\n✅ Files created:")
    print(f"  • all_articles.json - All scraped articles")
    print(f"  • city_pulse_articles.json - City pulse relevant articles only")
    print(f"  • city_pulse_analytics.json - Analytics report")