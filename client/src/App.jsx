import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

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
          return <h1 key={i.toString()}>MovieName: {val.movie_name} | Movie Review: {val.movie_review}</h1> 
        })}
      </div>
    </div>
  );
}

export default App;
