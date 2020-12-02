import React, {Component} from 'react'
import './App.css';
import {Spinner, Container, Row, Col, Pagination} from 'react-bootstrap';
import AnimeTable from './AnimeTable/AnimeTable';
import AnimeDetail from './AnimeDetail/AnimeDetail';
import {orderBy} from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    isLoading: true,
    data: [],
    sortOrder: 'asc',
    sortBy: null,
    selectedRow: null,
    activePage: 1,
    pages: Array.from({length: 10}, (_, i) => i + 1)
  }
  render() {
    const {
      isLoading,
      data,
      sortBy,
      sortOrder,
      selectedRow,
      activePage,
      pages
    } = this.state;

    return (
      <div className="app">
        <Container>
          <Row>
            <Col>
            {
              isLoading
              ? <Spinner animation="border" variant="primary" size="big" />
              : <AnimeTable 
                  data={data} 
                  onSortBy={this.sortBy} 
                  sortBy={sortBy} 
                  sortOrder={sortOrder} 
                  onSelectedRow={this.selectRow}
                  selectedRowId={selectedRow&&selectedRow.id}
                />
            }
             <Pagination>
               <Pagination.Prev onClick={this.prevPage} />
               {pages.map(n => (
                  <Pagination.Item 
                    key={n} 
                    active={n === activePage}
                    onClick={() => this.handleChangePage(n)}
                  >
                    {n}
                  </Pagination.Item>
               ))}
               <Pagination.Next onClick={this.nextPage} />
             </Pagination>
            </Col>
            <Col>
            {selectedRow&&<AnimeDetail data={selectedRow} />}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  async fetchDataForPage(pageNumber) {
    this.setState({
      isLoading: true
    })
    const showPerPage = 20;
    const response = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=${20}&page[offset]=${20 * (pageNumber- 1)}`);
    const d = await response.json();
    
    this.setState({
      isLoading: false,
      data: d.data,
      activePage: pageNumber
    })
  }

  async componentDidMount() {
   this.fetchDataForPage(this.state.activePage);
  }

  sortBy = property => this.setState((state) => {
    let sortOrder;
    if (state.sortOrder === 'asc') {
      sortOrder = 'desc'
    } else {
      sortOrder = 'asc'
    }

    return {sortOrder, sortBy: property, data: orderBy(state.data, property, state.sortOrder) }
  })

  selectRow = id => this.setState((state) => ({selectedRow: state.data.find(row => row.id === id)}))

  handleChangePage = number => {
    let {pages} = this.state;
    if (number === pages.slice(-1)[0]) {
      this.setState(state => {
        let {pages} = state;

        return {
          pages: pages.map((n, i) => {
            if (i === 0) return number;
            return number + i;
          }) 
        }
      })
    }
    else if (number !== 1&&number === pages[0]) {
      this.setState(state => {
        let {pages} = state;

        return {
          pages: pages.map((n, i) => {
            if (i === 0) return number;
            return number - i;
          }).reverse()
        }
      })
    }
    this.fetchDataForPage(number)
  }

  prevPage = () => {
    this.handleChangePage(this.state.activePage - 1);
  }

  nextPage = () => {
    this.handleChangePage(this.state.activePage + 1)
  }
}

export default App;
