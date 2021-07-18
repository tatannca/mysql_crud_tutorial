/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import { css } from '@emotion/react'

import { MovieReviewItem } from './components/MovieReviewItem';

const Form = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FormInput = css`
  width: 300px;
  height: 60px;
  margin: 10px;
  font-size: 25px;
`;
const MovieReviewItemWrapper = css`
  display: flex;
  flex-direction: column-reverse;
`;

function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((res) => {
      setMovieReviewList(res.data);
    })
  }, [])

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movie_name: movieName,
      movie_review: movieReview
    }).then(() => {
      Axios.get('http://localhost:3001/api/get').then((res) => {
        setMovieReviewList(res.data);
      }).then(() => {
        setMovieName('');
        setMovieReview('');
      });
    }).catch(() => {
      alert('error!');
    });
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div css={Form}>
        <label htmlFor="movieNameLabel">Movie Name:</label>
        <input
          css={FormInput}
          type="text"
          name='movieName'
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)} />

        <label htmlFor="reviewLabel">Review:</label>
        <input
          css={FormInput}
          type="text"
          name='review'
          value={movieReview}
          onChange={(e) => setMovieReview(e.target.value)} />

        <button
          type='button'
          onClick={submitReview}>Submit</button>

        <div css={MovieReviewItemWrapper}>
        {movieReviewList.map((val, i) => (
          <MovieReviewItem
            key={i.toString()}
            reviewItem={val}
            movieReviewList={movieReviewList}
            setMovieReviewList={setMovieReviewList}
          />
        ))}
        </div>

      </div>
    </div>
  );
}

export default App;
