/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Axios from 'axios';
import { css } from '@emotion/react'

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

export const MovieReviewItem = (props) => {
  const { reviewItem, movieReviewList, setMovieReviewList } = props;
  const [newReview, setNewReview] = useState('');

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

  const updateReview = (id, index) => {
    Axios.put('http://localhost:3001/api/update', {
      id: id,
      movie_review: newReview,
    }).then(() => {
      Axios.get('http://localhost:3001/api/get').then((res) => {
        setMovieReviewList(res.data);
      });
      setNewReview('');
    });
  }

  return (
    <div css={Card}>
      <h1>{reviewItem.movie_name}</h1>
      <p>{reviewItem.movie_review}</p>

      <div>
        <button onClick={() => deleteReview(reviewItem.id)}>Delete</button>
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          css={UpdateInput} />
        <button
          onClick={() => updateReview(reviewItem.id)}
          >Update</button>
      </div>
    </div>
  )
}
