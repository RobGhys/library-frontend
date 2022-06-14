import {useQuery} from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import {ALL_AUTHORS} from './queries'
import { ALL_BOOKS } from './queries'

const Notify = ({errorMessage}) => {
  if (! errorMessage) return null

  return (
      <div style={{color: 'red'}}>
          {errorMessage}
      </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
    const [page, setPage] = useState('authors')

    const result = useQuery(ALL_AUTHORS);
    const booksResult = useQuery(ALL_BOOKS);
    
    if (result.loading || booksResult.loading) {
        // the query has not received a response yet
        return <div>loading...</div>
    }

    const notify = (message) => {
      setErrorMessage(message);
      setTimeout(() => {
          setErrorMessage(null)
      }, 10000)
  }


    return (
    <div>
      <div>
        <Notify errorMessage={errorMessage}/>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} setError={notify} />

      <Books show={page === 'books'} books={booksResult.data.allBooks} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
    )
}

export default App
