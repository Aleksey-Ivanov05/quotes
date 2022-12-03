import React, {useState} from 'react';
import {QuoteApi} from "../../types";

interface Props {
  onSubmit: (quote: QuoteApi) => void;
  existingQuote?: QuoteApi;
}

const QuoteForm: React.FC<Props> = ({onSubmit, existingQuote}) => {
  const initialState = existingQuote || {
    category: '',
    author: '',
    text: '',
  };
  const [quote, setQuote] = useState(initialState);

  const onQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setQuote(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(quote);
  }

  return (
    <div className="border border-dark border-2 p-3 mt-2">
      <h3>Submit new quote</h3>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" className="form-control" value={quote.category} onChange={onQuoteChange}>
            <option disabled value=""></option>
            <option value="star-wars">Star Wars</option>
            <option value="famous-people">Famous People</option>
            <option value="saying">Saying</option>
            <option value="humour">Humour</option>
            <option value="motivational">Motivational</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input id="author" type="text" name="author" className="form-control" value={quote.author} onChange={onQuoteChange}/>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="text">Text</label>
          <textarea id="text" name="text" className="form-control" value={quote.text} onChange={onQuoteChange}/>
        </div>
        <button className="btn btn-primary mt-2" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuoteForm;