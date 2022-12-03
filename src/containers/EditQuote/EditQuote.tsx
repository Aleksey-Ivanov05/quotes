import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {QuoteApi, QuoteType} from "../../types";
import axiosApi from "../../axiosApi";
import QuoteForm from "../../components/QuoteForm/QuoteForm";

const EditQuote = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<QuoteApi | null>(null);

  const fetchOneQuote = useCallback(async () => {
    try {
      const quotesResponse = await axiosApi.get('/' + id + '.json');
      setQuote(quotesResponse.data);
    } finally {
    }
  }, [id])

  const updateQuote = async (quote: QuoteApi) => {
    try {
      await axiosApi.put<QuoteType>('/' + id + '.json', quote);
      navigate('/');
    } finally {
    }
  }

  useEffect(() => {
    if (id) {
      fetchOneQuote().catch(console.error);
    }
  }, [id, fetchOneQuote]);

  return (
    <div>
      {quote && <QuoteForm onSubmit={updateQuote} existingQuote={quote}/>}
    </div>
  );
};

export default EditQuote;