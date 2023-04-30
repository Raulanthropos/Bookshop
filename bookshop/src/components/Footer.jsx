import { useSelector } from 'react-redux'
import React from 'react'

const Footer = () => {
  const booksFromRedux = useSelector((state) => state.book.stock)

  return (
    <footer className="epizon-footer">
      <div>
        <span className="text-muted">Epizon {new Date().getFullYear()}©</span>
      </div>
      <div>We have {booksFromRedux.length} books in stock!</div>
    </footer>
  )
}

export default Footer
