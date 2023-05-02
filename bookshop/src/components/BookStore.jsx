import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksAction } from '../redux/actions'
import React from 'react'

const BookStore = () => {
  const [bookSelected, setBookSelected] = useState(null)

  const dispatch = useDispatch()
  const booksFromRedux = useSelector((state) => state.book.stock.map((book) => ({
    ...book,
    cover: `/images/${book.cover}`
  })))
  console.log("booksFromRedux", booksFromRedux)

  useEffect(() => {
    dispatch(getBooksAction())
  }, [])

  const changeBook = (book) => setBookSelected(book)

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList
          bookSelected={bookSelected}
          changeBook={changeBook}
          books={booksFromRedux}
        />
      </Col>
      <Col lg={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookStore
