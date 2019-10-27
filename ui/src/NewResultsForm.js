import React from 'react';
import { Form, Header, Segment, Button } from 'semantic-ui-react'
export default class NewResultsForm extends React.Component {
    state = {
        category: '',
        owner_name: '',
        phone_number: '',
        agent_name: '',
        region: '',
        area: '',
        address: '',
        acreage: '',
        building_size: '',
        dimension: '',
        level: '',
        bedroom: '',
        bathroom: '',
        direction: ''
    };
    onChangeCategory = this._onChangeCategory.bind(this);
    onChangeOwnerName = this._onChangeOwnerName.bind(this);
    onChangePhoneNumber = this._onChangePhoneNumber.bind(this);
    onChangeAgentName = this._onChangeAgentName.bind(this);
    onChangeRegion = this._onChangeRegion.bind(this);
    onChangeArea = this._onChangeArea.bind(this);
    onChangeAddress = this._onChangeAddress.bind(this);
    onChangeAcreage = this._onChangeAcreage.bind(this);
    onChangeBuildingSize = this._onChangeBuildingSize.bind(this);
    onChangeDimension = this._onChangeDimension.bind(this);
    onChangeLevel = this._onChangeLevel.bind(this);
    onChangeBedroom = this._onChangeBedroom.bind(this);
    onChangeBathroom = this._onChangeBathroom.bind(this);
    onChangeDirection = this._onChangeDirection.bind(this);
    onSubmit = this._onSubmit.bind(this);
    render() {
        return (
            <div className="ui container">
                <Segment vertical>
                    <Header>Listing Baru</Header>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Kategori</label>
                            <input placeholder='Kategori' value={this.state.category} onChange={this.onChangeCategory} />
                        </Form.Field>
                        <Form.Field>
                            <label>Nama Pemilik</label>
                            <input placeholder='Nama' value={this.state.owner_name} onChange={this.onChangeOwnerName} />
                        </Form.Field>
                        <Form.Field>
                            <label>Nomor Telefon</label>
                            <input placeholder='Telefon' value={this.state.phone_number} onChange={this.onChangePhoneNumber} />
                        </Form.Field>
                        <Form.Field>
                            <label>Nama Agent</label>
                            <input placeholder='Agent' value={this.state.agent_name} onChange={this.onChangeAgentName} />
                        </Form.Field>
                        <Form.Field>
                            <label>Wilayah</label>
                            <input placeholder='Wilayah' value={this.state.region} onChange={this.onChangeRegion} />
                        </Form.Field>
                        <Form.Field>
                            <label>Area</label>
                            <input placeholder='Area' value={this.state.area} onChange={this.onChangeArea} />
                        </Form.Field>
                        <Form.Field>
                            <label>Alamat</label>
                            <input placeholder='Alamat' value={this.state.address} onChange={this.onChangeAddress} />
                        </Form.Field>
                        <Form.Field>
                            <label>Luas Tanah</label>
                            <input placeholder='Tanah' value={this.state.acreage} onChange={this.onChangeAcreage} />
                        </Form.Field>
                        <Form.Field>
                            <label>Luas Bangunan</label>
                            <input placeholder='Bangunan' value={this.state.building_size} onChange={this.onChangeBuildingSize} />
                        </Form.Field>
                        <Form.Field>
                            <label>Dimensi</label>
                            <input placeholder='Dimensi' value={this.state.dimension} onChange={this.onChangeDimension} />
                        </Form.Field>
                        <Form.Field>
                            <label>Lantai</label>
                            <input placeholder='Lantai' value={this.state.level} onChange={this.onChangeLevel} />
                        </Form.Field>
                        <Form.Field>
                            <label>Kamar Tidur</label>
                            <input placeholder='Kamar' value={this.state.bedroom} onChange={this.onChangeBedroom} />
                        </Form.Field>
                        <Form.Field>
                            <label>Kamar Mandi</label>
                            <input placeholder='Mandi' value={this.state.bathroom} onChange={this.onChangeBathroom} />
                        </Form.Field>
                        <Form.Field>
                            <label>Mata Angin</label>
                            <input placeholder='Angin' value={this.state.direction} onChange={this.onChangeDirection} />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
    _onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }
    _onChangeOwnerName(e) {
        this.setState({
            owner_name: e.target.value
        });
    }
    _onChangePhoneNumber(e) {
        this.setState({
            phone_number: e.target.value
        });
    }
    _onChangeAgentName(e) {
        this.setState({
            agent_name: e.target.value
        });
    }
    _onChangeRegion(e) {
        this.setState({
            region: e.target.value
        });
    }
    _onChangeArea(e) {
        this.setState({
            area: e.target.value
        });
    }
    _onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    _onChangeAcreage(e) {
        this.setState({
            acreage: e.target.value
        });
    }
    _onChangeBuildingSize(e) {
        this.setState({
            building_size: e.target.value
        });
    }
    _onChangeDimension(e) {
        this.setState({
            dimension: e.target.value
        });
    }
    _onChangeLevel(e) {
        this.setState({
            level: e.target.value
        });
    }
    _onChangeBedroom(e) {
        this.setState({
            bedroom: e.target.value
        });
    }
    _onChangeBathroom(e) {
        this.setState({
            bathroom: e.target.value
        });
    }
    _onChangeDirection(e) {
        this.setState({
            direction: e.target.value
        });
    }
    _onSubmit() {
        const payload = {
            category: this.state.category,
            owner_name: this.state.owner_name,
            phone_number: this.state.phone_number,
            agent_name: this.state.agent_name,
            region: this.state.region,
            area: this.state.area,
            address: this.state.address,
            acreage: parseFloat(this.state.acreage),
            building_size: parseFloat(this.state.building_size),
            dimension: parseFloat(this.state.dimension),
            level: parseFloat(this.state.level),
            bedroom: parseFloat(this.state.bedroom),
            bathroom: parseFloat(this.state.bathroom),
            direction: this.state.direction
        };
        fetch('http://localhost:4444/listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        this.setState({category: '',
            owner_name: '',
            phone_number: '',
            agent_name: '',
            region: '',
            area: '',
            address: '',
            acreage: '',
            building_size: '',
            dimension: '',
            level: '',
            bedroom: '',
            bathroom: '',
            direction: ''
        });
    }
}