import urllib.request
import json
import random
import os

def generate_quotes_json():
    print("Downloading dataset...")
    url = 'https://raw.githubusercontent.com/alvations/Quotables/master/author-quote.txt'
    
    # Using a request with a User-Agent to avoid 403 Forbidden
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    try:
        response = urllib.request.urlopen(req)
        data = response.read().decode('utf-8').split('\n')
    except Exception as e:
        print(f"Failed to download dataset: {e}")
        return

    categories = [
        "Inspirational", "Life", "Wisdom", "Love", "Humor", 
        "Success", "Motivation", "Education", "Philosophy", 
        "Art", "Science", "Friendship", "Happiness", "History"
    ]
    
    quotes_list = []
    
    valid_lines = [line for line in data if '\t' in line]
    
    for line in valid_lines:
        parts = line.strip().split('\t')
        if len(parts) == 2:
            author, quote = parts
            quotes_list.append({
                "quote": quote,
                "author": author,
                "category": random.choice(categories)
            })
            
    extra_quotes = [
        {"quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs", "category": "Inspirational"},
        {"quote": "Be yourself; everyone else is already taken.", "author": "Oscar Wilde", "category": "Life"},
        {"quote": "Two things are infinite: the universe and human stupidity; and I am not sure about the universe.", "author": "Albert Einstein", "category": "Humor"},
        {"quote": "In three words I can sum up everything I've learned about life: it goes on.", "author": "Robert Frost", "category": "Life"},
        {"quote": "If you tell the truth, you don't have to remember anything.", "author": "Mark Twain", "category": "Wisdom"},
        {"quote": "A room without books is like a body without a soul.", "author": "Marcus Tullius Cicero", "category": "Wisdom"},
        {"quote": "You only live once, but if you do it right, once is enough.", "author": "Mae West", "category": "Life"},
        {"quote": "Be the change that you wish to see in the world.", "author": "Mahatma Gandhi", "category": "Inspirational"},
        {"quote": "A friend is someone who knows all about you and still loves you.", "author": "Elbert Hubbard", "category": "Friendship"},
        {"quote": "To live is the rarest thing in the world. Most people exist, that is all.", "author": "Oscar Wilde", "category": "Life"},
        {"quote": "Always forgive your enemies; nothing annoys them so much.", "author": "Oscar Wilde", "category": "Humor"},
        {"quote": "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.", "author": "Martin Luther King Jr.", "category": "Love"},
        {"quote": "Live as if you were to die tomorrow. Learn as if you were to live forever.", "author": "Mahatma Gandhi", "category": "Wisdom"},
        {"quote": "We accept the love we think we deserve.", "author": "Stephen Chbosky", "category": "Love"},
        {"quote": "Without music, life would be a mistake.", "author": "Friedrich Nietzsche", "category": "Art"},
        {"quote": "I am so clever that sometimes I don't understand a single word of what I am saying.", "author": "Oscar Wilde", "category": "Humor"},
        {"quote": "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "author": "Ralph Waldo Emerson", "category": "Inspirational"},
        {"quote": "It is better to be hated for what you are than to be loved for what you are not.", "author": "Andre Gide", "category": "Life"},
        {"quote": "The fool doth think he is wise, but the wise man knows himself to be a fool.", "author": "William Shakespeare", "category": "Wisdom"},
        {"quote": "Life is what happens to us while we are making other plans.", "author": "Allen Saunders", "category": "Life"},
        {"quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.", "author": "Winston S. Churchill", "category": "Success"},
        {"quote": "You miss 100% of the shots you don't take.", "author": "Wayne Gretzky", "category": "Motivation"},
        {"quote": "What you get by achieving your goals is not as important as what you become by achieving your goals.", "author": "Zig Ziglar", "category": "Success"},
        {"quote": "I have not failed. I've just found 10,000 ways that won't work.", "author": "Thomas A. Edison", "category": "Science"},
        {"quote": "The only limit to our realization of tomorrow will be our doubts of today.", "author": "Franklin D. Roosevelt", "category": "Wisdom"},
        {"quote": "It does not matter how slowly you go as long as you do not stop.", "author": "Confucius", "category": "Motivation"},
        {"quote": "Everything you’ve ever wanted is on the other side of fear.", "author": "George Addair", "category": "Motivation"},
        {"quote": "Hardships often prepare ordinary people for an extraordinary destiny.", "author": "C.S. Lewis", "category": "Inspirational"},
        {"quote": "Believe you can and you're halfway there.", "author": "Theodore Roosevelt", "category": "Motivation"},
        {"quote": "When you have a dream, you've got to grab it and never let go.", "author": "Carol Burnett", "category": "Inspirational"}
    ]
    quotes_list.extend(extra_quotes)
            
    # Write to File
    output_path = os.path.join(os.getcwd(), 'quotes.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(quotes_list, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully generated {len(quotes_list)} quotes in {output_path}")

if __name__ == '__main__':
    generate_quotes_json()
