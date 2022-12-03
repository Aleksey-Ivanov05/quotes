import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {QuoteApi, QuoteType} from "../../types";
import axiosApi from "../../axiosApi";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import Spinner from "../../components/Spinner/Spinner";

const EditQuote = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<QuoteApi | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOneQuote = useCallback(async () => {
    try {
      setLoading(true);
      const quotesResponse = await axiosApi.get('/' + id + '.json');
      setQuote(quotesResponse.data);
    } finally {
      setLoading(false);
    }
  }, [id])

  const updateQuote = async (quote: QuoteApi) => {
    try {
      setLoading(true);
      await axiosApi.put<QuoteType>('/' + id + '.json', quote);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchOneQuote().catch(console.error);
    }
  }, [id, fetchOneQuote]);

  return (
    <div>
      {loading ? <Spinner/> : quote && <QuoteForm onSubmit={updateQuote} existingQuote={quote}/>}
    </div>
  );
};

export default EditQuote;