/**
 * useCreditCard Module:
 * This module provides a custom hook for handling credit card-related functionality.
 * It includes a function to add credit card details to the server.
 */

// Defining the useCreditCard custom hook.
export const useCreditCard = () => {
 
    /**
   * addCard Function:
   * Sends a POST request to the server to add credit card details.
   * @param {string} id - The user ID associated with the credit card.
   * @param {string} cardNumber - The credit card number.
   * @param {string} cardHolderName - The name of the cardholder.
   * @param {string} expiryDate - The expiry date of the credit card.
   * @param {string} cvv - The CVV (Card Verification Value) of the credit card.
   * @returns {Promise} - A promise that resolves to the groups data if successful, or rejects with an error.
   */
    const addCard = async (id,cardNumber,
        cardHolderName,
        expiryDate,
        cvv) => {
          console.log(cvv);
        const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/card-details`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id,cardNumber,
                cardHolderName,
                expiryDate,
                cvv}),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data.groups;
          } else {
            throw new Error('Error Happened');
          }
          
    }

    // Returning the addCard function within an object.
    return{
        addCard
    }
}



