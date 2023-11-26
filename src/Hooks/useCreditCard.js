

export const useCreditCard = () => {
 
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
    return{
        addCard
    }
}



