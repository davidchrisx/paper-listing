    import React from 'react';
    import ResultsTable from './ResultsTable';
    export default class ConnectedResultsTable extends React.Component {
        state = {
            records: []
        };
        componentDidMount() {
            fetch('http://localhost:4444/listing')
                .then((response) => response.json())
                .then((response) => this.setState(response));
        };
        

        render() {
            return <ResultsTable results={this.state.records} />;
        }
        
    }