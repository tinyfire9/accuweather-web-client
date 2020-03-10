import React from 'react';
import { API_KEY, BASE_URL, ENTITIES } from '../../constants';

interface Country {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
}

interface CountryListState {
    list?: Country[];
}

export class CountryView extends React.Component<any, CountryListState> {
    constructor(props: any){
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        fetch(`${BASE_URL}/${ENTITIES.locations}/v1/countries?apikey=${API_KEY}`)
            .then((res: Response) => res.json())
            .then((data: any) => {
                console.log({data})
                this.setState({ list: JSON.parse(JSON.stringify(data)) });
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }

    render(){
        return (<div>{JSON.stringify(this.state.list)}</div>);
    }
}
