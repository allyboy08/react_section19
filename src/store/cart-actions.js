import {uiActions} from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://react-http-acb26-default-rtdb.firebaseio.com/cart.json'
            );

            if (!response.ok) {
                throw new Error('could not fetch data')
            }

            const data = await response.json();
            return data;
        };
        try {
           const cartData = await fetchData();
           dispatch(cartActions.replaceCart({
               items: cartData.items || [],
               totalQuantity: cartData.totalQuantity
           }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'error',
                  message: 'fetching data failed'
                })
              )
        }
    }
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: 'pending',
              title: 'sending...',
              message: 'sending data'
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-http-acb26-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
            });
        
            if (!response.ok) {
                throw new Error('sending data failed')
            }
        };
    
    try {
        await sendRequest();

        dispatch(
            uiActions.showNotification({
              status: 'success',
              title: 'success',
              message: 'sent data'
            })
        )
    } catch (error) {
        dispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'error',
              message: 'sending data failed'
            })
          )
    }

    };
};