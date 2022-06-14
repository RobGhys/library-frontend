import { useMutation } from '@apollo/client'
import { useState, useEffect } from "react"
import {ALL_AUTHORS, EDIT_BORN} from "../queries"

const Authors = ({ show, authors, setError }) => {
  

  const [name, setName] = useState('');
  const [setBornTo, setSetBornTo] = useState('');

  //const [ changeBirthDate, result ] = useMutation(EDIT_BORN);

  const [ changeBirthDate, result ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
        setError(error.graphQLErrors[0].message);
    }
})
  
  const submit = (event) => {
    event.preventDefault();

    changeBirthDate( { variables: {name, setBornTo } })

    setName('')
    setSetBornTo('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) setError('author not found')

}, [result.data]) // eslint-disable-line

if (!show) return null;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born !== null ? a.born : '?'}</td>
              <td>{a.nbBooks}</td>
            </tr>
          )}
        </tbody>
      </table>
    
      <h2>Set birthdate</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input value={name}
                 onChange={ ({ target }) => setName(target.value) }/>
        </div>
        <div>
          born
          <input value={setBornTo}
                onChange={ ({target }) => setSetBornTo(target.value) }/>
        </div>
        <button type='submit'>change born date</button>
      </form>
    </div>
  )
}

export default Authors
