/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import { css } from '@emotion/react'

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
const Card = css`
  width: 500px;
  height: 170px;
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
const UpdateInput = css`
  width: 100px;
  height: 20px;
  margin: 0 10px 10px;
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

  const deleteReview = (id) => {
    Axios.delete('http://localhost:3001/api/delete', {
      data: {id}
    }).then(() => {
      const newReviewList = movieReviewList.filter(item => (
        item.id !== id
      ));
      setMovieReviewList(newReviewList);
    }).catch((err) => {
      console.log(err)
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

        <div>
        {movieReviewList.map((val, i) => {
          return (
            <div key={i.toString()} css={Card}>
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>

              <div>
                <button onClick={() => deleteReview(val.id)}>Delete</button>
                <input type="text" css={UpdateInput} />
                <button>Update</button>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
