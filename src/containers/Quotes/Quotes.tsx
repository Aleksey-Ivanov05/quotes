import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useLocation, useParams} from "react-router-dom";
import {QuoteList, QuoteType} from "../../types";
import Quote from "./Quote";
import axiosApi from "../../axiosApi";


const Quotes: React.FC= () => {
  const location = useLocation();
  const {category} = useParams();
  const [quotes, setQuotes] = useState<QuoteType[]>([]);

  const CATEGORIES = [
    {name: 'Star Wars', id: 'star-wars'},
    {name: 'Famous people', id: 'famous-people'},
    {name: 'Saying', id: 'saying'},
    {name: 'Humour', id: 'humour'},
    {name: 'Motivational', id: 'motivational'},
  ]

  const fetchQuotes = useCallback(async () => {
    try {
      // const quotesResponse = await axiosApi.get<QuoteList>('.json?orderBy="category"&equalTo="' + location.pathname.slice(1) + '"');
      const quotesResponse = await axiosApi.get<QuoteList>('.json');
      const quotes = Object.keys(quotesResponse.data).map(key => {
        const post = quotesResponse.data[key];
        post.id = key;
        return post;
      });
      setQuotes(quotes);

    } finally {

    }
  },[])

  useEffect(() => {
    if (location.pathname === '/') {
      fetchQuotes().catch(console.error);
    }
  }, [fetchQuotes, location])

  const changeCategory = useCallback(async () => {
    try {
      const quotesResponse = await axiosApi.get<QuoteList>('.json?orderBy="category"&equalTo="' + category + '"');
      const quotes = Object.keys(quotesResponse.data).map(key => {
        const post = quotesResponse.data[key];
        post.id = key;
        return post;
      });
      setQuotes(quotes);
      console.log(quotes);
    } finally {

    }
  }, [category]);

  useEffect(() => {
    if (category) {
      changeCategory().catch(console.error);
    }
  }, [category, changeCategory])

  console.log(category);

  return (
    <div className="row mt-3">
      <div className="col-4">
        <ul>
          <li><NavLink to="/">All</NavLink></li>
          {CATEGORIES.map(category => (
            <li key={category.id}> <NavLink to={'/quotes/'+ category.id}>{category.name}</NavLink></li>
          ))}
        </ul>
      </div>
      <div className="col-8">
        <h4>{category ? CATEGORIES.filter(CATEGORY => CATEGORY.id === category)[0].name : 'All'}</h4>
        <div>
          {quotes.map(quote => (
            <Quote key={quote.id} quote={quote}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;