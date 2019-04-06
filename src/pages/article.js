import React, { useState, useEffect } from 'react';
import { requestRawText } from './global.js';
import json from '../data/articles.json';

export default function Article(props) {

    const location = (window.location.pathname.match(/\/([^/]*)$/)[1] || '').toLowerCase();
    const article = json.find(article => article.name.toLowerCase() === location);

    return article ? (
        <div> Found article "{article.name}", tags: {JSON.stringify(article)} </div>
    ) : (
        <div> Could not find any article by the name "{location}" </div>
    );
}
