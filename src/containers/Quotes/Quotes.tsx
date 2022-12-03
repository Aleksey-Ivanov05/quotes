import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useLocation, useParams} from "react-router-dom";
import {QuoteList, QuoteType} from "../../types";
import Quote from "./Quote";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";


const Quotes: React.FC = () => {
  const location = useLocation();
  const {category} = useParams();
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [loading, setLoading] = useState(false);

  const CATEGORIES = [
    {name: 'Star Wars', id: 'star-wars'},
    {name: 'Famous people', id: 'famous-people'},
    {name: 'Saying', id: 'saying'},
    {name: 'Humour', id: 'humour'},
    {name: 'Motivational', id: 'motivational'},
  ]

  const fetch = async (link: string) => {
    try {
      setLoading(true);
      const quotesResponse = await axiosApi.get<QuoteList>(link);
      const quotes = Object.keys(quotesResponse.data).map(key => {
        const post = quotesResponse.data[key];
        post.id = key;
        return post;
      });
      setQuotes(quotes);
    } finally {
      setLoading(false);
    }
  }

  const fetchQuotes = useCallback(() => {
    fetch('.json').catch(console.error);
  }, [])

  useEffect(() => {
    if (location.pathname === '/') {
      fetchQuotes();
    }
  }, [fetchQuotes, location])

  const changeCategory = useCallback(() => {
    fetch('.json?orderBy="category"&equalTo="' + category + '"').catch(console.error);
  }, [category]);

  useEffect(() => {
    if (category) {
      changeCategory();
    }
  }, [category, changeCategory])

  console.log(category);

  return (
    <div className="row mt-3">
      <div className="col-4">
        <ul>
          <li><NavLink to="/">All</NavLink></li>
          {CATEGORIES.map(category => (
            <li key={category.id}><NavLink to={'/quotes/' + category.id}>{category.name}</NavLink></li>
          ))}
        </ul>
      </div>
      <div className="col-8">
        <h4>{category ? CATEGORIES.filter(CATEGORY => CATEGORY.id === category)[0].name : 'All'}</h4>
        {loading ? <Spinner/> : (
          <div>
            {quotes.map(quote => (
              <Quote key={quote.id} quote={quote} fetch={fetch}/>
            ))}
          </div>)}
      </div>
    </div>
  );
};

export default Quotes;