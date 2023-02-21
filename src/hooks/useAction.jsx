import { useEffect, useState } from 'react';

export const saveToStorage = (data) => {
  
  const savedInvoices = JSON.parse(localStorage.getItem('invoices') ?? '[]');
  savedInvoices.push(data)
  localStorage.setItem("invoices", JSON.stringify(savedInvoices));
};
export const useAction = () => {
  const handleSaveToStorage = (dataToSave) => saveToStorage(dataToSave);

  return {
    handleSaveToStorage,
  };
};



export const useFetchDataFromLocalStorage = () =>  {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    if (invoices.length > 0) {
      setInvoices(invoices);
    }
  }, []);

  return invoices
}

export default useFetchDataFromLocalStorage