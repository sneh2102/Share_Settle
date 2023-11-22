
export const useExpenseAnalytics = () => {
    const recentExpense = async (user) => {
        console.log(user);
        const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/recent/expense`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user}),
          });
          if (response.ok) {
            const data = await response.json();
          
            return data;
          } else {
            throw new Error('Failed to fetch data');
          }
          
    }

    const categoryExpense = async (user) => {
      
        const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/usercategory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user}),
          });
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error('Failed to fetch data');
          }
          
    }
    const monthlyExpense = async (user) => {
      
        const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/monthly/expense`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user}),
          });
          if (response.ok) {
            const data = await response.json();
            console.log("montly",data);
            return data;
          } else {
            throw new Error('Failed to fetch data');
          }
          
    }
    const dailyExpense = async (user) => {
      console.log(user);
      const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/expense/daily-expense`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({user}),
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Failed to fetch data');
        }
        
  }
    return{monthlyExpense,categoryExpense,recentExpense,dailyExpense}

}


