import React, {Component} from 'react'
import './App.css';
import {Spinner, Container, Row, Col} from 'react-bootstrap';
import AnimeTable from './AnimeTable/AnimeTable';
import AnimeDetail from './AnimeDetail/AnimeDetail';
import {orderBy} from 'lodash';
import Pagination from "react-js-pagination";

import 'bootstrap/dist/css/bootstrap.min.css';
import AnimeSearch from './AnimeSearch/AnimeSearch';
import AddItemForm from './AddItemForm/AddItemForm';
import ItemsPerPageSelect from './ItemsPerPageSelect/ItemsPerPageSelect';

const ITEMS_PER_PAGE_RANGE = [10, 15, 20];
const PAGE_RANGE_DISPLAYED = 10;

class App extends Component {
  state = {
    isLoading: true,
    data: [],
    sortOrder: 'asc',
    sortProperty: null,
    selectedRow: null,
    activePage: 1,
    searchText: '',
    itemsPerPage: '10',
    totalItems: null
  }
  render() {
    const {
      isLoading,
      data,
      sortProperty,
      sortOrder,
      selectedRow,
      activePage,
      itemsPerPage,
      totalItems
    } = this.state;

    return (
      <div className="app">
        <Container>
          <Row>
            <Col>
            <AddItemForm onAddItem={this.handleAddItem} />
            {
              isLoading
              ? <Spinner animation="border" variant="primary" size="big" />
              : <AnimeTable 
                  data={data} 
                  onSortBy={this.sortBy} 
                  sortBy={sortProperty} 
                  sortOrder={sortOrder} 
                  onSelectedRow={this.selectRow}
                  selectedRowId={selectedRow&&selectedRow.id}
                />
            }
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={totalItems}
              pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
              onChange={this.handleChangePage}
              itemClass="page-item"
              linkClass="page-link"
            />
              <ItemsPerPageSelect 
                range={ITEMS_PER_PAGE_RANGE} 
                onSelect={this.handleSelectItemsPerPage}
              />
            </Col>
            <Col>
            <AnimeSearch onSearch={this.handleSearch} />
            {selectedRow&&<AnimeDetail data={selectedRow} />}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({
      isLoading: true
    })
    const {
      itemsPerPage, 
      searchText,
      activePage
    } = this.state;
    
    const url = "https://kitsu.io/api/edge/anime?",
          filter = (searchText ? "filter[text]=" + searchText + ";" : ""),
          page = `page[limit]=${itemsPerPage}&page[offset]=${itemsPerPage * (activePage - 1)}`;

    const response = await fetch( url + filter + page)
    const d = await response.json();
    
    this.setState({
      isLoading: false,
      data: d.data,
      totalItems: d.meta.count
    })
  }
  
  handleSearch = searchText => {
    this.setState({searchText}, () => this.fetchData())
  }

  handleAddItem = item => {
    this.setState(({data}) => ({
      data: [{id: 92000, attributes: item}, ...data]
    }))
  }

  sortBy = sortProperty => this.setState(({sortOrder, data}) => ({
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
      sortProperty, 
      data: orderBy(data, sortProperty, sortOrder) 
  }))

  selectRow = id => this.setState((state) => ({selectedRow: state.data.find(row => row.id === id)}))

  handleChangePage = activePage => {
    this.setState({activePage}, () => this.fetchData())
  }

  prevPage = () => {
    this.handleChangePage(this.state.activePage - 1);
  }

  nextPage = () => {
    this.handleChangePage(this.state.activePage + 1)
  }

  handleSelectItemsPerPage = itemsPerPage => {
    this.setState({itemsPerPage}, () => this.fetchData())
  }
}

export default App;
