/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import { css } from '@emotion/react'

const Card = css`
  width: 500px;
  height: 120px;
  border: 2px solid #000;
  border-radius: 15px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & h1, p {
    margin: 0px;
  }
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
      setMovieReviewList([
        ...movieReviewList,
        {movie_name: movieName, movie_review: movieReview}
      ]);
      console.log('success!');
    }).catch(() => {
      alert('error!');
    });
  }
  
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className='form'>
        <label htmlFor="movieNameLabel">Movie Name:</label>
        <input
          type="text"
          name='movieName'
          onChange={(e) => setMovieName(e.target.value)} />

        <label htmlFor="reviewLabel">Review:</label>
        <input
          type="text"
          name='review'
          onChange={(e) => setMovieReview(e.target.value)} />

        <button
          type='button'
          onClick={submitReview}>Submit</button>

        {movieReviewList.map((val, i) => {
          return (
            <div key={i.toString()} css={Card}>
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
