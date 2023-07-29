// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const createArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/articles', {
        title,
        content,
        image_url: imageURL,
        category_id: categoryId,
      });
      setArticles([...articles, response.data]);
      setTitle('');
      setContent('');
      setImageURL('');
      setCategoryId('');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div>
      {/* Landing Page Header */}
      <header className="landing-header">
        <h1>Welcome to My Blog</h1>
      </header>

      {/* Landing Page Content */}
      <div className="landing-content container">
        {/* Call-to-Action Section */}
        <section className="cta-section">
          <h2>Create New Article</h2>
          <form className="create-article-form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <button onClick={createArticle}>Create</button>
          </form>
        </section>

        {/* All Articles Section */}
        <section className="all-articles-section">
          <h2>All Articles</h2>
          <ul className="article-list">
            {/* Display articles */}
            {articles.map((article) => (
              <li key={article.id}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <img src={article.image_url} alt={article.title} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Landing Page Footer */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
