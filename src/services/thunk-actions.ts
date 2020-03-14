import { Action, fetchDataSuccessAction, fetchDataErrorAction } from './';
import { makeURL, StoreState } from '../'
import { ThunkDispatch } from 'redux-thunk';

export let fetchDataThunkAction = (action: Action): any => {
    return (dispatch: ThunkDispatch<StoreState, any, Action>) => {
        let url = makeURL(action.service, action.route);
        fetch(url)
            .then((response: Response) => {
                if(response.status === 200) {
                    return response.json();
                } 

                return dispatch(
                    fetchDataErrorAction(action.feature, action.service, response.status, response.statusText),
                );
            })
            .then((data: any) => {
                dispatch(
                    fetchDataSuccessAction(action.feature, action.service, 200, JSON.parse(JSON.stringify(data)), "OK")
                );
            })
            .catch((err: Error) => {
                console.log({ err });
                dispatch(fetchDataErrorAction(action.feature, action.service, -1));
            });
    }
}
