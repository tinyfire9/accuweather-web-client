import { Action, fetchDataSuccessAction, fetchDataErrorAction } from './';
import { makeURL } from '../constants'

export let fetchDataThunkAction = (action: Action): any => {
    return (dispatch: any) => {
        let uri = makeURL(action.service, action.route);
        fetch(uri)
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
