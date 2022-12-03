import React from 'react';
import {QuoteType} from "../../types";
import axiosApi from "../../axiosApi";
import {Link, useLocation} from "react-router-dom";

interface Props {
  quote: QuoteType;
  fetch: (link: string) => void;
}


const Quote: React.FC<Props> = ({quote, fetch}) => {
  const location = useLocation();
  const deleteQuote = async () => {
    try {
      await axiosApi.delete('/' + quote.id + '.json');
      if (location.pathname === '/') {
        await fetch('.json');
      } else {
        await fetch('.json?orderBy="category"&equalTo="' + quote.category + '"');
      }
    } finally {

    }
  }
  return (
    <div className="p-2 border border-dark border-2 mb-4 row">
      <div className="col-10">
        <p className="m-0">"{quote.text}"</p>
        <p className="m-0">&mdash; {quote.author}</p>
      </div>
      <div className="col-2 row">
        <Link to={"/quotes/" + quote.id + '/edit'} className="col-5 me-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
               className="bi bi-pencil-square" viewBox="0 0 16 16">
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        </Link>
        <span className="col-5" onClick={deleteQuote}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-trash"
               viewBox="0 0 16 16">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path
           d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Quote;