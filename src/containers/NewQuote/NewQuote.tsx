import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {QuoteApi} from "../../types";
import axiosApi from "../../axiosApi";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import Spinner from "../../components/Spinner/Spinner";

const NewQuote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createQuote = async (quote: QuoteApi) => {
    try {
      setLoading(true);
      await axiosApi.post('.json', quote);
      navigate('/');
    } finally {
        setLoading(false);
    }
  };
  return (
    <div className="mt-4">
      {loading ? <Spinner/> : <QuoteForm onSubmit={createQuote}/>}
    </div>
  );
};

export default NewQuote;