import { Action, fetchDataSuccessAction, fetchDataErrorAction } from './';
import { makeURL, StoreState } from '../'
import { ThunkDispatch } from 'redux-thunk';

export let fetchDataThunkAction = (action: Action): any => {
    return (dispatch: ThunkDispatch<StoreState, any, Action>) => {
        let url = makeURL(action.service, action.route);
        let status: number, statusText: string;
        fetch(url)
            .then((response: Response) => {
                status = response.status;
                statusText = response.statusText;
                if(status === 200) {
                    return response.json();
                } 

                return dispatch(
                    fetchDataErrorAction(action.feature, action.service, status, statusText),
                );
            })
            .then((data: any) => {
                dispatch(
                    fetchDataSuccessAction(action.feature, action.service, status, JSON.parse(JSON.stringify(data)), statusText)
                );
            })
            .catch((err: Error) => {
                console.log({ err });
                dispatch(fetchDataErrorAction(action.feature, action.service, status, statusText));
            });
    }
}
