import React from 'react';
import { Table, Header, Segment, Button } from 'semantic-ui-react'

var deleteHandler = function(id) {
    var url = 'http://localhost:4444/listing/' + id
    fetch(url,{
        method: 'DELETE',
    });
};

export default function ResultsTable({results}) {
    var rows = null
    if (results){
    rows = results.map(((result, index) => {
        return (
            <Table.Row key={ index }>
                <Table.Cell>{ result.category }</Table.Cell>
                <Table.Cell>{ result.owner_name }</Table.Cell>
                <Table.Cell>{ result.phone_number }</Table.Cell>
                <Table.Cell>{ result.agent_name }</Table.Cell>
                <Table.Cell>{ result.region }</Table.Cell>
                <Table.Cell>{ result.area }</Table.Cell>
                <Table.Cell>{ result.address }</Table.Cell>
                <Table.Cell>{ result.acreage }</Table.Cell>
                <Table.Cell>{ result.building_size }</Table.Cell>
                <Table.Cell>{ result.dimension }</Table.Cell>
                <Table.Cell>{ result.level }</Table.Cell>
                <Table.Cell>{ result.bedroom }</Table.Cell>
                <Table.Cell>{ result.bathroom }</Table.Cell>
                <Table.Cell>{ result.direction }</Table.Cell>
                <Table.Cell><Button secondary onClick={()=>deleteHandler(result.id)}>delete</Button></Table.Cell>
            </Table.Row>
        );
    }));
    }
    return (
        <div className="ui container">
            <Segment>
                <Header>Listing </Header>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Kategori</Table.HeaderCell>
                            <Table.HeaderCell>Nama Pemilik</Table.HeaderCell>
                            <Table.HeaderCell>Nomor Telefon</Table.HeaderCell>
                            <Table.HeaderCell>Nama Agent</Table.HeaderCell>
                            <Table.HeaderCell>Wilayah</Table.HeaderCell>
                            <Table.HeaderCell>Area</Table.HeaderCell>
                            <Table.HeaderCell>Alamat</Table.HeaderCell>
                            <Table.HeaderCell>Luas Tanah</Table.HeaderCell>
                            <Table.HeaderCell>Luas Bangunan</Table.HeaderCell>
                            <Table.HeaderCell>Dimensi</Table.HeaderCell>
                            <Table.HeaderCell>Lantai</Table.HeaderCell>
                            <Table.HeaderCell>Kamar Tidur</Table.HeaderCell>
                            <Table.HeaderCell>Kamar Mandi</Table.HeaderCell>
                            <Table.HeaderCell>Mata Angin</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { rows }
                    </Table.Body>
                </Table>
            </Segment>
        </div>
    );

}
