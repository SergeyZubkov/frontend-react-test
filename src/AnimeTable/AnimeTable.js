import {Table} from 'react-bootstrap';
import './AnimeTable.css'

export default ({data, onSortBy, sortBy, sortOrder, onSelectedRow, selectedRowId}) => (
    <Table  bordered hover>
        <thead>
            <tr>
            {[
                {title: "id", property: "id"},
                {title: "title", property: "attributes.canonicalTitle"},
                {title: "PR", property: "attributes.popularityRank"},
                {title: "Created At", property: "attributes.startDate"}
            ].map(item => (
                <th 
                    key={item.title}
                    onClick={() => onSortBy(item.property)}
                >
                    {item.title}
                    {sortBy === item.property
                    ? (sortOrder === 'asc' 
                        ? <span dangerouslySetInnerHTML={{__html: "&#9650;"}}></span> 
                        : <span dangerouslySetInnerHTML={{__html: "&#9660;"}}></span>
                        ) 
                    : null
                    }
                </th>)
            )}
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr 
                key={item.id}
                onClick={() => onSelectedRow(item.id)}
                className={selectedRowId === item.id ? 'selected' : null}
                >
                    <td>{item.id}</td>
                    <td>{item.attributes.canonicalTitle}</td>
                    <td>{item.attributes.popularityRank}</td>
                    <td>{new Date(item.attributes.startDate).toLocaleDateString()}</td>
                </tr>
            ))}
        </tbody>
    </Table>
)