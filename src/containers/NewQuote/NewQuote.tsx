import React from 'react';
import {useNavigate} from "react-router-dom";
import {QuoteApi} from "../../types";
import axiosApi from "../../axiosApi";
import QuoteForm from "../../components/QuoteForm/QuoteForm";

const NewQuote = () => {
  const navigate = useNavigate();

  const createQuote = async (quote: QuoteApi) => {
    try {
      await axiosApi.post('.json', quote);
      navigate('/');
    } finally {

    }
  };
  return (
    <div className="mt-4">
      <QuoteForm onSubmit={createQuote}/>
    </div>
  );
};

export default NewQuote;