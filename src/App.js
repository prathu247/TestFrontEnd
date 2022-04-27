import axios from "axios";
import { useEffect, useState } from "react";
// import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NewsContent from "./components/NewsContent/NewsContent";
import NotFound from './components/Utils/NotFound';
import moment from 'moment';

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  let toDate, fromDate, queryString;

  const newsApi = async () => {
    try {
      const baseUrl = 'http://localhost:3000';
      let url =  `${baseUrl}/news?`;
      if(queryString){
        url = `${url}&queryString=${queryString}`;
      }
      if(toDate){
        url = `${url}&toDate=${moment(toDate).format('YYYY-MM-DD')}`;
      }
      if(fromDate){
        url = `${url}&fromDate=${moment(fromDate).format('YYYY-MM-DD')}`;
      }

      const news = await axios.get(url);
       
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);

      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
  }, []);

  const handleChildData = (toTempDate, fromTempDate, queryTempString) =>{
    toDate= toTempDate;
    fromDate = fromTempDate;
    queryString = queryTempString;
    newsApi();
  }

  return (
    <div className="App" id="#home">
      <Header handleChildData={handleChildData}  />
      {newsResults ? (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
        />
      ): <div>
        <NotFound />
      </div>
    }
      <Footer />
    </div>
  );
}


export default App;