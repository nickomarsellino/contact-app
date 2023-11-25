import { useEffect, useState } from 'react';


const useSearch = (pageProps: any, history: History , path: string) => {
  const [state, setState] = useState<string>('');

  const _onGetSearchData = (valueSearch: string, searchCategory: string) => {
    console.log("valueSearch: ", valueSearch);
    console.log("searchCategory: ", searchCategory);
  }

  useEffect(() => {
  },[]);

  return { onGetSearchData: _onGetSearchData};
};

export default useSearch;
